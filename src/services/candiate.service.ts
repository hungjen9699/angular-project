import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class WasteWaterService {

    rootUrl: 'http://localhost:3000/candiate'

    constructor(
        private http: HttpClient,
    ) { }

    getCandiateList() {
        return this.http.get(this.rootUrl);
    }

    createCandiate(params) {
        return this.http.post(this.rootUrl, params);
    }

    getCandiateById(id: string) {
        return this.http.get(this.rootUrl, { params: { id } });
    }

    deleteCandiateById(id: string) {
        return this.http.delete(this.rootUrl, { params: { id } });
    }
}
