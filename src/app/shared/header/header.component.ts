import { Component, OnInit, Input } from '@angular/core';

/**
 * This class represents the HEADER bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'app-sd-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() ActiveMenu: string;
  @Input() ElementGroup: any[];

  /**
   * Get the users OnInit
   */
  ngOnInit() {
  }

  // open popup
  openPopup(popupName) {
    this.ElementGroup['showDropdown'] = false;
    this.ElementGroup['shownDropdownName'] = '';

    if (this.ElementGroup['showPopup'] && this.ElementGroup['shownPopupName'] === popupName) {
      this.ElementGroup['showPopup'] = false;
      this.ElementGroup['shownPopupName'] = '';
    } else  {
      this.ElementGroup['showPopup'] = true;
      this.ElementGroup['shownPopupName'] = popupName;
    }
  }

  // close popup
  closePopup() {
    this.ElementGroup['showPopup'] = false;
    this.ElementGroup['shownPopupName'] = '';
  }
}
