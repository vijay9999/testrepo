import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserModel } from '../interfaces/user-model';
import { LoginService } from '../services/login.service';
import { AlertSrevice, AlertType } from '../services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  registrationForm: FormGroup;
  registrationModel: UserModel;
  formData: FormData;
  constructor(private loginService: LoginService, private alertService: AlertSrevice, private router: Router) { }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, Validators.required),
      gender: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      dob: new FormControl(null, Validators.required),
      careTakerName: new FormControl(null, Validators.required),
      mobileNumber: new FormControl(null, [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
      whatsappNumber: new FormControl(null, [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
      address: new FormControl(null, Validators.required),
      wardNumber: new FormControl(null, Validators.required),
      qualification: new FormControl(null, Validators.required),
      occupation: new FormControl(null, Validators.required),
      businessCategory: new FormControl(null, Validators.required),
      businessSubCategory: new FormControl(null, Validators.required),
      bloodGroup: new FormControl(null, Validators.required),
      bloodDonation: new FormControl(null, Validators.required),
      socialServices: new FormControl(null, Validators.required),
      aadharNumber: new FormControl(null, Validators.required),
      panNumber: new FormControl(null),
      userImage: new FormControl(null, Validators.required),
      idProof: new FormControl(null, Validators.required),
      addressProof: new FormControl(null, Validators.required)
    });
    this.setDefaultSelectedValue();
    // this.seedData();
    this.formData = new FormData();
  }

  seedData() {
    this.registrationForm.get('firstName').setValue('Manish');
    this.registrationForm.get('lastName').setValue('Prasad');
    this.registrationForm.get('email').setValue('manish.prasad@gmail.com');
    // const dob = new Date(new Date().setFullYear(new Date().getFullYear())).toISOString();
  //  this.registrationForm.get('dob').setValue();
    this.registrationForm.get('careTakerName').setValue('Manish');
    this.registrationForm.get('mobileNumber').setValue(7840058008);
    this.registrationForm.get('whatsappNumber').setValue(7840058008);
    this.registrationForm.get('address').setValue('Gurgaon');
    this.registrationForm.get('aadharNumber').setValue('1234567');
    this.registrationForm.get('panNumber').setValue('123456');
    this.registrationForm.get('wardNumber').setValue('12');
  }

  setDefaultSelectedValue(){
    this.registrationForm.get('gender').setValue('M');
    this.registrationForm.get('qualification').setValue('HS');
    this.registrationForm.get('occupation').setValue('BS');
    this.registrationForm.get('businessCategory').setValue('TBD');
    this.registrationForm.get('businessSubCategory').setValue('TBD');
    this.registrationForm.get('bloodGroup').setValue('AB+');
    this.registrationForm.get('bloodDonation').setValue('YES');
    this.registrationForm.get('socialServices').setValue('YES');
  }
  loadImageFromDevice(event) {

    const files = event.target.files;

    const fileToUpload = files[0] as File;

    if (event.target.id === 'userImageInput') {
      this.formData.append('userImage', fileToUpload, fileToUpload.name);
    }
    else if (event.target.id === 'idProofInput') {
      this.formData.append('idProof', fileToUpload, fileToUpload.name);
    }
    else if (event.target.id === 'addressProofInput') {
      this.formData.append('addressProof', fileToUpload, fileToUpload.name);
    }

    // const reader = new FileReader();

    // reader.readAsArrayBuffer(file);

    // reader.onload = () => {

    //   // get the blob of the image:
    //   const blob: Blob = new Blob([new Uint8Array((reader.result as ArrayBuffer))]);

    //   // create blobURL, such that we could use it in an image element:
    //   const blobURL: string = URL.createObjectURL(blob);

    // };

    // reader.onerror = (error) => {

    //   // handle errors

    // };
  }

  registerUser() {
    if (this.registrationForm.valid) {
      this.registrationModel = { ...this.registrationModel, ...this.registrationForm.value };
      if (this.registrationModel) {
        // tslint:disable-next-line: forin
        for (const key in this.registrationModel) {
          if (!(key === 'userImage' || key === 'idProof' || key === 'addressProof')) {
            this.formData.set(key, this.registrationModel[key] === null ? 0 : this.registrationModel[key]);
          }
        }
      }
      this.loginService.registerUser(this.formData).then(data => {
        this.alertService.presentAlert('Registered Successfully!!', AlertType.sucess);
        if (this.router.routerState.snapshot.url === '/menu/registration'){
          this.router.navigate(['/menu/admin-user']);
        } else {
        this.router.navigate(['/home']);
        }
      }
      ).catch(data => {
        console.log(data);
      });
    } else {
      this.alertService.presentAlert('Please enter mandatory details !!', AlertType.error);
    }
  }
}
