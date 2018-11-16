import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import { HomePage } from '../home/home';
/**
 * Generated class for the DicasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dicas',
  templateUrl: 'dicas.html',
})
export class DicasPage {
  email:string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public firebase: AngularFireAuth,
    public toastCtrl: ToastController,) {
      this.email = firebase.auth.currentUser.email;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DicasPage');
  }

  sair(){
    let toast = this.toastCtrl.create({duration:3000, position:'bottom'});
    this.firebase.auth.signOut();
    toast.setMessage('Usuário deslogado');
    toast.present();
    this.navCtrl.setRoot(HomePage);
  }

}
