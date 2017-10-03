import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { NgbDateStruct, NgbDateParserFormatter, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from '../shared/ngb-date-fr-parser-formatter';

import { DataListService } from '../shared/data-list/data-list.service';

/**
 * This class represents the lazy loaded EditApplicationComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'app-sd-edit-application',
  templateUrl: 'editApplication.component.html',
  styleUrls: ['editApplication.component.scss'],
  providers: [{provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}]
})
export class EditApplicationComponent implements OnInit {
  showModal = false;
  shownModalName = '';

  hiddenElementGroup = {
    showPopup: false,
    shownPopupName: '',
    showDropdown: false,
    shownDropdownName: ''
  };

  step = 0;
  showError = false;
  showMore: boolean;
  carDetailsOpen: boolean;
  vAPsAndFeesOpen: boolean;
  personalDataOpen: boolean;
  spouseDataOpen: boolean;
  currentAddressOpen: boolean;
  previousAddressOpen: boolean;
  employmentOpen: boolean;
  previousEmploymentOpen: boolean;
  spouseEmploymentOpen: boolean;
  personalReferences1Open: boolean;
  personalReferences2Open: boolean;
  personalReferences3Open: boolean;
  pepOpen: boolean;
  documentsOpen: boolean;
  postApplicationDataOpen: boolean;
  contractPrintingOpen: boolean;
  historyOpen: boolean;

  errorMessage: string;
  dataList: any[] = [];
  step1Data: any[] = [];
  step2Data: any[] = [];
  step3Data: any[] = [];
  step4Data: any[] = [];
  step5Data: any[] = [];
  step6Data: any[] = [];
  step7Data: any[] = [];
  step8Data: any[] = [];

  birthDateModel: NgbDateStruct;
  birthDateSpouseModel: NgbDateStruct;
  signingDateModel: NgbDateStruct;
  arrows = 'arrows';

  /**
   * Creates an instance of the EditApplicationComponent with the injected
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
    this.document.body.scrollTop = 0;
    this.getDataList('../../assets/data/dataTableEditApplicationForms.json');
  }

  initData() {
    this.step1Data = this.dataList['step1Data'];
    this.step2Data = this.dataList['step2Data'];
    this.step3Data = this.dataList['step3Data'];
    this.step4Data = this.dataList['step4Data'];
    this.step5Data = this.dataList['step5Data'];
    this.step6Data = this.dataList['step6Data'];
    this.step7Data = this.dataList['step7Data'];
    this.step8Data = this.dataList['step8Data'];

    this.birthDateModel = { year: this.dataList['step2Data'].BirthDateInput['year'],
                            month: this.dataList['step2Data'].BirthDateInput['month'],
                            day: this.dataList['step2Data'].BirthDateInput['day']};
    this.birthDateSpouseModel = { year: this.dataList['step2Data'].SpouseBirthDateInput['year'],
                                  month: this.dataList['step2Data'].SpouseBirthDateInput['month'],
                                  day: this.dataList['step2Data'].SpouseBirthDateInput['day']};

    this.signingDateModel = { year: this.dataList['step7Data'].SigningDateInput['year'],
                                  month: this.dataList['step7Data'].SigningDateInput['month'],
                                  day: this.dataList['step7Data'].SigningDateInput['day']};
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

  // get uploaded files
  getFiles(item, event) {
    item.fileInputBox = event.target.files;
    if (item.fileInputBox.length > 0) {
      item.name = 'Filled Record';
      item.status = 'Pending';
      item.fileName = item.fileInputBox[0].name;
    }
  }

  // select steps
  selectStep(selectedStepIndex) {
    this.step = selectedStepIndex;
    this.showError = false;
  }

  // change steps
  changeStep(changedStepIndex) {
    if (changedStepIndex < 0) {
      changedStepIndex = 0;
    }

    if (changedStepIndex > 7) {
      changedStepIndex = 7;
    }

    this.step = changedStepIndex;
    this.document.body.scrollTop = 0;
    this.showError = false;
  }

  // click Save Updates button
  saveUpdates() {
    if (this.step !== 7) {
      this.document.body.scrollTop = 0;
      this.showError = true;
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
