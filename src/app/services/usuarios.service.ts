import { HttpClient } from "@angular/common/http";
import { CriarContaRequestModel } from "../models/usuarios/criar-conta-request.model";
import { CriarContaResponseModel } from "../models/usuarios/criar-conta-response.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.development";
import { Injectable } from "@angular/core";

// Annotation que permite que classe seja usada por injeção de dependência.
@Injectable({
    providedIn: 'root'
})

export class UsuariosService {

    // Construtor
    constructor(
        // Injeção de dependência
        private httpClient: HttpClient
    ){};

    /*
        Método para executar a criação de conta de usuário.
    */
   criarConta(
        model: CriarContaRequestModel
    ): Observable<CriarContaResponseModel> {
        // Requisição POST para o serviço
        return this.httpClient.post<CriarContaResponseModel>(
            environment.apiContatos + "/criar-conta",
            model
    );
   };

}