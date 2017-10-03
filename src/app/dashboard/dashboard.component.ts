import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataListService } from '../shared/data-list/data-list.service';

/**
 * This class represents the lazy loaded DashboardComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'app-sd-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  showModal = false;
  shownModalName = '';

  hiddenElementGroup = {
    showPopup: false,
    shownPopupName: '',
    showDropdown: false,
    shownDropdownName: ''
  };

  errorMessage: string;
  dataList: any[] = [];
  tableData: any[] = [];

  filterOption = '';
  allFilterOption = false;

  searchKeyword = '';
  searchList: any[] = [];

  commentsOpen: boolean;
  idVerificationOpen: boolean;

  searchByDropdown = {
                       'dropdownName': 'searchByDropdown',
                       'defaultText': 'Customer Name',
                       'optionList': [
                         {
                           'optionName': 'Customer Name'
                         },
                         {
                           'optionName': 'Proposal Number'
                         },
                         {
                           'optionName': 'Licences Plate'
                         }
                       ]
                     };

  /**
   * Creates an instance of the HomeComponent with the injected
   * NameListService.
   *
   * @param {DataListService} dataListService - The injected DataListService.
   */
  constructor(public dataListService: DataListService) {}

  /**
   * Get the dataList OnInit
   */
  ngOnInit() {
    this.getDataList('../../assets/data/dataTableDashboard.json');
  }

  initData() {
    this.tableData = this.dataList['tableData'];
  }

  // check/uncheck all filter options
  checkAllFilter() {
    if (!this.allFilterOption) {
      this.dataList['filterOptions'].forEach(function(item, index) {
        item.selected = true;
      });
    } else {
      this.dataList['filterOptions'].forEach(function(item, index) {
        item.selected = false;
      });
    }
  }

  // check/uncheck sub filter options
  checkFilter(clickedStatus) {
    let number = 0;
    this.dataList['filterOptions'].forEach(function(item, index) {
      if (item.selected === true) {
        number++;
      }
    });

    if (clickedStatus === false) {
      number++;
    }

    if (clickedStatus === true) {
      number--;
    }

    if (number === this.dataList['filterOptions'].length) {
      this.allFilterOption = true;
    } else {
      this.allFilterOption = false;
    }
  }

  // type on search input
  onKeySearch(event: any) {
    const searchList_Temp = [];
    this.searchList = [];
    const searchLabel = event.target.value;
    if (searchLabel.trim() !== '') {
      this.dataList['tableData'].forEach(function(item, index) {
        if (item.clientName.toLowerCase().indexOf(searchLabel.toLowerCase()) > -1) {
          const clientName = item.clientName;
          const item_index = item.clientName.toLowerCase().indexOf(searchLabel.toLowerCase());

          const firstLabel = clientName.slice(0, item_index);
          const middleLabel = clientName.slice(item_index, searchLabel.length + item_index);
          const lastLabel = clientName.slice(searchLabel.length + item_index);

          let duplicate = false;
          searchList_Temp.forEach(function(itemTemp, indexTemp) {
            const nameTemp = itemTemp.firstLabel + itemTemp.middleLabel + itemTemp.lastLabel;
            if (item.clientName.toLowerCase() === nameTemp.toLowerCase()) {
              // duplicate name
              duplicate = true;
            }
          });
          if (!duplicate) {
            searchList_Temp.push({
              'firstLabel': firstLabel,
              'middleLabel': middleLabel,
              'lastLabel': lastLabel
            });
          }
        }
      });

      this.searchList = searchList_Temp;

      if (this.searchList.length > 0) {
        this.hiddenElementGroup.showPopup = true;
        this.hiddenElementGroup.shownPopupName = 'search-tip';
      }

      if (this.searchByDropdown['defaultText'] === 'Customer Name') {
        // search for Customer Name column
        const tableDataTemp = [];
        this.dataList['tableData'].forEach(function(item, index) {
          if (item.clientName.toLowerCase().indexOf(searchLabel.toLowerCase()) > -1) {
            tableDataTemp.push(item);
          }
        });
        this.tableData = tableDataTemp;
      }
    } else {
      this.tableData = this.dataList['tableData'];
    }
  }

  // select search option
  selectSearchOption(option) {
    this.searchKeyword = option.firstLabel + option.middleLabel + option.lastLabel;
    const searchLabel = this.searchKeyword;

    this.hiddenElementGroup.showPopup = false;
    this.hiddenElementGroup.shownPopupName = '';

    if (this.searchByDropdown['defaultText'] === 'Customer Name') {
      // search for Customer Name column
      const tableDataTemp = [];
      this.dataList['tableData'].forEach(function(item, index) {
        if (item.clientName.toLowerCase().indexOf(searchLabel.toLowerCase()) > -1) {
          tableDataTemp.push(item);
        }
      });
      this.tableData = tableDataTemp;
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
