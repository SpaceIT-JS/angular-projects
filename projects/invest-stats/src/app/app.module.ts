import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { SnackBarModule } from './modules/snack-bar/snack-bar.module';
import { InvestitionReducer } from './store/invests.reducer';

@NgModule({
  declarations: [
    AppComponent,
    DataTableComponent,
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    FormsModule,
    SnackBarModule,

    MatExpansionModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    StoreModule.forRoot({
      investitions: InvestitionReducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
