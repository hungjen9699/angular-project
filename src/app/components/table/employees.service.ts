import { Injectable, PipeTransform } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

import { Employee } from './employee';
import { EMPLPOYEES } from './employees';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';

interface SearchResult {
  employees: Employee[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;



function matches(employee: Employee, term: string, pipe: PipeTransform) {
  return employee.name.toLowerCase().includes(term.toLowerCase())
    || employee.id.toLowerCase().includes(term.toLowerCase())
    || employee.address.toLowerCase().includes(term.toLowerCase()) || employee.dob.toLowerCase().includes(term.toLowerCase());
}

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _employees$ = new BehaviorSubject<Employee[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
  };

  constructor(private pipe: DecimalPipe) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._employees$.next(result.employees);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get employees$() { return this._employees$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({ page }); }
  set pageSize(pageSize: number) { this._set({ pageSize }); }
  set searchTerm(searchTerm: string) { this._set({ searchTerm }); }


  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const { pageSize, page, searchTerm } = this._state;

    let employees = EMPLPOYEES;

    employees = employees.filter(employee => matches(employee, searchTerm, this.pipe));
    const total = employees.length;

    employees = employees.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ employees, total });
  }
}
