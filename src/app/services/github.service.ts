import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  url: string = environment.URL;

  constructor(private http: HttpClient) { }

  username(username: string): Observable<any>{
    return this.http.get<any>(this.url + username);
  }

  repo(repos_url: string): Observable<any> {
    return this.http.get<any>(repos_url);
  }
}
