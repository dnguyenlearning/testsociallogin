import { ProductService } from './services/product.service';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocialLoginModule, AuthServiceConfig } from "angular4-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angular4-social-login";

import { AppComponent } from './app.component';

import { Angular2SocialLoginModule } from "angular2-social-login";
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HomeComponent } from './components/pages/home/home.component';
import { EditProductComponent } from './components/pages/home/edit-product/edit-product.component';

import { RouterModule, Routes} from '@angular/router';

//material

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

//connect backend
import { HttpModule } from '@angular/http';
import { CreateProductComponent } from './components/pages/home/create-product/create-product.component';


let config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(environment.facebook.appId)
  },
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(environment.google.clientId)
  }
]);


export function provideConfig() {
  return config;
}




const routes:Routes=[
  {
    path:'', component:HomeComponent
  },
  {
    path:'about', component:AboutComponent
  }
]


import {MatInputModule,MatButtonModule, MatDialogModule, MatToolbarModule, MatCardModule, MatIconModule, MatListModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import { AboutComponent } from './components/pages/about/about.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    EditProductComponent,
    CreateProductComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    Angular2SocialLoginModule,
    SocialLoginModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    HttpModule,
    MatButtonModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatInputModule,
    FormsModule
  ],
  providers: [{
    provide: AuthServiceConfig,
    useFactory: provideConfig
  },
  ProductService
  ],
  bootstrap: [AppComponent],
  entryComponents:[CreateProductComponent, EditProductComponent]
})
export class AppModule { }

