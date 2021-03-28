import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { take, map, catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AuthResponse, User } from '../interfaces/auth.interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user!: User;

  get usuario() {
    return { ...this._user };
  }

  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string): Observable<boolean> {
    const body = { email, password };
    return this.httpClient.post<AuthResponse>(`${URL}/auth/login`, body).pipe(
      take(1),
      tap((user) => {
        if (user.ok) {
          localStorage.setItem('token', user.token!);
          // this._user = {
          //   userLogin: user.userLogin!,
          // };
        }
      }),
      map((user) => {
        return user.ok;
      }),
      catchError((err) => {
        console.log({ err: err.error.errors.message });
        return of(err.error.errors.message);
      })
    );
  }

  verifyToken(): Observable<boolean> {
    const headers = new HttpHeaders({
      'x-token': localStorage.getItem('token') || '',
    });
    // const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '')
    return this.httpClient
      .get<AuthResponse>(`${URL}/auth/renewtoken`, { headers })
      .pipe(
        map((data: any) => {
          // console.log({data})
          if (data.ok) {
            localStorage.setItem('token', data.token!);
            delete data.usuario.created
            delete data.usuario._id
            this._user = {
              userLogin: data.usuario!,
              uid:data.uid!
            };
          }
          return data.ok;
        }),
        catchError((err) => {
          return of(false);
        })
      );
  }

  logout() {
    // localStorage.removeItem('token')
    localStorage.clear();
  }

  registro(name: string, email: string, password: string) {
    const body = { name, email, password };
    return this.httpClient.post<AuthResponse>(`${URL}/auth/new`, body).pipe(
      tap((res: any) => {
        // console.log({res})
        if (res.ok) {
          localStorage.setItem('token', res.token!);
          // this._user = {
          //   userCreated: res.userCreated!,
          //   uid: res.userCreated.uid!
          // };
        }
      }),
      map((res) => {
        return res.ok;
      }),
      catchError((err) => {
        return of(err.error.msg);
      })
    );
  }
}
