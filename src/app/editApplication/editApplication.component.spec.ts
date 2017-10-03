import { Component } from '@angular/core';
import {
  async,
  TestBed
} from '@angular/core/testing';

import { EditApplicationModule } from './editApplication.module';

export function main() {
   describe('EditApplication component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [EditApplicationModule]
      });
    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            const fixture = TestBed.createComponent(TestComponent);
            const editApplicationDOMEl = fixture.debugElement.children[0].nativeElement;

              expect(editApplicationDOMEl.querySelectorAll('span')[0].textContent).toEqual('IBM CHATBOT');
          });
        }));
    });
}

@Component({
  selector: 'app-test-cmp',
  template: '<app-sd-edit-application></app-sd-edit-application>'
})
class TestComponent {}
