/*

Classe para validação de comparação de senhas.

*/

import { AbstractControl } from "@angular/forms";

export class MatchPasswordValidator {

    /* Método para realização e validação do match de senhas. */

    static matchPassword(abstractControl: AbstractControl) {
        // Capturar o valor do campo 'senha' do formulário.
        let senha = abstractControl.get('senha')?.value;

        // Capturar o valor do campo 'senhaConfirmacao' do formulário.
        let senhaConfirmacao = abstractControl.get('senhaConfirmacao')?.value;

        // Verificar se os campos estão com valores diferentes.
        if(senhaConfirmacao.length > 0 && senhaConfirmacao != senha) {
            // Gerando um erro de validação.
            abstractControl.get('senhaConfirmacao')?.setErrors({
                // Definindo o nome do erro.
                matchPassword: true
            });
        };
        return null;
    };

}