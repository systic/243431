import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ViewApplicationComponent } from './viewApplication.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'viewApplication', component: ViewApplicationComponent }
    ])
  ],
  exports: [RouterModule]
})
export class ViewApplicationRoutingModule { }
