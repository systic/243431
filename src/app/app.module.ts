import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { DashboardModule } from './dashboard/dashboard.module';
import { QuotationModule } from './quotation/quotation.module';
import { EditApplicationModule } from './editApplication/editApplication.module';
import { ViewApplicationModule } from './viewApplication/viewApplication.module';
import { ContactModule } from './contact/contact.module';

import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [BrowserModule, HttpModule, AppRoutingModule,
            DashboardModule, QuotationModule,
            EditApplicationModule, ViewApplicationModule, ContactModule,
            SharedModule.forRoot()],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
