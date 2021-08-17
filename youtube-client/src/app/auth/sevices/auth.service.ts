import { Injectable } from '@angular/core';
import { IUser } from '../models/user.model';

export const L_STORAGE_USER_KEY = 'USER_DATA';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn: boolean = false;

  checkLoginData(userData: IUser): boolean {
    this.saveLoginData(userData);
    this.isLoggedIn = true;
    return this.isLoggedIn;
  }

  logOut(): void {
    if (this.isLoggedIn) {
      localStorage.removeItem(L_STORAGE_USER_KEY);
    }
    this.isLoggedIn = false;
  }

  get isLogin(): boolean {
    this.isLoggedIn = !!localStorage.getItem(L_STORAGE_USER_KEY);

    return this.isLoggedIn;
  }

  private saveLoginData(userData: IUser): void {
    localStorage.setItem(L_STORAGE_USER_KEY, JSON.stringify(userData));
  }

  getUserName(): string {
    if (this.isLoggedIn) {
      const loginDataStr: string | null =
        localStorage.getItem(L_STORAGE_USER_KEY);

      if (loginDataStr) {
        const loginData: IUser = JSON.parse(loginDataStr);
        return loginData.email;
      }
    }

    return 'non logged in';
  }
}
