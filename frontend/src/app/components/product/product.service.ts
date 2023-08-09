import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from './product-create/product.model';
import { EMPTY, Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "  http://localhost:3001/products"
  constructor(private snakbar: MatSnackBar, private http: HttpClient) { }

  //Exibe mensagem ao clicar em botão Salvar
  showMessage(msg: string,isError: boolean= false): void {
    this.snakbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error']:['msg-sucess']
    });
  }

  //Chamada para o back-end - Inserindo produtos 
  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );  
  }

 


  //Listando produtos
  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl)
  }

  readById(id: string): Observable<Product>{
    const url = `${this.baseUrl}/${id}`;
  return this.http.get<Product>(url).pipe(
    map((obj) => obj),
    catchError((e) => this.errorHandler(e))
  );  
  }

  update(product: Product): Observable<Product>{
    const url = `${this.baseUrl}/${product.id}`
   return this.http.put<Product>(url, product).pipe(
    map((obj) => obj),
    catchError((e) => this.errorHandler(e))
  );  
  }

    delete(id: number): Observable<Product>{
      const url = `${this.baseUrl}/${id}`;
      return this.http.delete<Product>(url).pipe(
        map((obj) => obj),
        catchError((e) => this.errorHandler(e))
      );  
  }

  //tratamento de erro com o servidor
  errorHandler(e: any): Observable<any>{
    console.log(e)
    this.showMessage("Ocorreu um erro!", true);
    return EMPTY;
  }
   
}