import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})


export class RegisterPage implements OnInit {

  private disabled: Boolean=true;
  private regForm: FormGroup;
  private gender: String;
  private possibleGenders = [{name:"Male", gender: 'male'}, {name:"Female", gender: 'female'}];

  
  constructor(
    private router: Router,
    private fb: FormBuilder
    ) { 
      this.regForm = this.fb.group({
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
        gender: ['', [Validators.required]]

      })
    }

  ngOnInit() {
  }

  sliderConfig = {
    slidesPerView: 1.6,
    spaceBetween: 10,
    centeredSlides: true,
    pagination: false,
    allowTouchMove:false
  };


  // lockSlider(){
  //   this.slides.lockSwipes(true);
  // }

  next(){
    this.router.navigateByUrl('login/register2')
  }

  reset() {
    console.log("type of value: ", typeof(this.regForm.get('gender').value))
    console.log(JSON.stringify(this.regForm.value))
  }
}
