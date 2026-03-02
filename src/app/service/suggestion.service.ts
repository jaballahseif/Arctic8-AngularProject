import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Suggestion } from '../models/suggestion';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {
  suggestionUrl: string = 'http://localhost:3000/suggestions';

  constructor(private http: HttpClient) { }

  getSuggestionsList(): Observable<Suggestion[]> {
    return this.http.get<Suggestion[]>(this.suggestionUrl);
  }

  getSuggestionById(id: number | string): Observable<Suggestion> {
    return this.http.get<any>(`${this.suggestionUrl}/${id}`).pipe(
      map(res => res.suggestion ? res.suggestion : res)
    );
  }

  addSuggestion(suggestion: Suggestion): Observable<Suggestion> {
    return this.http.post<Suggestion>(this.suggestionUrl, suggestion);
  }

  updateSuggestion(id: number | string, suggestion: Suggestion): Observable<Suggestion> {
    return this.http.put<Suggestion>(`${this.suggestionUrl}/${id}`, suggestion);
  }

  deleteSuggestion(id: number | string): Observable<Suggestion> {
    return this.http.delete<Suggestion>(`${this.suggestionUrl}/${id}`);
  }
}
