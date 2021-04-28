import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import * as fromDataState from './reducers';

@NgModule({
  declarations: [
    AppComponent,
    DataTableComponent,
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    FormsModule,

    MatExpansionModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    StoreModule.forFeature(
      fromDataState.dataStateFeatureKey,
      fromDataState.reducers,
      { metaReducers: fromDataState.metaReducers }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
