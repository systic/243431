import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotationComponent } from './quotation.component';
import { QuotationRoutingModule } from './quotation-routing.module';

import { SharedModule } from '../shared/shared.module';
import { DataListService } from '../shared/data-list/data-list.service';

@NgModule({
  imports: [CommonModule, QuotationRoutingModule, SharedModule],
  declarations: [QuotationComponent],
  exports: [QuotationComponent],
  providers: [DataListService]
})
export class QuotationModule { }
