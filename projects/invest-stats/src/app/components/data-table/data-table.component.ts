import { Component, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { InvestModel } from '../../models/invest.model';
import { addInvestition, removeInvestitions, setActiveInvestition, updateInvestitions } from '../../store/invests.actions';
import InvestState from '../../store/invests.state';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnDestroy {
  displayedColumns: string[] = ['index', 'date', 'currency', 'amount', 'cost', 'fee', 'options'];

  public panelOpenState = false;
  public editingModel?: InvestModel;
  public investitions$: Observable<Array<InvestModel>>;
  public activeInvestitionSubscribtion: Subscription;

  constructor(private store: Store<{ investitions: InvestState }>) {
    this.investitions$ = this.store
      .pipe(
        select('investitions'),
        map(state => {
          return state.investitions;
        })
      );
    this.activeInvestitionSubscribtion = this.store
      .pipe(
        select('investitions')
      ).subscribe(state => {
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

  ngOnDestroy(): void {
    this.activeInvestitionSubscribtion.unsubscribe();
  }
}
