import { Product } from './../product-create/product.model';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit{

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute){
  
  }
  product: Product ={
      id: 0,
      name: '',
      price: 0
    }
  
 
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.productService.readById(id!).subscribe(product =>{
      this.product = product
    });    
 }

  updateProduct(): void{
    this.productService.update(this.product).subscribe(() =>{
      this.productService.shoMessage('Produto alterado com sucesso!');
      this.router.navigate(['/products']);
    });
   
  }
  

  cancel(): void{
   this.router.navigate(['/products']);
  }
}
