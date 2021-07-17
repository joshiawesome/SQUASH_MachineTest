import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators, FormGroupDirective, NgForm,} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'RegistrationForm';

  countries=new FormControl();
  country_list: string[]=['India','USA','Australia','England'];

  states=new FormControl();
  state_list: string[]=['Tamil Nadu','Uttar Pradesh','Karnataka','Kerela'];

  gender_list: string[]=['male','female','other'];

  firstFormGroup;
  secondFormGroup;
  matcher = new MyErrorStateMatcher();
  
  isLinear=true;
  isEditable = false;

  url="./assets/upload_logo.png"

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {

    //validation for the first step
    this.firstFormGroup = this._formBuilder.group({
      name_validation: ['', Validators.required],
      country_validation: ['', Validators.required],
      state_validation: ['', Validators.required],
      gender_validation:['',Validators.required],
      phone_validation: new FormControl(undefined,[Validators.required])
    });

    //validation for the second step
    this.secondFormGroup = this._formBuilder.group({
      companyname_validation: ['', Validators.required],
      email_validation: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      jobtitle_validation: ['', Validators.required],
      experience_validation: ['', Validators.required],
      agreement_validation: ['', Validators.required],
    });

  }

  selectfile(event){

    if(event.target.files){
      var reader=new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(e:any)=>{
        this.url=e.target.result;
      }

    }

  }

}
