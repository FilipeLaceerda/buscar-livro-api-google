import { VolumeInfo, Livro, Item, LivrosResultado } from './../../models/interface';
import { Component, OnDestroy } from '@angular/core';
import { catchError, debounceTime, distinctUntilChanged, filter, map, of, Subscription, switchMap, throwError } from 'rxjs';
import { LivroService } from 'src/app/service/livro.service';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { FormControl } from '@angular/forms';

const PAUSA = 300;
@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy{

  listaLivros: LivroVolumeInfo[];
  campoBusca= new FormControl();
  messageError: string = '';
  livrosResultado: LivrosResultado;
  subscription: Subscription;
  livro: Livro
  constructor(private service: LivroService) { }


  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    debounceTime(PAUSA),
    filter((valorDigitado) => valorDigitado.length >= 3),
    distinctUntilChanged(),
    switchMap((valorDigitado) => this.service.getBooks(valorDigitado)),
    map(resultado => this.livrosResultado = resultado),
    map(resultado => resultado.items ?? []),
    map(items => this.listaLivros = this.livrosResultadoParaLivros(items)),
    catchError(erro => {
      console.log(erro);
      return throwError(() => new Error(this.messageError = 'Ops, ocorreu um erro. Recarregue a aplicação.'))
    })
  )

  /* buscarLivros(){
  this.subscription = this.service.getBooks(this.campoBusca).subscribe({
      next: (value) => {
          this.listaLivros = this.livrosResultadoParaLivros(value)
      },
      error(err) {
          console.log(err);
      },
    });
  } */

  private livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map( item => {
      return new LivroVolumeInfo(item);
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}



