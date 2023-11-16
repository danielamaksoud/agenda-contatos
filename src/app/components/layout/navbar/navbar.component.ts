import { Component, OnInit } from '@angular/core';
import { AuthenticationHelper } from 'src/app/helpers/authentication.helper';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  // Variáveis do compoente
  isSignedIn: boolean = false;
  nomeUsuario: string = "";
  emailUsuario: string = "";

  // Construtor
  constructor(
    private authenticationHelper: AuthenticationHelper,
  ){}

  // Método executado quando o componente é renderizado
  ngOnInit(): void {

    this.isSignedIn = this.authenticationHelper.isSignedIn();

    if(this.isSignedIn) {
      // Captura os dados do usuário autenticado
      const data = this.authenticationHelper.getData();
      this.nomeUsuario = data?.nome as string;
      this.emailUsuario = data?.email as string;
    }

  }

  // Método para fazer o logout do usuário
  logout(): void {
    if(window.confirm('Deseja realmente sair do sistema?')) {
      // Faz o logout do usuário
      this.authenticationHelper.signOut();
      // Redireciona para a página de login
      window.location.href = "/account/login";
    }
  }

}
