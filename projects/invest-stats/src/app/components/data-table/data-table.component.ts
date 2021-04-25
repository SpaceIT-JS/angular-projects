import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent {
  public editRowIndex?: number;
  public panelOpenState = true;


  displayedColumns: string[] = ['index', 'date', 'currency', 'amount', 'cost', 'fee', 'options'];
  dataSource = new MatTableDataSource([
    { date: 1619383421123, currency: 'ETH', amount: 6.941, cost: 200 },
    { date: 1619383421123, currency: 'BTC', amount: 9.0122, cost: 400 }
  ]);

  startEditRow(idx: number): void {
    console.log('DataTableComponent::startEditRow', { idx });
    this.editRowIndex = idx;
  }

  stopEditRow(): void {
    console.log('DataTableComponent::stopEditRow');
    // TODO: store new data;
    delete this.editRowIndex;
  }

  addRow(): void {
    console.log('DataTableComponent::addRow');
    const data = this.dataSource.data;
    const newRowIdx = data.push(
      { date: Date.now(), currency: 'BTC', amount: 9.0122, cost: 300 }
    ) - 1;
    this.dataSource.data = data;
    this.startEditRow(newRowIdx);
  }
  removeRow(idx: number): void {
    console.log('DataTableComponent::removeRow');
    const data = this.dataSource.data.filter((_, elIdx) => idx !== elIdx);
    this.dataSource.data = data;
  }
}
