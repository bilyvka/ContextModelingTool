import { Component, OnInit } from '@angular/core';
import {ContextModel} from "../models/models";
import {ModelsService} from "../services/models.service";

@Component({
  selector: 'app-model-view',
  templateUrl: './model-view.component.html',
  styleUrls: ['./model-view.component.scss']
})
export class ModelViewComponent implements OnInit {

  contextModel:ContextModel;
  clientConfig:String;

  constructor(private modelService:ModelsService) { }

  ngOnInit() {
    this.contextModel = this.modelService.model;
    if(!this.contextModel){
      this.contextModel = JSON.parse(sessionStorage.getItem("model"));
    }

    let data ={
      clientId:this.contextModel.clientId,
      modelId:this.contextModel._id,
      data:[],
      isExample:true
    };
    this.clientConfig = JSON.stringify(data, null, 2);


  }

  sendTest(){
    let data = {clientId:"9619b309-eddc-484e-991c-07c01e49475d",
                 modelId:"5afd321b7a36ae9200cf2563",
                 data:[{User:"Alisa",Age:28,Gender:"Female",Hobbies:["Swimming,Running"]}],
                 isExample:true};

    this.modelService.sendTestData(data).subscribe(result=>{
        console.log(result);
    });
  }

}
