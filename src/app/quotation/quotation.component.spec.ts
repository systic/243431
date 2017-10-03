import { Component } from '@angular/core';
import {
  async,
  TestBed
} from '@angular/core/testing';

import { QuotationModule } from './quotation.module';

export function main() {
   describe('Quotation component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [QuotationModule]
      });
    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            const fixture = TestBed.createComponent(TestComponent);
            const quotationDOMEl = fixture.debugElement.children[0].nativeElement;

              expect(quotationDOMEl.querySelectorAll('span')[0].textContent).toEqual('IBM CHATBOT');
          });
        }));
    });
}

@Component({
  selector: 'app-test-cmp',
  template: '<app-sd-quotation></app-sd-quotation>'
})
class TestComponent {}
