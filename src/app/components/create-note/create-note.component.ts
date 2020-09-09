import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/* SERVICE */
import { NoteService } from './../../services/note/note.service';

/* MODEL */
import { Note } from './../../models/note.model';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss'],
  providers: [NoteService],
})
export class CreateNoteComponent implements OnInit {
  public note: Note;
  public mssg: string;
  public status: string;

  constructor(
    private _noteService: NoteService, 
    private _route: Router
    ) {
    this.note = new Note('', '', '', '', '');
  }

  ngOnInit(): void {}

  onSubmit(form) {
    this._noteService.addNote(this.note).subscribe(
      (res) => {
        this.status = 'success';
        this.mssg = res.mssg;
        this.note = new Note('', '', '', '', '');
        this._route.navigate(['/my-panel']);
      },
      (err) => {
        this.status = 'error';
        this.mssg = err.error.mssg;
      }
    );
  }
}
