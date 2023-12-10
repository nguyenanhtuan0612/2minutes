import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KeywordsService {
  constructor(private http: HttpClient) {}

  apiURL = 'http://localhost:3004';

  addKeyword(body: any): Observable<any> {
    return this.http.post(`${this.apiURL}/addKeyword`, body);
  }

  listKeywords(siteId: string): Observable<any> {
    return this.http.get(`${this.apiURL}/listKeyword/${siteId}`);
  }
}
