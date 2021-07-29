import {DecimalPipe} from '@angular/common';
import {Component, QueryList, ViewChildren} from '@angular/core';
import {Observable} from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { map } from 'rxjs/operators';
import { UpdateDialogService } from './update-dialog/update-dialog.service';
import { EmployeeService } from './employees.service';
import { Employee } from './employee';



@Component(
    {selector: 'ngbd-table-complete', templateUrl: './table-complete.html', providers: [EmployeeService, DecimalPipe]})
export class NgbdTableComplete {
  employees$: Observable<Employee[]>;
  total$: Observable<number>;


  constructor(public service: EmployeeService, private updateDialogService: UpdateDialogService) {
    this.employees$ = service.employees$;
    this.total$ = service.total$;
  }


  updateRow(employee: Employee){
    this.updateDialogService.confirm(employee,employee.id, 'Do you really want to delete this row ?')
    .then((confirmed) =>
    {
      console.log('success');
    }
    )
    .catch(() => console.log('Error'));
  } 
  deleteRow(id: string){
    var delBtn = confirm(" Do you want to delete ?");
    if ( delBtn == true ) {
      this.employees$
        .pipe(
            map(places => {
                return places.filter(place => place.id !== id);
            }),
            map(response => (this.employees$ = of(response)))
        )
        .subscribe(result => console.warn('Result: ', result));
    }   
  } 


}
