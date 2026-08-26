import { Injectable } from '@angular/core';
import { Auth, User, authState, updateProfile } from '@angular/fire/auth';
import { firstValueFrom } from 'rxjs';

interface UserProfileValue {
  name: string;
}

@Injectable()
export class UserService {
  constructor(public afAuth: Auth) {}

  getCurrentUser(): Promise<User | null> {
    return firstValueFrom(authState(this.afAuth));
  }

  async updateCurrentUser(value: UserProfileValue): Promise<void> {
    const user = this.afAuth.currentUser;

    if (!user) {
      throw new Error('No user logged in');
    }

    await updateProfile(user, {
      displayName: value.name,
      photoURL: user.photoURL,
    });
  }
}
