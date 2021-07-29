import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from '../employee';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './update-dialog.component.html',
})
export class UpdateDialogComponent implements OnInit {
  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('addressInput') addressInput: ElementRef;
  @ViewChild('dobInput') dobInput: ElementRef;
  @Input() employee: Employee;
  @Input() title: string;
  @Input() message: string;
  @Input() btnOkText: string;
  @Input() btnCancelText: string;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  public decline() {
    this.activeModal.close(false);
  }
  public validate(name,address,dob){
    var pattern =/^(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/([0-9]{4})$/;
    if(pattern.test(dob)&&name!=''&&address!=''){
        return true;
    }
    else return false;
  }
  public accept() {
    var name =this.nameInput.nativeElement.value;
    var address =this.addressInput.nativeElement.value;
    var dob =this.dobInput.nativeElement.value;
    if(this.validate(name, address,dob)){
      this.employee.name=name;
      this.employee.address=address;
      this.employee.dob=dob;
      this.activeModal.close(this.employee);
    }
    else alert("Please input true format");
  
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

}
