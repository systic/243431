import { Component } from '@angular/core';
import {
  async,
  TestBed
} from '@angular/core/testing';

import { ContactModule } from './contact.module';

export function main() {
   describe('Contact component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [ContactModule]
      });
    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            const fixture = TestBed.createComponent(TestComponent);
            const contactDOMEl = fixture.debugElement.children[0].nativeElement;

              expect(contactDOMEl.querySelectorAll('span')[0].textContent).toEqual('IBM CHATBOT');
          });
        }));
    });
}

@Component({
  selector: 'app-test-cmp',
  template: '<app-sd-contact></app-sd-contact>'
})
class TestComponent {}
