import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* COMPONENTS */
import { HomeComponent } from './components/home/home.component';
import { CreateNoteComponent } from './components/create-note/create-note.component';
import { EditNoteComponent } from './components/edit-note/edit-note.component';
import { MyPanelComponent } from './components/my-panel/my-panel.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'create-note', component: CreateNoteComponent },
  { path: 'edit-note', component: EditNoteComponent },
  { path: 'my-panel', component: MyPanelComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
