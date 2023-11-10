import { Injectable } from "@angular/core";
import { AuthenticationHelper } from "../helpers/authentication.helper";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root',
})

export class AdminGuard {

    // Método construtor
    constructor(
        private authenticationHelper: AuthenticationHelper,
        private router: Router,
    ) {}

    // Método para verificar se a rota pode ser acessada
    canActivate(): boolean {
        // Verificar se o usuário está autenticado
        if(this.authenticationHelper.isSignedIn()) {
            // Rota pode ser acessada
            return true;
        }
        else {
            // Trocar a rota do usuário (página de login)
            this.router.navigate(['/account/login']);
            return false;
        }
    }

}