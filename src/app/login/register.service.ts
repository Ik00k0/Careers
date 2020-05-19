import { Injectable } from '@angular/core';
import {registerModel} from './registerModel'

@Injectable({
  providedIn: 'root'
})
export class RegisterService {


  private regModel: registerModel;

  constructor() { }


  setRegModel(param: registerModel){
    this.regModel = param;
  }

  getRegModel(){
    return this.regModel;
  }

  setDigInfo(email:String, password:String){
    this.regModel.uemail = email;
    this.regModel.upass = password;
  }
}
