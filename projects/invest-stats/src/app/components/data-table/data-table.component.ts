import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { InvestModel } from '../../models/invest.model';
import { ExportService, ExportType } from '../../services/export.service';
import { addInvestition, removeInvestitions, setActiveInvestition, updateInvestitions, replaceInvestitions } from '../../store/invests.actions';
import InvestState from '../../store/invests.state';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnDestroy {
  displayedColumns: string[] = ['index', 'date', 'currency', 'amount', 'cost', 'fee', 'options'];

  @ViewChild('fileInput') fileInput?: ElementRef;

  public panelOpenState = false;
  public editingModel?: InvestModel;
  public investitions$: Observable<Array<InvestModel>>;

  private investitionsStore$: Observable<InvestState>;
  private activeInvestitionSubscribtion: Subscription;

  constructor(
    private store: Store<{ investitions: InvestState }>,
    private exportService: ExportService
  ) {
    this.investitionsStore$ = this.store.pipe(select('investitions'));

    this.investitions$ = this.investitionsStore$
      .pipe(
        map(state => state.investitions)
      );
    this.activeInvestitionSubscribtion = this.investitionsStore$.subscribe(state => {
      this.editingModel = { ...state.activeInvestition } as InvestModel;
    });
  }

  startEditRow(idx: number): void {
    console.log('DataTableComponent::startEditRow', { idx });
    this.store.dispatch(setActiveInvestition({
      idx
    }));
  }

  stopEditRow(): void {
    console.log('DataTableComponent::stopEditRow');
    if (this.editingModel?.idx !== undefined) {
      this.store.dispatch(updateInvestitions({
        idx: this.editingModel.idx,
        value: this.editingModel
      }));
    }

    delete this.editingModel;
  }

  isRowEditing(idx: number): boolean {
    return this.editingModel !== undefined && this.editingModel?.idx === idx;
  }

  addRow(): void {
    console.log('DataTableComponent::addRow');
    this.store.dispatch(addInvestition(new InvestModel()));
  }

  removeRow(idx: number): void {
    console.log('DataTableComponent::removeRow');
    this.store.dispatch(removeInvestitions({ idx }));
  }

  saveData(type: ExportType): void {
    console.log('DataTableComponent::saveData', { type });
    this.investitions$
      .pipe(take(1))
      .subscribe(investitions => {
        this.exportService.exportData(type, investitions);
      });
  }

  fileSelected(): void {
    if (!this.fileInput) {
      console.warn('Couldn\'t find file input element');
      return;
    }

    const selectedFile = this.fileInput.nativeElement.files[0] as Blob;
    this.exportService
      .importData('json', selectedFile)
      .pipe(take(1))
      .subscribe((res) => {
        this.store.dispatch(replaceInvestitions({
          newInvestitions: res as Array<InvestModel>
        }));
      });
  }

  loadData(type: ExportType): void {
    console.log('DataTableComponent::loadData');
  }

  ngOnDestroy(): void {
    this.activeInvestitionSubscribtion.unsubscribe();
  }
}
