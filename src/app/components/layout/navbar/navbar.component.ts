import { Component, OnInit } from '@angular/core';
import { AuthenticationHelper } from 'src/app/helpers/authentication.helper';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  // Variável do compoente
  isSignedIn: boolean = false;

  // Construtor
  constructor(
    private authenticationHelper: AuthenticationHelper,
  ){}

  // Método executado quando o componente é renderizado
  ngOnInit(): void {

    this.isSignedIn = this.authenticationHelper.isSignedIn();

  }

}
