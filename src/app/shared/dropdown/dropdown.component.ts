import { Component, OnInit, Input } from '@angular/core';

/**
 * This class represents the dropdown component.
 */
@Component({
  moduleId: module.id,
  selector: 'app-sd-dropdown',
  templateUrl: 'dropdown.component.html',
  styleUrls: ['dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
  @Input() DropdownData: DropdownDataSchema = {
                            dropdownName: '',
                            defaultText: '',
                            optionList: [
                              {
                                optionName: ''
                              }
                            ]
                        };
  @Input() PreFix: string;
  @Input() ElementGroup: any[];

  /**
   * Get the users OnInit
   */
  ngOnInit() {
  }

  // open Dropdown
  openDropdown(dropdownName) {
    this.ElementGroup['showPopup'] = false;
    this.ElementGroup['shownPopupName'] = '';

    if (this.ElementGroup['showDropdown'] && this.ElementGroup['shownDropdownName'] === dropdownName) {
      this.ElementGroup['showDropdown'] = false;
      this.ElementGroup['shownDropdownName'] = '';
    } else {
      this.ElementGroup['showDropdown'] = true;
      this.ElementGroup['shownDropdownName'] = dropdownName;
    }
  }

  // select Dropdown option
  selectDropdown(dropdownName, optionName) {
    dropdownName.defaultText = optionName;
  }
}

// car.interface.ts
export interface DropdownDataSchema {
  dropdownName: string;
  defaultText: string;
  optionList: [
    {
      optionName: string
    }
  ];
}
