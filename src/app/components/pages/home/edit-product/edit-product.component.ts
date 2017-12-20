import { Product } from './../../../modals/product';
import { ProductService } from './../../../../services/product.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  error:string;
  editSuccess:boolean=false;
  dataForm={
    name:'',
    price:0
  }
  productId:string='';
  constructor(
    public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.editSuccess=false;
    this.dataForm={
      name:this.data.product.name,
      price:this.data.product.price
    }
    this.productId=this.data.product._id;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  saveProduct(){
    let newProduct={
      name:this.dataForm.name,
      price: Number(this.dataForm.price)
    }

    this.productService.updateProduct(newProduct,this.productId).subscribe(res=>{
      if(res.success){
        this.dataForm=newProduct;
        this.editSuccess=true;
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
