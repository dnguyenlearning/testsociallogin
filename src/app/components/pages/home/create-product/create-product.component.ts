import { ProductService } from './../../../../services/product.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Product } from '../../../modals/product';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  error:string;
  createSuccess:boolean=false;
  dataForm={
    name:'',
    price:0
  }
  constructor(
    public dialogRef: MatDialogRef<CreateProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.createSuccess=false;
    console.log(this.createSuccess);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  createProduct(){
    let newProduct:Product={
      name:this.dataForm.name,
      price: Number(this.dataForm.price),
      author:'agsdkhaklshglad',
    }

    this.productService.createProduct(newProduct).subscribe(res=>{
      console.log(res);
      if(res.success){
        this.dataForm=res.data.product;
        this.createSuccess=true;
        this.onClose();

      }else{
        this.error=res.data.message;
      }
    },
    (err:Response)=>{
      console.log(err);
    })
  }


}
