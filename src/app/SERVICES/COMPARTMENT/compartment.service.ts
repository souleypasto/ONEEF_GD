import { GET_COMPARTMENT_URL } from './../../TOOLS/FUNCTIONS/Url';
import { Compartment } from './../../MODELS/Compartment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../STORAGE/local-storage.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompartmentService {

  constructor(
    private localstore: LocalStorageService,
    private http: HttpClient
  ) { }

  getCompartments(): Observable<Compartment[]>  {
    return this.http.get<Compartment[]>(GET_COMPARTMENT_URL);
   }
}
