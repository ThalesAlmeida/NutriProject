import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { DicasPage } from '../dicas/dicas';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('usuario') email;
  @ViewChild('senha') password;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController) {

  }

  public entrar() {
    let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });
    if (this.email.value == 'thales' && this.password.value == '123') {
      this.navCtrl.push(DicasPage);
      toast.setMessage("Usuário autenticado")
      toast.present();
    } else {
      toast.setMessage('Não autenticado')
      toast.present();
    }
  }

  public openPageRegistrar() {
    this.navCtrl.push(RegisterPage)
  }

}
