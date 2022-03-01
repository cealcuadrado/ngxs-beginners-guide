import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DesignUtilityService {

  url = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  private fetchUsers(): Observable<any> {
    return this.http.get<any>(`${this.url}/users`);
  }

  private addUsers(userData: any): Observable<any> {
    return this.http.post<any>(`${this.url}/users`, userData);
  }

  private deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/users/${id}`);
  }

  private updateUser(payload: any, id: number): Observable<any> {
    return this.http.put<any>(`${this.url}/users/${id}`, payload);
  }
}
