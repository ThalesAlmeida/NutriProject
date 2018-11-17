import { Component , ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the RecuperarSenhaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recuperar-senha',
  templateUrl: 'recuperar-senha.html',
})
export class RecuperarSenhaPage {
  @ViewChild('email') emailDigitado;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public toasCtrl: ToastController,
    public firebase: AngularFireAuth) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecuperarSenhaPage');
  }

  public recuperarSenha(){
    let toast = this.toasCtrl.create({duration:3000, position:'bottom'});

    this.firebase.auth.sendPasswordResetEmail(this.emailDigitado.value)
    .then(()=>{
        toast.setMessage('Solicitação de recuperação de senha foi enviada para o seu email');
        toast.present();
        this.navCtrl.pop();
    })
    .catch((error: any) => {
      if (error.code == 'auth/invalid-email') {
        toast.setMessage('Email inválido');
      }else if(error.code == 'auth/user-not-found'){
        toast.setMessage('Usuário não encontrado');
      }
      toast.present();
    });
  }

}
