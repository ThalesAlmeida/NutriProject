import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { DicasPage } from '../dicas/dicas';
import { RegisterPage } from '../register/register';
import { AngularFireAuth } from 'angularfire2/auth';

import firebase from 'firebase';

import {Users} from './users';
import { User } from 'firebase';
import { RecuperarSenhaPage } from '../recuperar-senha/recuperar-senha';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: Users = new Users();

  @ViewChild('usuario') email;
  @ViewChild('senha') password;

  constructor(public navCtrl: NavController, 
    public toastCtrl: ToastController,
    public firebase: AngularFireAuth,) {

  }

  public entrar() {
    let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });
    this.firebase.auth.signInWithEmailAndPassword(this.email.value, this.password.value)
    .then(data => {
      console.log('data do login: ', data);
        this.users.email = this.email.value;
        this.users.senha =  this.password.value;

        this.navCtrl.setRoot(DicasPage)
    })
    .catch((error: any) => {
      if (error.code == 'auth/invalid-email') {
        toast.setMessage('O email é inválido');
      } else if (error.code == 'auth/user-disabled') {
        toast.setMessage('O usuário está desativado');
      } else if (error.code == 'auth/wrong-password') {
        toast.setMessage('A senha está errada, tente novamente');
      }else if(error.code == 'auth/user-not-found'){
        toast.setMessage('Usuário não encontrado');
      }
      toast.present();

    });
  }

  public openPageRegistrar() {
    this.navCtrl.push(RegisterPage)
  }

  public recuperarSenha(){
    this.navCtrl.push(RecuperarSenhaPage)
  }

  public entrarFacebook(){
    this.firebase.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then(res=>{
      //console.log(res)
      this.navCtrl.push(DicasPage)
    })
  }

  public entrarVisitante(){
    let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });

    this.firebase.auth.signInAnonymously()
    .then(data => {
      console.log(data);
      toast.setMessage('Entrou na página');
      this.navCtrl.setRoot(DicasPage);
    })
    .catch((error: any) => {
      if (error.code == 'auth/operation-not-allowed') {
        toast.setMessage('Operação inválida');
      }else{
        console.log('Error', error);
      }
      toast.present();
    });
  }

}
