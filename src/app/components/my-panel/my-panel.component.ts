import { Component, OnInit } from '@angular/core';

/* SERVICE */
import { NoteService } from './../../services/note/note.service';


/* MODEL */
import { Note } from './../../models/note.model';

@Component({
  selector: 'app-my-panel',
  templateUrl: './my-panel.component.html',
  styleUrls: ['./my-panel.component.scss'],
  providers: [ NoteService ]
})
export class MyPanelComponent implements OnInit {
  public notes: Note[];
  public mssg: string;
  public status: string;

  constructor(
    private _noteService: NoteService
  ) { 
    
  }

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(){
    this._noteService.getNotes().subscribe(
      res => {
        if (!res.notes) {
          this.status = "error";
          this.mssg = "No existen notas, puedes crear aquí: <a class='btn btn-primary' routerLink='/create-note'>crea</a>";
        } else {
          this.notes = res.notes;
        }
        
      },
      err => {
        this.status = "error";
        this.mssg = err.error.mssg;
      }
    );
  }

  deleteNote(note_id){
    var r = confirm("Are you sure you want to delete?");
    if (r == true) {
      this._noteService.removeNote(note_id).subscribe(
        res => {
          this.status = "success";
          this.mssg = res.mssg;
        },
        err => {
          this.status = "error";
          this.mssg = err.error.mssg;
        }
      )
    }
  }

}
