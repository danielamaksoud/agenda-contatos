import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // Variáveis do componente
  grafico: Chart = new Chart();
  tipo: string = 'bar';

  // Evento executado quando o componente é renderizado
  ngOnInit(): void {

    // Dados do gráfico
    const dados = [
      ['Exemplo 1', 10], 
      ['Exemplo 2', 20], 
      ['Exemplo 3', 30], 
      ['Exemplo 4', 15]
    ];
    const nomes = [
      'Exemplo 1', 
      'Exemplo 2', 
      'Exemplo 3', 
      'Exemplo 4'
    ];

    // Desenhando o gráfico
    this.grafico = new Chart({
      chart: {type: this.tipo},
      title: {text: 'Resumo da agenda de contatos'},
      subtitle: {text: 'Exemplo de gráfico - Highcharts'},
      series: [{
        data: dados,
        type: undefined as any
      }],
      xAxis: {
        categories: nomes
      },
      legend: { enabled: false },
      credits: {enabled: false },
    });

  }

}
