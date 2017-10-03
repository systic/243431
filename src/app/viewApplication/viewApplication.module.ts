import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ViewApplicationComponent } from './viewApplication.component';
import { ViewApplicationRoutingModule } from './viewApplication-routing.module';

import { SharedModule } from '../shared/shared.module';
import { DataListService } from '../shared/data-list/data-list.service';

@NgModule({
  imports: [CommonModule, ViewApplicationRoutingModule, SharedModule, NgbModule.forRoot()],
  declarations: [ViewApplicationComponent],
  exports: [ViewApplicationComponent],
  providers: [DataListService]
})
export class ViewApplicationModule { }
