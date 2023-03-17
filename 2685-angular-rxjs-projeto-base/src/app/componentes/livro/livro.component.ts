import { Component, Input, OnInit } from '@angular/core';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';

@Component({
  selector: 'app-livro',
  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.css']
})
export class LivroComponent implements OnInit{

  @Input() livro: LivroVolumeInfo;
  modalAberto: boolean;

  ngOnInit() {
  }

  onModalChange(evento: boolean) {
    this.modalAberto = evento;
  }
}
