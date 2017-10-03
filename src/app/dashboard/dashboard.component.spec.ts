import { Component } from '@angular/core';
import {
  async,
  TestBed
} from '@angular/core/testing';

import { DashboardModule } from './dashboard.module';

export function main() {
   describe('Dashboard component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [DashboardModule]
      });
    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            const fixture = TestBed.createComponent(TestComponent);
            const dashboardDOMEl = fixture.debugElement.children[0].nativeElement;

              expect(dashboardDOMEl.querySelectorAll('span')[0].textContent).toEqual('IBM CHATBOT');
          });
        }));
    });
}

@Component({
  selector: 'app-test-cmp',
  template: '<app-sd-dashboard></app-sd-dashboard>'
})
class TestComponent {}
