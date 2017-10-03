import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { DataListService } from '../shared/data-list/data-list.service';

/**
 * This class represents the lazy loaded QuotationComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'app-sd-quotation',
  templateUrl: 'quotation.component.html',
  styleUrls: ['quotation.component.scss']
})
export class QuotationComponent implements OnInit {
  showModal = false;
  shownModalName = '';

  hiddenElementGroup = {
    showPopup: false,
    shownPopupName: '',
    showDropdown: false,
    shownDropdownName: ''
  };

  step1Tab = 0;
  step = 0;
  showDisabledCar = false;
  typeName = '';

  generalOpen: boolean;
  carDetailsOpen: boolean;
  vapsAndFeesOpen: boolean;

  errorMessage: string;
  dataList: any[] = [];
  step1Data: any[] = [];
  step2Data: any[] = [];
  step3Data: any[] = [];
  step3DataForm: any[] = [];

  /**
   * Creates an instance of the QuotationComponent with the injected
   * NameListService.
   *
   * @param {DataListService} dataListService - The injected DataListService.
   */
  constructor(public dataListService: DataListService,
              @Inject(DOCUMENT) private document: Document) {}

  /**
   * Get the dataList OnInit
   */
  ngOnInit() {
    this.getDataList('../../assets/data/dataTableQuotation.json');
  }

  initData() {
    this.step1Data = this.dataList['step1Data'];
    this.step2Data = this.dataList['step2Data'];
    this.step3Data = this.dataList['step3Data'];
    this.step3DataForm = this.dataList['step3DataForm'];
  }

  // click on Previous/Next buttons
  changeStep(stepIndex) {
    this.step = stepIndex;
  }

  // click on Left/Right arrows
  clickArrow(item) {
    if (item.inputBoxLeft !== '' && item.inputBoxRight === '') {
      item.inputBoxRight = item.inputBoxLeft;
      item.inputBoxLeft = '';
    } else if (item.inputBoxLeft === '' && item.inputBoxRight !== '') {
      item.inputBoxLeft = item.inputBoxRight;
      item.inputBoxRight = '';
    }
  }

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

  /**
   * Handle the dataListService observable
   */
  getDataList(jsonUrl) {
    this.dataListService.get(jsonUrl)
      .subscribe(
        dataList => this.dataList = dataList,
        error => this.errorMessage = <any>error,
        () => this.initData()
      );
  }
}
