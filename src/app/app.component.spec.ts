import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';

import { DashboardModule } from './dashboard/dashboard.module';
import { QuotationModule } from './quotation/quotation.module';
import { EditApplicationModule } from './editApplication/editApplication.module';
import { ViewApplicationModule } from './viewApplication/viewApplication.module';
import { ContactModule } from './contact/contact.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,
                DashboardModule, QuotationModule,
                EditApplicationModule, ViewApplicationModule, ContactModule],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
});
