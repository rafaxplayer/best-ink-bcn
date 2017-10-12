import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import { Router } from '@angular/router'

@Injectable()
export class FirebaseauthService {

  authState: any = null;
  
   constructor(private afAuth: AngularFireAuth, private router: Router) {
     this.afAuth.authState.subscribe((auth) => {
       this.authState = auth
       
     });
   }
  
    get isUserAnonymousLoggedIn(): boolean {
     return (this.authState !== null) ? this.authState.isAnonymous : false
   } 
  
   get currentUserId(): string {
     return (this.authState !== null) ? this.authState.uid : ''
   }
  
   get currentUserName(): string {
     return this.authState['email']
   }
  
   get currentUser(): any {
     return (this.authState !== null) ? this.authState : null;
   }
  
   get isLoggedIn(): boolean {
     if ((this.authState !== null) && (!this.isUserAnonymousLoggedIn)) {
       return true
     } else {
       return false
     }
   }
  
   /* signUpWithEmail(email: string, password: string) {
     return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
       .then((user) => {
         this.authState = user
       })
       .catch(error => {
         console.log(error)
         throw error
       });
   } */
  
   login(email: string, password: string) {
     return this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((user) => {
          
         this.authState = user
       })
       .catch(error => {
         console.log(error)
         throw error
       }); 
   }
  
   signOut(): void {
     this.afAuth.auth.signOut();
     this.router.navigate(['/home'])
   }

}
