import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';
import { UpdateDialogService } from './update-dialog/update-dialog.service';

import { NgbdTableComplete } from './table-complete';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [NgbdTableComplete, UpdateDialogComponent],
  providers: [ UpdateDialogService ],
  entryComponents: [ UpdateDialogComponent ],
  exports: [NgbdTableComplete],
  bootstrap: [NgbdTableComplete]
})
export class NgbdTableCompleteModule {}
