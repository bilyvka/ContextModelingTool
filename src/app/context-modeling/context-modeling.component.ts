import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ContextModel} from "../models/models";
import {ModelsService} from "../services/models.service";
import {isUndefined} from "util";


@Component({
  selector: 'app-context-modeling',
  templateUrl: './context-modeling.component.html',
  styleUrls: ['./context-modeling.component.scss']
})
export class ContextModelingComponent implements OnInit {

  dimensionsForm:FormGroup;
  contextModel:ContextModel;
  response;

  dataTypes =[
    {value:"number",text:"Numerical"},
    {value:"boolean",text:"Boolean"},
    {value:"string",text:"Text"},
    {value:"categorical",text:"Categorical"}

  ];

  dataStructures=[
    {value:"single",text:"Single value"},
    {value:"array",text:"Array of values"}
  ];

  constructor(private fb: FormBuilder, private modelService:ModelsService) { }

  ngOnInit() {
    this.contextModel = this.modelService.model;
    if(!this.contextModel){
      this.contextModel = JSON.parse(sessionStorage.getItem("model"));
    }
    this.createModelForm();
  }


  createModelForm() {
    this.dimensionsForm = this.fb.group({
             name:  ['', Validators.required ],
             data_structure:['',Validators.required],
             data_type:['', Validators.required ],
             isMetadata:[''],
             categorical_values:[''],
             weight:['']
         })


  }

  onSubmit(){
    if(this.dimensionsForm.valid){
      //submit data
    }
  }

  addDimension(){
     if(this.dimensionsForm.valid){

       let isArray = this.dimensionsForm.get('data_structure').value==='array'? true:false;
       let isCategorical = this.dimensionsForm.get('data_type').value==='categorical'?true:false;
       let categorical_values= this.dimensionsForm.get('categorical_values').value !=null?this.dimensionsForm.get('categorical_values').value.split(','):[];
       let dimension = {"field_name":this.dimensionsForm.get('name').value,
                        "isArray":isArray,
                        "isCategorical":isCategorical,
                        "type":this.dimensionsForm.get('data_type').value,
                        "isStatic":this.dimensionsForm.get('isMetadata').value !=null? true:false,
                        "categorical_values":categorical_values,
                        "weight":this.dimensionsForm.get('weight').value
       };

       console.log(dimension);
       console.log(this.contextModel);
       this.contextModel.data_description.push(dimension);
       this.dimensionsForm.reset();
     }
  }

  saveModel(){
       let data = this.contextModel;
       this.modelService.updateModel(data).subscribe(result=>{
         console.log(result);
         this.contextModel = result;
         sessionStorage.setItem('model',JSON.stringify(this.contextModel));
         this.response = "Data has been saved successfully!";
       })
  }

  deleteDimension(name){
    let index = this.contextModel.data_description.findIndex(function (item) {
      return item["field_name"]===name;
    });
    this.contextModel.data_description.splice(index,1);
  }

}
