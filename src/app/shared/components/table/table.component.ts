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
import * as pluralize from 'pluralize';

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
    type?: string,
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

  @Input() data: any[] = [];

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
  pluralModelText: string = '';

  constructor(
    private importService: ImportService,
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
      this.processedData = response ? response.data[pluralize.plural(this.config.model)] : [];
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
    this.loading = false;
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
    this.pluralModelText = pluralize.plural(this.config.model);
  }
}
