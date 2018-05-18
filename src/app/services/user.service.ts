import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {catchError} from "rxjs/operators";
/**
 * Created by asoadmin on 2018-05-15.
 */
@Injectable()
export class UserService {
  private http;
  private serverUrl ="http://localhost:3001";


  private httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'

  })};

  constructor(_http: HttpClient) {
    this.http = _http;
  }



  getUser(data):Observable<User>{
    return this.http.post(this.serverUrl+"/getUser", data, this.httpOptions)
  }

  addUser(data):Observable<User>{
    return this.http.post(this.serverUrl + "/addUser", data, this.httpOptions)

  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return new Error(
      'Something bad happened; please try again later.');
  };
}

export interface User{
  _id?:string;
  name?:string;
  email:string;
  password:string;
  clientId?:string;

}
