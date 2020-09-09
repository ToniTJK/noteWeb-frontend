import { Component, OnInit } from '@angular/core';

/* SERVICE */
import { NoteService } from './../../services/note/note.service';


/* MODEL */
import { Note } from './../../models/note.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-my-panel',
  templateUrl: './my-panel.component.html',
  styleUrls: ['./my-panel.component.scss'],
  providers: [ NoteService ]
})
export class MyPanelComponent implements OnInit {
  public note: Note;
  public notes: Note[];
  public mssg: string;
  public status: string;

  constructor(
    private _noteService: NoteService
  ) { 
    this.note = new Note('','','','','');
  }

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(){
    this._noteService.getNotes().subscribe(
      res => {
        if (!res.notes) {
          this.status = "empty";
          this.mssg = "No existen notas, puedes crear aquí: <a class='btn btn-primary' routerLink='/create-note'>crea</a>";
        } else {
          this.notes = res.notes;
        }
        
      },
      err => {
        this.status = "error";
        this.mssg = err.error.mssg;
        console.log(err);
      }
    );
  }

}
