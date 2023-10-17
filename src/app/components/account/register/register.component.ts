import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatchPasswordValidator } from 'src/app/validators/match-password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  // Criando a estrutura do formulário

  formRegister = new FormGroup({

    /* Campo 'nome' */
    nome: new FormControl ('', [
      Validators.required, /* Campo obrigatório */
      Validators.minLength(8), /* Mínimo de 8 caracteres */
      Validators.maxLength(100), /* Máximo de 100 caracteres */
    ]),

    /* Campo 'email' */
    email: new FormControl ('', [
      Validators.required, /* Campo obrigatório */
      Validators.email, /* Formato de email válido */
    ]),

    /* Campo 'senha' */
    senha: new FormControl('', [
      Validators.required, /* Campo obrigatório */
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/
      ),
      //  Senha forte:
      //  Deve conter:
      //    - Pelo menos 8 caracteres.
      //    - Pelo menos uma letra maiúscula.
      //    - Pelo menos uma letra minúscula.
      //    - Pelo menos um número.
      //  Pode conter caracteres especiais.
    ]),

    /* Campo 'senhaConfirmacao' */
    senhaConfirmacao: new FormControl ('', [
      Validators.required, /* Campo obrigatório */
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/
      ),
      //  Senha forte:
      //  Deve conter:
      //    - Pelo menos 8 caracteres.
      //    - Pelo menos uma letra maiúscula.
      //    - Pelo menos uma letra minúscula.
      //    - Pelo menos um número.
      //  Pode conter caracteres especiais.
    ]),

  },
  
    /* Adicionando validações customizadas. */
    {
      validators: [MatchPasswordValidator.matchPassword],
    }
  );

  /*
    Função para permitir o acesso aos
    campos contidos no formulário.
  */
 get form(): any {
  // Retornar os campos do formulário.
  return this.formRegister.controls;
 };

 /*
  Função para capturar o evento de submit.
 */
onSubmit(): void {
  /* Imprimir os campos do formulário. */
  console.log(this.formRegister.value);
};

}
