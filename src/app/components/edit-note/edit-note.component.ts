import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

/* SERVICE */
import { NoteService } from './../../services/note/note.service';

/* MODEL */
import { Note } from './../../models/note.model';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss'],
})
export class EditNoteComponent implements OnInit {
  public note: Note;
  public mssg: string;
  public status: string;
  public id;

  constructor(
    private _noteService: NoteService,
    private _activatedRoute: ActivatedRoute,
    private _route: Router
  ) {
    this.note = new Note('', '', '', '', '');
  }

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.paramMap.get('id');
    this.getNoteById();
  }

  getNoteById() {
    this._noteService.getNoteById(this.id).subscribe(
      (res) => {
        this.note = res.note;
      },
      (err) => {
        this.status = 'error';
        this.mssg = err.error.mssg;
      }
    );
  }

  onSubmit(form) {
    this._noteService.updateNote(this.note).subscribe(
      (res) => {
        this.status = 'success';
        this.mssg = res.mssg;
        console.log(res);
        /* this._route.navigate(['/my-panel']); */
      },
      (err) => {
        console.log(err);
        this.status = 'error';
        this.mssg = err.error.mssg;
      }
    );
  }
}
