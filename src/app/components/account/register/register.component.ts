import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { CriarContaRequestModel } from 'src/app/models/usuarios/criar-conta-request.model';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { MatchPasswordValidator } from 'src/app/validators/match-password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  // Variáveis do Componente
  mensagemSucesso: string = '';
  mensagemErro: string = '';

  // Construtor
  constructor(
    // Injeção de dependência
    // Nome: Tipo
    private usuariosService: UsuariosService,
    private ngxSpinnerService: NgxSpinnerService,
  ) {};

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
  this.ngxSpinnerService.show();

  this.mensagemErro = '';
  this.mensagemSucesso = '';

  const model: CriarContaRequestModel = {
    nome: this.formRegister.value.nome as string,
    email: this.formRegister.value.email as string,
    senha: this.formRegister.value.senha as string,
  };

  this.usuariosService.criarConta(model)
  .subscribe({
    // Sucesso
    next: (response) => {
      this.mensagemSucesso = `Parabéns, ${response.nome}! Sua conta foi criada com sucesso.`;
      this.formRegister.reset(); // Limpar o formulário.
    },
    // Falha
    error: (e) => {
      this.mensagemErro = e.error.message;
    }
  }).add(() => {
    this.ngxSpinnerService.hide();
  });

};

}
