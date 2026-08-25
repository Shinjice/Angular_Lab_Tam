import { Injectable, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, User, signInWithPopup, signOut, user } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);

  user$ = user(this.auth);

  async loginWithGoogle(): Promise<User> {
    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(this.auth, provider);

    return result.user;
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }
}
