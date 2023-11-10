import { Injectable } from '@angular/core';
import { AutenticarResponseModel } from '../models/usuarios/autenticar-response.model';
import { decryptData, encryptData } from '../utils/crypto.util';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationHelper {
  // Chave dos dados no Local Storage
  auth: string = 'auth';

  /*
        Método para salvar os dados do usuário identificado
        no local storage do navegador
    */
  signIn(model: AutenticarResponseModel): void {
    // Converter o objeto em JSON
    let data = JSON.stringify(model);
    // Criptografar os dados
    data = encryptData(data, environment.cryptoKey);
    // Salvar os dados no Local Storage
    localStorage.setItem(this.auth, data);
  }

  /*
        Método para verificar se o usuário está autenticado
        (Os dados do local storage são válidos)
    */
  isSignedIn(): boolean {
    // Capturar os dados do Local Storage
    const model = this.getData();
    if (model != null) {
      // Verificar se o token ainda é válido
      const dataAtual = new Date();
      const dataExpiracao = new Date(model.expiration as Date);
      if (dataAtual <= dataExpiracao) {
        return true; // Usuário está autenticado
      } else {
        this.signOut(); // Logout
      }
    }
    return false;
  }

  /*
        Método para retornar os dados do Local Storage
    */
  getData(): AutenticarResponseModel | null {
    // Ler os dados gravados
    const data = localStorage.getItem(this.auth);
    // Verificar se o localStorage não é vazio
    if (data != null) {
      // Descriptografar os dados e converter em objeto
      const model = JSON.parse(decryptData(data, environment.cryptoKey));
      return model; // Retorna o objeto
    }

    return null;
  }

  /*
    Método para apagar os dados do Local Storage
  */
  signOut(): void {
    localStorage.removeItem(this.auth);
  }
}
