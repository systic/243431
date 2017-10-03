import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { ContactRoutingModule } from './contact-routing.module';

import { SharedModule } from '../shared/shared.module';
import { DataListService } from '../shared/data-list/data-list.service';

@NgModule({
  imports: [CommonModule, ContactRoutingModule, SharedModule],
  declarations: [ContactComponent],
  exports: [ContactComponent],
  providers: [DataListService]
})
export class ContactModule { }
