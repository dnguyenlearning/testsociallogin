import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateProductComponent } from './create-product/create-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products:any;
  constructor(
    private productService:ProductService,
    public dialog:MatDialog
  ) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(res=>{
      if(res.success){
        this.products=res.data.products;
      }else{
        console.log(res.data.message);
      }
    },
    (err:Response)=>{
      console.log(err);
    })
  }


  openCreateProduct(){
    let dialogRef = this.dialog.open(CreateProductComponent, {
      width: '250px',
      data: { test:'tgseate' }
    });

    dialogRef.afterClosed().subscribe(result=>{
      if(dialogRef.componentInstance.createSuccess){
        this.products.push(dialogRef.componentInstance.dataForm);
      }
      
    })
  }

  editProduct(product){
    let dialogRef = this.dialog.open(EditProductComponent, {
      width: '250px',
      data: { product : product }
    });

    dialogRef.afterClosed().subscribe(result=>{
      if(dialogRef.componentInstance.editSuccess){
        let productId=dialogRef.componentInstance.productId;

        this.products.map((product)=>{
          if(product._id==productId){
            product.name=dialogRef.componentInstance.dataForm.name;
            product.price=dialogRef.componentInstance.dataForm.price;
          }
        })

      }
    })
    
  }


  deleteProduct(product){
    let position:number=0;

    this.products=this.products.filter((item,index)=>{
      if(item._id==product._id){
        position=index;
      }
      return item._id!=product._id
    })
    

    this.productService.deleteProduct(product._id).subscribe(res=>{
      console.log(res);
      if(res.success){
        
        console.log(this.products);
      }else{
        console.log(res.data.message)
      }
    },
    (err:Response)=>{
      console.log(err);
      this.products.splice(position,0,product);
    })
  }
}
