import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utilisateur } from 'src/app/MODELS/Utilisateur';
import { Observable } from 'rxjs';
import { Result } from 'src/app/MODELS/Result';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  
private baseUrl = `${environment.apiRoot}/user`;
  constructor(private http: HttpClient) { }

  /**
   * verifier si l'utilisateur Existe dans la BD
   * @param login:: string
   * @param password:: string;
   * @returns Promesse d'un Utilisateur 
   */
  login(login: string, password: string): Observable<Result>{
    return this.http.post<Result>(`${this.baseUrl}/login`, {login, password});
  }
}
