import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { RegisterService } from '../register.service';
import { registerModel } from '../registerModel'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})


export class RegisterPage implements OnInit {

  private disabled: Boolean = true;
  private regForm: FormGroup;
  private gender: String;
  private possibleGenders = [{ name: "Male", gender: 'male' }, { name: "Female", gender: 'female' }];
  private regData: registerModel;


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _registerService: RegisterService
  ) {
   
  }

  ngOnInit() {
    this.regForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      gender: ['', [Validators.required]]

    })
  }

  sliderConfig = {
    slidesPerView: 1.6,
    spaceBetween: 10,
    centeredSlides: true,
    pagination: false,
    allowTouchMove: false
  };


  // lockSlider(){
  //   this.slides.lockSwipes(true);
  // }

  next() {
    this.regData = { ufname: this.regForm.controls.firstname.value, ulname: this.regForm.controls.lastname.value, uemail: "", ugender: this.regForm.controls.gender.value, upass: "" }
    this._registerService.setRegModel(this.regData);
    this.router.navigateByUrl('login/register2')
  }

  reset() {
    console.log("type of value: ", typeof (this.regForm.get('gender').value))
    console.log(JSON.stringify(this.regForm.value))
  }
}
