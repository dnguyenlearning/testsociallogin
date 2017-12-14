import { Component } from '@angular/core';
import { AuthService } from 'angular4-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";
import { SocialUser } from "angular4-social-login";
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app';
  public user: SocialUser;
  private loggedIn: boolean;
 

  constructor(
    private authService: AuthService,
  ){
    
  }


  

  ngOnInit(){
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(user);
      this.loggedIn = (user != null);
    });
  }

  signInWithGoogle():void{
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFacebook():void{
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);    
  }

  logout(): void {
    this.authService.signOut();
  }
}
