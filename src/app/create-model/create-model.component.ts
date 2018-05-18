import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ContextModel} from "../models/models";
import {ModelsService} from "../services/models.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-model',
  templateUrl: './create-model.component.html',
  styleUrls: ['./create-model.component.scss']
})
export class CreateModelComponent implements OnInit {

  modelForm:FormGroup;

  constructor(private fb: FormBuilder, private modelService:ModelsService,private router: Router) { }

  ngOnInit() {
    this.createModelForm();
  }

  createModelForm(){
    this.modelForm = this.fb.group({
      name: ['', Validators.required],
      db_name: ['', Validators.required],
      db_user: ['', Validators.required],
      db_password: ['', Validators.required]
    });
  }

  onSubmit(){
    if(this.modelForm.valid){
      //save model
      let data = this.modelForm.value;
      data.clientId = sessionStorage.getItem("clientId");
      this.modelService.createModel(data).subscribe(model=>{
          console.log(model);
          this.modelService.model = model;
          sessionStorage.setItem("model",JSON.stringify(model));
          this.router.navigate(['/context-modeling']);

      });

    }
  }

  cancelSubmit(){

  }

}
