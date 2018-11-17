import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import {AngularFireAuth} from 'angularfire2/auth';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  email:string;
  fotoPerfil: boolean = false;

  facebook = {
    nome: '',
    fotoUrl: ''
  }

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public firebase: AngularFireAuth,
    public toastCtrl: ToastController) {


      this.email = firebase.auth.currentUser.email;
      
      this.facebook.nome = firebase.auth.currentUser.displayName;
      this.facebook.fotoUrl = firebase.auth.currentUser.photoURL;

      if(this.facebook.fotoUrl == null){
        this.fotoPerfil = false;
      }else{
        this.fotoPerfil = true;
      }

  }

}
