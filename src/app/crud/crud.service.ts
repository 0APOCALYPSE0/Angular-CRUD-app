import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private apiServer = "http://localhost:3000";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http:HttpClient) { }

  create(product:Product): Observable<Product>{
    return this.http.post<Product>(this.apiServer+'/products/', JSON.stringify(product), this.httpOptions).
    pipe(catchError(this.errorHandler));
  }  

  getById(id:string): Observable<Product>{
    return this.http.get<Product>(this.apiServer+'/products/'+id).pipe(catchError(this.errorHandler));
  }

  getAll(): Observable<Product[]>{
    return this.http.get<Product[]>(this.apiServer+'/products/').pipe(catchError(this.errorHandler));
  }

  update(id:string, product:Product): Observable<Product>{
    return this.http.put<Product>(this.apiServer+'/products/'+id, JSON.stringify(product), this.httpOptions).
    pipe(catchError(this.errorHandler));
  }

  delete(id:string){
    return this.http.delete<Product>(this.apiServer+'/products/'+id, this.httpOptions).pipe(catchError(this.errorHandler));
  }

  errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
