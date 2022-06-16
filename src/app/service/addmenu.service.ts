import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AddMenu } from '../model/addmenu';
import { lastValueFrom } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AddMenuService {
  id!: Pick<AddMenu, 'id'>;

  constructor(private http: HttpClient) { }

  httpOptions: { headers: HttpHeaders} = {
    headers: new HttpHeaders({"Content-Type": "application/json"}),
  }

  async addMenu(menu: AddMenu) {
    return lastValueFrom(this.http.post<AddMenu>('/api/createMenu', menu));
  }

  getMenu(): Observable<AddMenu[]> {
    return this.http.get<AddMenu[]>('/api/menu', {responseType: 'json'}).pipe(
      catchError(this.ErrorHandler)
    );
  }

  deleteMenu(id: Pick<AddMenu, 'id'>): Observable<AddMenu> {
    return this.http.delete<AddMenu>('/api/menu/'+id, this.httpOptions)
    .pipe(
      catchError(this.ErrorHandler)
    );
  }

  private ErrorHandler(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
