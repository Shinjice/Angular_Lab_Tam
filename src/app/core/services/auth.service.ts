import { Injectable, inject, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  deleteUser,
  sendEmailVerification,
  user,
} from '@angular/fire/auth';
import {
  Firestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User, UserRegistration, UserProfile } from '../../models/user.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private router = inject(Router);

  // Reactive state using signals
  currentUser = signal<User | null>(null);
  loading = signal<boolean>(true);

  private user$ = user(this.auth);

  constructor() {
    // Listen to auth state changes
    this.user$.subscribe(async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // User is signed in
          const userData = await this.getUserData(firebaseUser.uid);
          this.currentUser.set(userData);
        } else {
          // User is signed out
          this.currentUser.set(null);
        }
      } catch (error) {
        console.error('Error in auth state change:', error);
        this.currentUser.set(null);
      } finally {
        this.loading.set(false);
      }
    });
  }

  // Register with email and password
  async register(registration: UserRegistration): Promise<void> {
    try {
      // Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        registration.email,
        registration.password,
      );

      const displayName = `${registration.firstName} ${registration.lastName}`;

      // Update Firebase Auth profile
      await updateProfile(userCredential.user, { displayName });

      // Create Firestore user document
      const userData: User = {
        uid: userCredential.user.uid,
        email: registration.email,
        displayName,
        firstName: registration.firstName,
        lastName: registration.lastName,
        photoURL: '',
        emailVerified: false,
        role: 'User',
      };

      await setDoc(doc(this.firestore, 'users', userCredential.user.uid), {
        ...userData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      // Navigate to home
      this.router.navigate(['/home']);
    } catch (error: any) {
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  // Sign in with email and password
  async signIn(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);

      // Wait for currentUser signal to update
      let attempts = 0;
      while (!this.currentUser() && attempts < 20) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        attempts++;
      }

      this.router.navigate(['/home']);
    } catch (error: any) {
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  // Sign in with Google
  async signInWithGoogle(): Promise<void> {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);

      // Ensure user document exists in Firestore
      await this.ensureUserDocument(result.user);

      this.router.navigate(['/home']);
    } catch (error: any) {
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  // Sign out
  async logout(): Promise<void> {
    await signOut(this.auth);
    this.router.navigate(['/']);
  }

  // Send password reset email
  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (error: any) {
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  // Send verification email
  async sendVerificationEmail(): Promise<void> {
    const user = this.auth.currentUser;
    if (!user) throw new Error('No user logged in');

    try {
      await sendEmailVerification(user);
    } catch (error: any) {
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  // Update user profile
  async updateUserProfile(profile: UserProfile): Promise<void> {
    const user = this.auth.currentUser;
    if (!user) throw new Error('No user logged in');

    try {
      // Update Firebase Auth profile if displayName changed
      if (profile.firstName || profile.lastName) {
        const displayName = `${profile.firstName || ''} ${profile.lastName || ''}`.trim();
        await updateProfile(user, { displayName });
      }

      // Update Firestore document
      await updateDoc(doc(this.firestore, 'users', user.uid), {
        ...profile,
        updatedAt: serverTimestamp(),
      });

      // Refresh current user data
      const userData = await this.getUserData(user.uid);
      this.currentUser.set(userData);
    } catch (error: any) {
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  // Delete user account
  async deleteAccount(): Promise<void> {
    const user = this.auth.currentUser;
    if (!user) throw new Error('No user logged in');

    try {
      // Delete Firestore document
      await deleteDoc(doc(this.firestore, 'users', user.uid));

      // Delete Firebase Auth user
      await deleteUser(user);

      this.router.navigate(['/']);
    } catch (error: any) {
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  // Ensure user document exists in Firestore (for OAuth logins)
  private async ensureUserDocument(firebaseUser: any): Promise<void> {
    const userDocRef = doc(this.firestore, 'users', firebaseUser.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      const names = firebaseUser.displayName?.split(' ') || ['', ''];
      const userData: User = {
        uid: firebaseUser.uid,
        email: firebaseUser.email!,
        displayName: firebaseUser.displayName || '',
        firstName: names[0],
        lastName: names.slice(1).join(' '),
        photoURL: firebaseUser.photoURL || '',
        emailVerified: firebaseUser.emailVerified,
        role: 'User',
      };

      await setDoc(userDocRef, {
        ...userData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
  }

  // Get user data from Firestore
  private async getUserData(uid: string): Promise<User> {
    const userDoc = await getDoc(doc(this.firestore, 'users', uid));

    if (userDoc.exists()) {
      const data = userDoc.data();
      return {
        ...data,
        uid,
        role: data['role'] || 'User',
        createdAt: data['createdAt']?.toDate(),
        updatedAt: data['updatedAt']?.toDate(),
      } as User;
    }

    // Fallback if no Firestore doc exists
    const firebaseUser = this.auth.currentUser!;
    const names = firebaseUser.displayName?.split(' ') || ['', ''];
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email!,
      displayName: firebaseUser.displayName || '',
      firstName: names[0],
      lastName: names.slice(1).join(' '),
      photoURL: firebaseUser.photoURL || '',
      emailVerified: firebaseUser.emailVerified,
      role: 'User',
    } as User;
  }

  // User-friendly error messages
  private getErrorMessage(code: string): string {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'Email already in use';
      case 'auth/invalid-email':
        return 'Invalid email address';
      case 'auth/weak-password':
        return 'Password is too weak (minimum 6 characters)';
      case 'auth/user-disabled':
        return 'User account has been disabled';
      case 'auth/user-not-found':
        return 'User not found';
      case 'auth/wrong-password':
        return 'Invalid email or password';
      case 'auth/popup-closed-by-user':
        return 'Sign in cancelled';
      case 'auth/requires-recent-login':
        return 'Please log in again to perform this action';
      default:
        return 'An error occurred. Please try again';
    }
  }
}
