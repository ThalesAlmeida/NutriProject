import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { DicasPage } from '../dicas/dicas';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  @ViewChild('usuario') email;
  @ViewChild('senha') password;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public firebase: AngularFireAuth,
    public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  registrar() {
    let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });
    this.firebase.auth.createUserWithEmailAndPassword(this.email.value, this.password.value)
      .then(data => {
        console.log('Aqui temos a data: ', data);
        toast.setMessage('Usuário criado com sucesso');
        toast.present();
        this.navCtrl.setRoot(DicasPage);
      })
      .catch((error: any) => {
        if (error.code == 'auth/email-already-in-use') {
          toast.setMessage('O email ja está em uso');
        } else if (error.code == 'auth/invalid-email') {
          toast.setMessage('O email é inválido');
        } else if (error.code == 'auth/operation-not-allowed') {
          toast.setMessage('Operação inválida');
        }
        toast.present();

      });
    }
  }

