import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { ContatosPostModel } from 'src/app/models/contatos/contatos-post.model';
import { ContatosService } from 'src/app/services/contatos.service';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss']
})
export class CreateContactComponent {

  // Construtor
  constructor(
    private contatosService: ContatosService,
    private ngxSpinnerService: NgxSpinnerService
  ){}

  // Estrutura do formulário
  formCreateContact = new FormGroup({
    // Campo nome
    nome: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(100),
    ]),
    // Campo email
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    // Campo telefone
    telefone: new FormControl('', [
      Validators.required,
    ]),
  });

  // Função para executar validação dos campos
  get form(): any {
    return this.formCreateContact.controls;
  }

  // Função para capturar o evento SUBMIT
  onSubmit(): void {
    this.ngxSpinnerService.show();

    const model: ContatosPostModel = {
      nome: this.formCreateContact.value.nome as string,
      email: this.formCreateContact.value.email as string,
      telefone: this.formCreateContact.value.telefone as string,
    };

    this.contatosService.post(model)
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (e) => {
          console.log(e.error);
        }
      }).add(() => {
        this.ngxSpinnerService.hide();
      });
  }


}
