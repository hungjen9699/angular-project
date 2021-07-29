import { Injectable } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateDialogComponent } from './update-dialog.component';
import { Employee } from '../employee';


@Injectable()
export class UpdateDialogService {

  constructor(private modalService: NgbModal) { }

  public confirm(
    employee: Employee,
    title: string,
    message: string,
    btnOkText: string = 'Update',
    btnCancelText: string = 'Cancel',
    dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(UpdateDialogComponent, { size: dialogSize });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.employee = employee;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;

    return modalRef.result;
  }

}
