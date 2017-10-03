import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { EditApplicationComponent } from './editApplication.component';
import { EditApplicationRoutingModule } from './editApplication-routing.module';

import { SharedModule } from '../shared/shared.module';
import { DataListService } from '../shared/data-list/data-list.service';

@NgModule({
  imports: [CommonModule, EditApplicationRoutingModule, SharedModule, NgbModule.forRoot()],
  declarations: [EditApplicationComponent],
  exports: [EditApplicationComponent],
  providers: [DataListService]
})
export class EditApplicationModule { }
