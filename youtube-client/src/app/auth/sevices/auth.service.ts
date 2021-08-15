import { Injectable } from '@angular/core';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = true;

  constructor() {}

  checkLoginData(userData: IUser): boolean {
    this.saveLoginData(userData);
    this.isLoggedIn = true;
    return this.isLoggedIn;
  }

  isLogin() {
    return this.isLoggedIn;
  }

  private saveLoginData(userData: IUser): void {
    localStorage.setItem('dataLogin', JSON.stringify(userData));
  }

  getUserName(): string {
    if (this.isLoggedIn) {
      const loginDataStr: string | null = localStorage.getItem('dataLogin');

      if (loginDataStr) {
        const loginData: IUser = JSON.parse(loginDataStr);
        return loginData.email;
      }
    }

    return 'non logged in';
  }
}
