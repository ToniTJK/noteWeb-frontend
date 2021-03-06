import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

/* MODEL */
import { Note } from './../../models/note.model';

/* SERVICES */
import { UserService } from './../../services/user/user.service';

/* GLOBAL VARIABLES */
import { GLOBAL } from './../global';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  public url;

  constructor(private _http: HttpClient, private _userService: UserService) {
    this.url = GLOBAL.url;
  }

  getNotes(): Observable<any> {
    let identity = this._userService.getIdentity();
    let id = identity._id;
    let token = this._userService.getToken();
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.get<Note[]>(this.url + 'get-notes/' + id, {
      headers: headers,
    });
  }

  getNoteById(id: string): Observable<any> {
    let token = this._userService.getToken();
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.get<Note>(this.url + 'get-note/' + id, {
      headers: headers,
    });
  }

  addNote(note: Note): Observable<any> {
    let params = JSON.stringify(note);
    let token = this._userService.getToken();
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.post(this.url + 'create-note/', params, {
      headers: headers,
    });
  }

  updateNote(note: Note): Observable<any> {
    let params = JSON.stringify(note);
    let token = this._userService.getToken();
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.put(this.url + 'update-note/' + note._id, params, {
      headers: headers,
    });
  }

  removeNote(id: string): Observable<any> {
    let token = this._userService.getToken();
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.delete(this.url + 'delete-note/' + id, {
      headers: headers,
    });
  }
}
