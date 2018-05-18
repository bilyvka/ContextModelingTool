import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {ContextModel} from "../models/models";
/**
 * Created by asoadmin on 2018-05-15.
 */


@Injectable()
export class ModelsService {
  private http;
  private serverUrl = "http://localhost:3001";
  private serverUrl2 = "http://localhost:3002";

  public model: ContextModel;


  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'

    })};

  constructor(_http: HttpClient) {
    this.http = _http;
  }

  getModels(data):Observable<ContextModel[]>{
    return this.http.post(this.serverUrl+"/models", data, this.httpOptions)
  }

  createModel(data):Observable<ContextModel>{
    return this.http.post(this.serverUrl+"/model", data, this.httpOptions)
  }

  deleteModel(data):Observable<any>{
    return this.http.post(this.serverUrl+"/delete-model", data, this.httpOptions)
  }

  updateModel(data):Observable<ContextModel>{
    return this.http.post(this.serverUrl+"/update-model", data, this.httpOptions)
  }

  countData(data):Observable<any>{
    return this.http.post(this.serverUrl2+"/get-data-amount", data, this.httpOptions)
  }

  sendTestData(data):Observable<any>{
    return this.http.post(this.serverUrl2+"/data", data, this.httpOptions)
  }
}

export interface Model{
  name?:string;
  _id?:string;
  timestamp:string;
  clientId:string;

}
