import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationHelper } from 'src/app/helpers/authentication.helper';
import { AutenticarRequestModel } from 'src/app/models/usuarios/autenticar-request.model';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  // Variáveis do componente
  mensagemErro: string = '';

  // Método construtor
  constructor(
    // Injeção de dependência
    private ngxSpinnerService: NgxSpinnerService,
    private usuariosService: UsuariosService,
    private authenticationHelper: AuthenticationHelper,
  ) {}

  // Criando a estrutura do formulário
  formLogin = new FormGroup({
    // Campo 'email'
    email: new FormControl('', [
      Validators.required, // Campo obrigatório
      Validators.email, // Formato de email válido
    ]),
    // Campo 'senha'
    senha: new FormControl('', [
      Validators.required, // Campo obrigatório
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
  });

  // Função para permitir o acesso aos campos
  // contidos no formulário
  get form(): any {
    // Retornar os campos do formulário
    return this.formLogin.controls;
  }

  // Função executada no submit do formulário
  onSubmit(): void {
    // Exibindo o spinner
    this.ngxSpinnerService.show();

    const model: AutenticarRequestModel = {
      email: this.formLogin.value.email as string,
      senha: this.formLogin.value.senha as string,
    };

    this.usuariosService
    .autenticar(model)
    .subscribe({
      next: (response) => {
        // Gravar os dados do usuário autenticado na Local Storage
        this.authenticationHelper.signIn(response);
        // Redirecionar para a página de dashboard
        window.location.href = "/admin/dashboard";
      },
      error: (e) => {
        this.mensagemErro = e.error.message;
      }
    }).add(() => {
      this.ngxSpinnerService.hide();
    });

  }
}
