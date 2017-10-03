import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EditApplicationComponent } from './editApplication.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'editApplication', component: EditApplicationComponent }
    ])
  ],
  exports: [RouterModule]
})
export class EditApplicationRoutingModule { }
