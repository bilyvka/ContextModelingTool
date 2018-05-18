import { Component, OnInit } from '@angular/core';
import {ModelsService} from "../services/models.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.scss']
})
export class ModelListComponent implements OnInit {

  private context_models=[];


  constructor(private modelService:ModelsService,private router: Router) { }

  ngOnInit() {
    let data = {"clientId":sessionStorage.getItem("clientId")};
    this.modelService.getModels(data).subscribe(result=>{
      console.log(result);
      this.context_models = result;

      for(let i=0;i<this.context_models.length;i++){

        this.modelService.countData(this.context_models[i]).subscribe(result=>{
          this.context_models[i].totalData = result.count;
        })
      }
    })
  }

  openModeling(modelId){
    this.modelService.model = this.context_models.find(function(model){return model._id===modelId;});
    sessionStorage.setItem("model",JSON.stringify( this.modelService.model));
    this.router.navigate(['/context-modeling']);
  }

  deleteModel(modelId){
    let data = {"modelId":modelId};
    this.modelService.deleteModel(data).subscribe(result=>{
       let index = this.context_models.findIndex(function(item){
         return item._id===modelId;
       });
       console.log(index);
       this.context_models.splice(index,1);
    });
  }

  viewModel(modelId){
    this.modelService.model = this.context_models.find(function(model){return model._id===modelId;});
    sessionStorage.setItem("model",JSON.stringify( this.modelService.model));
    this.router.navigate(['/model-view']);
  }


}
