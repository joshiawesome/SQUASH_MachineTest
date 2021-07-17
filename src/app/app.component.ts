import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatStepper } from '@angular/material/stepper';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
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
  styleUrls: ['./app.component.css'],
  providers:[{
    provide:STEPPER_GLOBAL_OPTIONS, useValue: {showError:true}
  }]
})
export class AppComponent implements OnInit{
  title = 'RegistrationForm';

  countries=new FormControl();
  country_list: string[]=['India','USA','Australia','England'];

  states=new FormControl();
  state_list: string[]=['Tamil Nadu','Uttar Pradesh','Karnataka','Kerela'];

  gender_list: string[]=['male','female','other'];

  firstFormGroup : FormGroup;
  secondFormGroup : FormGroup;
  matcher = new MyErrorStateMatcher();
  
  isLinear=true;
  isEditable = false;

  url="./assets/upload_logo.png";

  full_name;
  gender;
  country;
  state;
  phone_number;
  company_name;
  email_id;
  job_title;
  experience;
  OTP;

  form_data=[
    {"Full Name":"null",
    "Gender":"null",
    "Country":"null",
    "State":"null",
    "Phone Number":"null",
    "Company Logo":"null",
    "Company Name":"null",
    "Email id":"null",
    "Job Title":"null",
    "Years of Experience":"null",
    "OTP":"null"},
  ];

  constructor(private _formBuilder: FormBuilder,@Inject(DOCUMENT) private document:Document) {}

  ngOnInit() {

    //validation for the first step
    this.firstFormGroup = this._formBuilder.group({
      name_validation: ['', Validators.required],
      country_validation: ['', Validators.required],
      state_validation: ['', Validators.required],
      gender_validation:['',Validators.required],
      phone_validation: [undefined,[Validators.required]]
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

  goBack(stepper: MatStepper){
    stepper.previous();
  }

  selectfile(event){

    if(event.target.files){
      var reader=new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(e:any)=>{
        this.url=e.target.result;
        this.form_data[0]["Company Logo"]=this.url;
      }

    }

  }

  userSelect(id,val){
    console.log(id,val);
    if(id=="gender"){
      this.form_data[0]["Gender"]=val;
    }
    if(id=="country"){
      this.form_data[0]["Country"]=val;
    }
    if(id=="state"){
      this.form_data[0]["State"]=val;
    }
    if(id=="OTP"){
      this.OTP=val;
      this.form_data[0]["OTP"]=val;
      if(this.OTP.length==5){
        this.document.getElementById("redirect_button").style.opacity="1";
      }
    }
  }

  redirect():void{

    this.phone_number=this.firstFormGroup.controls['phone_validation'].value;
    // console.log(this.phone_number);
  
    this.form_data[0]["Phone Number"]=this.phone_number;
    this.form_data[0]["Full Name"]=this.full_name;
    this.form_data[0]["Company Name"]=this.company_name;
    this.form_data[0]["Email id"]=this.email_id;
    this.form_data[0]["Job Title"]=this.job_title;
    this.form_data[0]["Years of Experience"]=this.experience;

    // console.log(this.form_data);

    localStorage.setItem('FormData',JSON.stringify(this.form_data));

    this.document.location.href='https://squashapps.com/';
  }

}
