import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { SharedModule } from '../shared/shared.module';
import { DataListService } from '../shared/data-list/data-list.service';

@NgModule({
  imports: [CommonModule, DashboardRoutingModule, SharedModule],
  declarations: [DashboardComponent],
  exports: [DashboardComponent],
  providers: [DataListService]
})
export class DashboardModule { }
