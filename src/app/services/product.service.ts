import { Injectable } from '@angular/core';
import { Http , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'


@Injectable()
export class ProductService {

  backend_url='http://localhost:3000/api/products';

  constructor(private http: Http) { }

  getProducts():Observable<any>{
    let headers=new Headers();
    headers.append('Content-type','application/json');
    return this.http.get(this.backend_url,{headers:headers})
      .map(res=>res.json())
  }

  createProduct(newProduct){
    let headers=new Headers();
    headers.append('Content-type','application/json');
    return this.http.post(this.backend_url,newProduct,{headers:headers})
      .map(res=>res.json())
  }

  deleteProduct(productId){
    return this.http.delete(this.backend_url+'/'+productId,)
      .map(res=>res.json())
  }

  updateProduct(newProduct,productId ){
    let headers=new Headers();
    headers.append('Content-type','application/json');
    return this.http.put(this.backend_url+'/'+productId,newProduct,{headers:headers})
    .map(res=>res.json())
  }


}
