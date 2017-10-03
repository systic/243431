import { Component } from '@angular/core';
import {
  async,
  TestBed
} from '@angular/core/testing';

import { ViewApplicationModule } from './viewApplication.module';

export function main() {
   describe('ViewApplication component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [ViewApplicationModule]
      });
    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            const fixture = TestBed.createComponent(TestComponent);
            const viewApplicationDOMEl = fixture.debugElement.children[0].nativeElement;

              expect(viewApplicationDOMEl.querySelectorAll('span')[0].textContent).toEqual('IBM CHATBOT');
          });
        }));
    });
}

@Component({
  selector: 'app-test-cmp',
  template: '<app-sd-view-application></app-sd-view-application>'
})
class TestComponent {}
