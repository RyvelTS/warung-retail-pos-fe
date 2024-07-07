import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { AngularFormsModule } from '../../modules/angular-forms/angular-forms.module';
import { ImportService } from '../../services/import.service';
import { Router } from '@angular/router';
import { Query } from '../../../core/models/query';
import { Response } from '../../../core/models/response';
import { first } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';

export interface TableConfig {
  model: string,
  features: {
    create: boolean,
    import: boolean,
  }
  cols: {
    name: string,
    sortable: boolean,
    icon?: string,
    css?: {
      cellContainer: string,
      cellText: string,
    }
  }[],
  grid: {
    titleProp: string
    imageProp?: string
  },
  serverSide?: {
    getFn: Function,
    pagination: {
      total: number,
      perPage: number,
      currentPage: number,
      lastPage: number,
    }
  }
  searchFn?: Function,
  importFn?: Function,
  createFn?: Function,
  clickFn?: Function
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, AngularFormsModule, MatIcon, MatProgressBarModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  // Table Core
  private _dataChanged: boolean = true;
  processedData: any[] = [];

  // Table Preferences
  addType: 'create' | 'import' = 'create';
  viewType: 'list' | 'grid' = 'list';
  selectedFile: File | null = null;

  @Input() config: TableConfig = {
    model: '',
    features: {
      create: false,
      import: false
    },
    cols: [],
    grid: {
      titleProp: ''
    },
  }

