export interface User {
  uid: string;
  email: string;
  displayName: string;
  firstName: string;
  lastName: string;
  photoURL?: string;
  emailVerified: boolean;
  role?: 'User' | 'Admin';
  createdAt?: Date;
  updatedAt?: Date;
}
export interface UserRegistration {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface UserProfile {
  firstName?: string;
  lastName?: string;
  displayName?: string;
  photoURL?: string;
}
