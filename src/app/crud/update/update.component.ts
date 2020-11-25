import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../product';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  id:any;
  product: Product;
  productForm: FormGroup;
  constructor(
    public fb: FormBuilder, private router:Router, public _crudService:CrudService, private route: ActivatedRoute
  ) { }

  ngOnInit(){
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('productId');
      this._crudService.getById(this.id).subscribe(data => this.setForm(data));
      this.productForm = this.fb.group({
        name: [''],
        description: [''],
        price: [''],
        quantity: [''],
      });
    });
  }

  setForm(product:Product){
    this.productForm = this.fb.group({
      name: [product.name, [Validators.required, Validators.minLength(5)]],
      description: [product.description, [Validators.required, Validators.minLength(20)]],
      price: [product.price, [Validators.required]],
      quantity: [product.quantity, [Validators.required, Validators.pattern("^[0-9]*$")]],
    });
  }

  submitForm(){
    this._crudService.update(this.id, this.productForm.value).subscribe(res => this.router.navigateByUrl('crud/home'));
  }

  get name() { return this.productForm.get('name'); }
  get description() { return this.productForm.get('description'); }
  get price() { return this.productForm.get('price'); }
  get quantity() { return this.productForm.get('quantity'); }

}
