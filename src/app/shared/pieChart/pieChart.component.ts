import { Component, OnInit, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DataListService } from '../data-list/data-list.service';

/**
 * This class represents the header bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'app-sd-pie-chart',
  templateUrl: 'pieChart.component.html',
  styleUrls: ['pieChart.component.scss'],
})
export class PieChartComponent implements OnInit {
  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private data: Array<any>;
  @Input() ElementGroup: any[];
  errorMessage: string;
  chartDataList: any[] = [];
  realChartData: any[] = [];
  leftLegend: any[] = [];
  rightLegend: any[] = [];
  totalNumber = 0;
  selectedTab = 'Week';
  arrows = 'arrows';

  displayMonths = 1;
  navigation = 'arrow';
  startDay = { year: 2017, month: 8};
  endDay = { year: 2017, month: 9};
  startModel: NgbDateStruct;
  endModel: NgbDateStruct;
  inputStartDay: string;
  inputEndDay: string;

  /**
   * Creates an instance of the PieChartComponent with the injected
   * ChartDataListService.
   *
   * @param {dataListService} DataListService - The injected DataListService.
   */
  constructor(public dataListService: DataListService) { }

  ngOnInit() {
    this.getChartData();
    this.startModel = { year: 2017, month: 9, day: 1};
    this.endModel = { year: 2017, month: 9, day: 20};
  }

  // change the date selection
  changeStartDate() {
    this.inputStartDay = this.convertMonthText(this.startModel.month) + ' ' + this.startModel.day;
  }
  changeEndDate() {
    this.inputEndDay = this.convertMonthText(this.endModel.month) + ' ' + this.endModel.day;
  }

  // change the chart data
  changeData() {
    const now = new Date();
    const nowDayOfWeek = now.getDay();
    const nowDay = now.getDate();
    const nowMonth = now.getMonth();
    let nowYear = now.getFullYear();
    nowYear += (nowYear < 2000) ? 1900 : 0;

    const lastMonthDate = new Date();
    lastMonthDate.setDate(1);
    lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
    const lastYear = lastMonthDate.getFullYear();
    const lastMonth = lastMonthDate.getMonth();

    this.realChartData = [];
    this.leftLegend = [];
    this.rightLegend = [];

    const realChartDataTemp = [];
    let totalNumber_Temp = 0;

    let startDay = new Date();
    let endDay = new Date();
    let today = new Date();

    if (this.selectedTab === 'Week') {
      // Filter by week
      startDay = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
      endDay = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek));
    } else if (this.selectedTab === 'Month') {
      // Filter by month
      today = new Date(nowYear, nowMonth, 0);

      startDay = new Date(nowYear, nowMonth, 1);
      endDay = new Date(nowYear, nowMonth, (today.getDate() - 1));
    } else if (this.selectedTab === 'Date') {
      // Filter by dates
      startDay = new Date(this.startModel.year, this.startModel.month, this.startModel.day);
      endDay = new Date(this.endModel.year, this.endModel.month, this.endModel.day);
    }

    this.chartDataList.forEach(function(item, index) {
      const itemDate = new Date(item.date);

      if ((itemDate >= startDay) && (itemDate <= endDay)) {
        // match the date range
        let matched = false;
        realChartDataTemp.forEach(function(item_Temp, index_Temp) {
          if (item_Temp.status === item.status) {
            matched = true;
            item_Temp.number = item_Temp.number + item.number;
            totalNumber_Temp = totalNumber_Temp + item.number;
          }
        });

        if (!matched) {
          realChartDataTemp.push(item);
          totalNumber_Temp = totalNumber_Temp + item.number;
        }
      }
    });

    this.rightLegend = realChartDataTemp.slice(0, 4);
    this.leftLegend = realChartDataTemp.slice(4);

    this.realChartData = realChartDataTemp;
    this.totalNumber = totalNumber_Temp;
    this.createChart(this.realChartData);
  }

  /**
   * Handle the DataListService observable
   */
  getChartData() {
    this.dataListService.get('../../assets/data/pieChartData.json')
      .subscribe(
        list => this.chartDataList = list,
        error => this.errorMessage = <any>error,
        () => this.changeData()
      );
  }

  /**
   * create the chart
   */
  createChart(chartData) {
    const element = this.chartContainer.nativeElement;

    const width = 132,
        height = 132,
        radius = Math.min(width, height) / 2;

    const color = d3.scale.ordinal()
        .range(['#010101', '#0b3162', '#00529e', '#246cc0', '#019be3', '#02cae1', '#90e4ef', '#9dd4db']);

    const arc = d3.svg.arc()
        .outerRadius(radius - 0)
        .innerRadius(radius - 30);

    const pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.number; });

    d3.select(element).select('svg').empty();
    d3.select(element).select('svg g').remove();
    const svg = d3.select(element).select('svg')
        .attr('width', width)
        .attr('height', height)
      .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    const data = chartData;

    const g = svg.selectAll('.arc')
        .data(pie(data))
      .enter().append('g')
        .attr('class', 'arc');
    g.append('path')
        .attr('d', arc)
        .style('fill', function(d) { return color(d.data.status); });

    svg.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '-0.1em')
        .attr('class', 'number-label')
        .text(this.totalNumber);
    svg.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '1.3em')
        .attr('class', 'static-label')
        .text('Proposals');

    function type(d) {
      d.number = +d.number;
      return d;
    }
  }

  // click on Tabs of Pie Chart
  clickTab(tabName) {
    this.selectedTab = tabName;
    if (tabName !== 'Date') {
      this.getChartData();
    }
  }

  // click Filter button
  saveFilter() {
    this.getChartData();
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

  // convert month text
  convertMonthText(month) {
    let monthText = '';
    switch (month) {
      case 1:
        monthText = 'January';
        break;
      case 2:
        monthText = 'February';
        break;
      case 3:
        monthText = 'March';
        break;
      case 4:
        monthText = 'April';
        break;
      case 5:
        monthText = 'May';
        break;
      case 6:
        monthText = 'June';
        break;
      case 7:
        monthText = 'July';
        break;
      case 8:
        monthText = 'August';
        break;
      case 9:
        monthText = 'September';
        break;
      case 10:
        monthText = 'October';
        break;
      case 11:
        monthText = 'November';
        break;
      case 12:
        monthText = 'December';
        break;
    }
    return monthText;
  }
}
