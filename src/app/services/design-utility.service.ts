import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class DesignUtilityService {

  url = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  fetchUsers(): Observable<User> {
    return this.http.get<User>(`${this.url}/users`);
  }

  addUsers(userData: any): Observable<User> {
    return this.http.post<User>(`${this.url}/users`, userData);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.url}/users/${id}`);
  }

  updateUser(payload: any, id: number): Observable<User> {
    return this.http.put<User>(`${this.url}/users/${id}`, payload);
  }
}
