import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from './product-create/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "  http://localhost:3001/products"
  constructor(private snakbar: MatSnackBar, private http: HttpClient) { }

  //Exibe mensagem ao clicar em botão Salvar
  shoMessage(msg: string): void {
    this.snakbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  //Chamada para o back-end - Inserindo produtos 
  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product)
  }
  //Listando produtos
  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl)
  }

}
