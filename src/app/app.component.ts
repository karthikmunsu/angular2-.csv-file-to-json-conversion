import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { csv } from 'd3-request';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  csvDatas = new Array();

  constructor(private http: Http) {

  }

  ngOnInit() {

  	//its our own logic to extract data from the .csv file
  	this.http.get('../assets/test.csv').map((res) => res).subscribe(
  		(res) => {
  			// console.log(res);
  			let data = (res["_body"]).split('\n');
  			// console.log(data);
  			let heading = data[0].split(',');
  			for(let i = 1; i < data.length-1; i++) {
  				let arr: any = {};
  				let tmp = data[i].split(',');
  				// console.log(tmp);
  				for(let j = 0; j < tmp.length; j++) {
  					arr[heading[j].replace(/ /g, "")] = tmp[j]; //if you have spaces on the heading kindly replace it.
  				}
  				this.csvDatas.push(arr);
  				console.log(arr);
  			}
  			console.log(this.csvDatas);
  		}, (err) => {
  			console.log(err);
  		})//converting the .csv data to json via logic


  	//using third-party plugins in mncs they wont allow this
    csv('assets/test.csv', function(err, data) {
  		if(err) throw err;
  		console.log(data);
  	})// using d3-request to converting the .csv to json.

  }

}
