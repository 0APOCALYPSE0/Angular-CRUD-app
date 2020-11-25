import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { Product } from '../product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];

  constructor(public _crudService: CrudService, private router: Router) { }

  ngOnInit(): void {
    this._crudService.getAll().subscribe((data:Product[]) => this.products = data);
  }

  deleteProduct(id:string){
    this._crudService.delete(id).subscribe(
      res => this._crudService.getAll().subscribe((data:Product[]) => this.products = data)
    );
  }

}
