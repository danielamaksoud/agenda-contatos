import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { ContatosPostModel } from '../models/contatos/contatos-post.model';
import { ContatosGetModel } from '../models/contatos/contatos-get.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class ContatosService {

    constructor(
        private httpClient: HttpClient
    ) {
    }

    // POST /api/contatos
    post(model: ContatosPostModel): Observable<ContatosGetModel> {
        return this.httpClient.post<ContatosGetModel> (
            environment.apiContatos + '/contatos',
            model
        )
    }


}