import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  productForm: FormGroup;
  constructor(
    public fb: FormBuilder, private router:Router, public _crudService:CrudService
  ) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      price: ['', [Validators.required]],
      quantity: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    });
  }

  submitForm(){
    this._crudService.create(this.productForm.value).subscribe(res => this.router.navigateByUrl('crud/home'));
  }

  get name() { return this.productForm.get('name'); }
  get description() { return this.productForm.get('description'); }
  get price() { return this.productForm.get('price'); }
  get quantity() { return this.productForm.get('quantity'); }

}
