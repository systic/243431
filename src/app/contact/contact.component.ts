import { Component, OnInit } from '@angular/core';

import { DataListService } from '../shared/data-list/data-list.service';

/**
 * This class represents the lazy loaded ContactComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'app-sd-contact',
  templateUrl: 'contact.component.html',
  styleUrls: ['contact.component.scss']
})
export class ContactComponent {
  showModal = false;
  shownModalName = '';

  hiddenElementGroup = {
    showPopup: false,
    shownPopupName: '',
    showDropdown: false,
    shownDropdownName: ''
  };

  // click body to close popup and dropdown
  clickBody() {
    this.hiddenElementGroup.showPopup = false;
    this.hiddenElementGroup.shownPopupName = '';

    this.hiddenElementGroup.showDropdown = false;
    this.hiddenElementGroup.shownDropdownName = '';
  }

  // open popup
  openPopup(popupName) {
    this.hiddenElementGroup.showDropdown = false;
    this.hiddenElementGroup.shownDropdownName = '';

    if (this.hiddenElementGroup.showPopup && this.hiddenElementGroup.shownPopupName === popupName) {
      this.hiddenElementGroup.showPopup = false;
      this.hiddenElementGroup.shownPopupName = '';
    } else  {
      this.hiddenElementGroup.showPopup = true;
      this.hiddenElementGroup.shownPopupName = popupName;
    }
  }

  // close popup
  closePopup() {
    this.hiddenElementGroup.showPopup = false;
    this.hiddenElementGroup.shownPopupName = '';
  }

  // open modal window
  openModalWindow(modalName) {
    this.showModal = true;
    this.shownModalName = modalName;
  }

  // close modal window
  closeModalWindow() {
    this.showModal = false;
    this.shownModalName = '';
  }
}
