import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { InvestModel } from '../../models/invest.model';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent {
  public panelOpenState = true;
  public editingModel?: InvestModel;

  displayedColumns: string[] = ['index', 'date', 'currency', 'amount', 'cost', 'fee', 'options'];
  dataSource = new MatTableDataSource<InvestModel>([
    new InvestModel('2021-03-14T01:35', 'ETH', 6.941, 200),
    new InvestModel('2021-04-23T22:35', 'BTC', 9.0122, 400)
  ]);

  startEditRow(idx: number): void {
    console.log('DataTableComponent::startEditRow', { idx });
    this.editingModel = this.dataSource.data[idx];
    this.editingModel.idx = idx;
  }

  stopEditRow(): void {
    console.log('DataTableComponent::stopEditRow');
    const data = this.dataSource.data;
    if (this.editingModel && this.editingModel.idx !== undefined) {
      data[this.editingModel.idx] = this.editingModel;
    }
    this.dataSource.data = data;

    delete this.editingModel;
  }

  isRowEditing(idx: number): boolean {
    return this.editingModel !== undefined && this.editingModel?.idx === idx; 
  }

  addRow(): void {
    console.log('DataTableComponent::addRow');
    const data = this.dataSource.data;
    const newRowIdx = data.push(new InvestModel()) - 1;
    this.dataSource.data = data;
    this.startEditRow(newRowIdx);
  }

  removeRow(idx: number): void {
    console.log('DataTableComponent::removeRow');
    const data = this.dataSource.data.filter((_, elIdx) => idx !== elIdx);
    this.dataSource.data = data;
  }
}