  @Input() data: any[] = [
    {
      id: 1,
      name: 'Sarah Clark',
      email: 'sarah.clark123@example.com',
      role: 'Manager'
    },
    {
      id: 2,
      name: 'Oliver White',
      email: 'white.oliver456@example.com',
      role: 'Tester'
    },
    {
      id: 3,
      name: 'Emily Walker',
      email: 'walker.emily789@example.com',
      role: 'Product Owner'
    },
    {
      id: 4,
      name: 'Daniel Baker',
      email: 'd.baker@example.com',
      role: 'Developer'
    },
    {
      id: 5,
      name: 'Sophia King',
      email: 's.king@example.com',
      role: 'Designer'
    },
    {
      id: 6,
      name: 'James Scott',
      email: 'jscott567@example.com',
      role: 'Scrum Master'
    },
    {
      id: 7,
      name: 'Amelia Green',
      email: 'ameliagreen@example.com',
      role: 'Developer'
    },
    {
      id: 8,
      name: 'Logan Adams',
      email: 'logana@example.com',
      role: 'Support'
    },
    {
      id: 9,
      name: 'Ava Hall',
      email: 'avahall456@example.com',
      role: 'QA Engineer'
    },
    {
      id: 10,
      name: 'William Turner',
      email: 'will.turner@example.com',
      role: 'Developer'
    },
    {
      id: 11,
      name: 'Harper Martinez',
      email: 'hmartinez789@example.com',
      role: 'Manager'
    },
    {
      id: 12,
      name: 'Jackson Young',
      email: 'j.young@example.com',
      role: 'Tester'
    },
    {
      id: 13,
      name: 'Lily Harris',
      email: 'lily.harris123@example.com',
      role: 'Product Owner'
    },
    {
      id: 14,
      name: 'Noah Thompson',
      email: 'noaht@example.com',
      role: 'Developer'
    },
    {
      id: 15,
      name: 'Ella Rodriguez',
      email: 'ella.r@example.com',
      role: 'Designer'
    },
    {
      id: 16,
      name: 'Mason Campbell',
      email: 'masonc789@example.com',
      role: 'Scrum Master'
    },
    {
      id: 17,
      name: 'Chloe Wright',
      email: 'c.wright@example.com',
      role: 'Developer'
    },
    {
      id: 18,
      name: 'Lucas Murphy',
      email: 'lucasmurphy789@example.com',
      role: 'Support'
    },
    {
      id: 19,
      name: 'Isabella Reed',
      email: 'isabella.reed@example.com',
      role: 'QA Engineer'
    },
    {
      id: 20,
      name: 'Benjamin Turner',
      email: 'ben.t@example.com',
      role: 'Developer'
    },
    {
      id: 21,
      name: 'Zoe Baker',
      email: 'zbaker123@example.com',
      role: 'Manager'
    },
    {
      id: 22,
      name: 'Alexander Hall',
      email: 'alexander.hall456@example.com',
      role: 'Tester'
    },
    {
      id: 23,
      name: 'Mia King',
      email: 'miak456@example.com',
      role: 'Product Owner'
    },
    {
      id: 24,
      name: 'Ethan Wright',
      email: 'ethan.wright@example.com',
      role: 'Developer'
    },
    {
      id: 25,
      name: 'Charlotte Adams',
      email: 'c.adams@example.com',
      role: 'Designer'
    },
    {
      id: 26,
      name: 'Gabriel Clark',
      email: 'gabriel.clark@example.com',
      role: 'Scrum Master'
    },
    {
      id: 27,
      name: 'Avery Green',
      email: 'avery.g@example.com',
      role: 'Developer'
    },
    {
      id: 28,
      name: 'Madison Martin',
      email: 'madison.m@example.com',
      role: 'Support'
    },
    {
      id: 29,
      name: 'Elijah Rodriguez',
      email: 'elijahr@example.com',
      role: 'QA Engineer'
    },
    {
      id: 30,
      name: 'Grace Parker',
      email: 'grace.parker@example.com',
      role: 'Developer'
    },
    {
      id: 31,
      name: 'Aiden Allen',
      email: 'aidenallen@example.com',
      role: 'Manager'
    },
    {
      id: 32,
      name: 'Scarlett Scott',
      email: 'scarlett.s@example.com',
      role: 'Tester'
    },
    {
      id: 33,
      name: 'Lucas Young',
      email: 'l.young456@example.com',
      role: 'Product Owner'
    },
    {
      id: 34,
      name: 'Riley Harris',
      email: 'riley.harris123@example.com',
      role: 'Developer'
    },
    {
      id: 35,
      name: 'Natalie Turner',
      email: 'n.turner@example.com',
      role: 'Designer'
    },
    {
      id: 36,
      name: 'Liam Campbell',
      email: 'liam.c@example.com',
      role: 'Scrum Master'
    },
    {
      id: 37,
      name: 'Aria Wright',
      email: 'ariawright@example.com',
      role: 'Developer'
    },
    {
      id: 38,
      name: 'Luke Murphy',
      email: 'lukemurphy456@example.com',
      role: 'Support'
    },
    {
      id: 39,
      name: 'Ariana Reed',
      email: 'ariana.reed789@example.com',
      role: 'QA Engineer'
    },
    {
      id: 40,
      name: 'Jayden Baker',
      email: 'jbaker@example.com',
      role: 'Developer'
    },
    {
      id: 41,
      name: 'Luna Hall',
      email: 'lunahall@example.com',
      role: 'Manager'
    },
    {
      id: 42,
      name: 'Mateo Adams',
      email: 'mateoa@example.com',
      role: 'Tester'
    },
    {
      id: 43,
      name: 'Hannah King',
      email: 'h.king123@example.com',
      role: 'Product Owner'
    },
    {
      id: 44,
      name: 'Carter Wright',
      email: 'carter.wright@example.com',
      role: 'Developer'
    },
    {
      id: 45,
      name: 'Aubrey Clark',
      email: 'aubreyc456@example.com',
      role: 'Designer'
    },
    {
      id: 46,
      name: 'Henry Scott',
      email: 'henryscott@example.com',
      role: 'Scrum Master'
    },
    {
      id: 47,
      name: 'Eva Green',
      email: 'evagreen456@example.com',
      role: 'Developer'
    },
    {
      id: 48,
      name: 'Leo Martin',
      email: 'leo.martin@example.com',
      role: 'Support'
    },
    {
      id: 49,
      name: 'Mila Rodriguez',
      email: 'mila.r@example.com',
      role: 'QA Engineer'
    },
    {
      id: 50,
      name: 'Hudson Parker',
      email: 'hudson.parker@example.com',
      role: 'Developer'
    },
  ];

  sortBy: {
    order: 'asc' | 'desc' | undefined
    prop: string
  } = {
      order: undefined,
      prop: ''
    }

  searchBy: {
    text: string,
    prop: string
  } = {
      text: '',
      prop: ''
    }

  pagination: {
    count: number,
    current: number,
    start: number,
    end: number,
    length: number,
    total: number,
  } = {
      count: 15,
      current: 1,
      start: 0,
      end: 0,
      length: 0,
      total: 1
    }

  loading: boolean = true;

  constructor(
    private importService: ImportService
  ) { }

  get dataChanged() {
    return this._dataChanged;
  }

  set dataChanged(value: boolean) {
    this._dataChanged = value;
    if (value) {
      this.onDataChanged();
    }
  }

  private onDataChanged(): void {
    console.log('Data has changed!');
    this.processData();
  }

  setSortByValue(prop: string) {
    let order: 'asc' | 'desc' | undefined = undefined;
    if (this.sortBy.prop == prop) {
      switch (this.sortBy.order) {
        case 'asc':
          order = 'desc'
          break;

        case 'desc':
          order = undefined
          break;

        default:
          order = 'asc'
          break;
      }
    } else {
      order = 'asc';
    }

    if (order == undefined) {
      prop = 'id';
      order = 'asc';
    }

    this.sortBy.prop = prop;
    this.sortBy.order = order;
    this.dataChanged = true;
  }

  clientSort(data: any[]) {
    return data.sort((a, b) => {
      if (a[this.sortBy.prop] < b[this.sortBy.prop]) {
        return this.sortBy.order === 'asc' ? -1 : 1;
      }

      if (a[this.sortBy.prop] > b[this.sortBy.prop]) {
        return this.sortBy.order === 'asc' ? 1 : -1;
      }

      return 0;
    });
  }

  clientSearch(data: any[]) {
    if (this.searchBy.text == '') {
      return data;
    }

    if (this.searchBy.prop != '') {
      return data.filter((datum) => {
        return datum[this.searchBy.prop].toLowerCase().includes(this.searchBy.text.toLowerCase());
      });
    } else {
      return data.filter((datum) => {
        let objectWords = '';
        Object.keys(datum).forEach(key => {
          objectWords = objectWords + " " + datum[key];
        })

        return objectWords.toLowerCase().includes(this.searchBy.text.toLowerCase());
      });
    }
  }

  async serverPagination(response?: Response) {
    if (!this.config.serverSide) return;

    if (response) {
      this.config.serverSide.pagination.currentPage = parseInt(response.data.currentPage);
      this.config.serverSide.pagination.lastPage = parseInt(response.data.lastPage);
      this.config.serverSide.pagination.total = parseInt(response.data.total);
      this.config.serverSide.pagination.perPage = parseInt(response.data.perPage);
    }

    this.pagination.total = this.config.serverSide.pagination.lastPage;
    this.pagination.length = this.config.serverSide.pagination.total;
    this.pagination.current = this.config.serverSide.pagination.currentPage;
    this.pagination.count = this.config.serverSide.pagination.perPage;
    await this.updatePagination();
  }

  clientPagination(data: any[]) {
    this.pagination.total = Math.ceil(data.length / this.pagination.count);
    this.pagination.length = data.length;
    this.updatePagination();

    const paginatedData = data.slice(this.pagination.start, this.pagination.end);
    return paginatedData;
  }

  async updatePagination() {
    this.pagination.start = (this.pagination.current - 1) * parseInt(this.pagination.count + '');
    this.pagination.end = this.pagination.start + parseInt(this.pagination.count + '');
  }

  async navigateToPage(action: 'first' | 'next' | 'previous' | 'last' | 'open', page?: number) {
    switch (action) {
      case 'first':
        this.pagination.current = 1;
        break;
      case 'next':
        if (this.pagination.current < this.pagination.total) {
          this.pagination.current += 1;
        }
        break;
      case 'previous':
        if (this.pagination.current > 1) {
          this.pagination.current -= 1;
        }
        break;
      case 'last':
        this.pagination.current = this.pagination.total;
        break;
      case 'open':
        if (page) {
          this.pagination.current = Math.min(Math.max(1, page), this.pagination.total);
        }
        break;
    }

    this.dataChanged = true;
    await this.updatePagination();
  }

  async queryData(): Promise<Response | undefined> {
    if (!this.config.serverSide || !this._dataChanged) return;
    let query: Query = {
      page: this.pagination.current,
      perPage: this.pagination.count,
      search: {
        field: this.searchBy.prop,
        keyword: this.searchBy.text
      },
      sort: {
        field: this.sortBy.prop,
        direction: this.sortBy.order ?? 'asc'
      }
    }

    if (!this.config.serverSide.getFn) return;
    return await this.config.serverSide.getFn(query);
  }

  async processData() {
    if (!this.dataChanged) {
      this.loading = false;
      return
    }

    // Server Side
    if (this.config.serverSide) {
      this.loading = true;
      let response = await this.queryData();
      this.processedData = response ? response.data.users : [];
      this.serverPagination(response);
      this.dataChanged = false;
      this.loading = false;
      return;
    }

    // Client side
    let data = (JSON.parse(JSON.stringify(this.data))); // clone
    data = this.clientSearch(data);
    data = this.clientSort(data);
    data = this.clientPagination(data);
    this.processedData = data;
    this.dataChanged = false;
  }

  @ViewChild('fileInput') fileInput: any;
  importCsv() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  importData() {
    if (!this.selectedFile) {
      return;
    }

    this.importService.parseCsvFile(this.selectedFile)
      .then((parsedCsv: string) => {
        console.log(parsedCsv)
        if (this.config.importFn) {
          this.config.importFn(parsedCsv);
          // reset input after import
          this.fileInput.nativeElement.value = null;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  clearFile(): void {
    this.selectedFile = null;
    // Reset file input value to clear selection (optional)

  }

  click(datum: any) {
    if (!this.config.clickFn) return;
    this.config.clickFn(datum);
  }

  create() {
    if (!this.config.createFn) return;
    this.config.createFn();
  }

  ngOnInit() {
    this.processData();
  }
}
