import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';
import { environment } from 'src/environments/environment';
import { Platform } from '@ionic/angular'

@Component({
  selector: 'app-careers-spec',
  templateUrl: './careers-spec.page.html',
  styleUrls: ['./careers-spec.page.scss'],
})
export class CareersSpecPage implements OnInit {


  private id: string;
  private name: string;
  stringy: boolean;
  string: any;
  arrayData: any = [{}];
  length: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HTTP,
    private platform: Platform
  ) { }

  ngOnInit() {
    let id = this.route.queryParams.subscribe(
      (params) => {
        if (params && params.id) {
          this.id = params['id'];
          let tempName = params['indusname'];
          this.name = tempName.split("/")[0] + " Industry";
        }

        // alert(this.id);
      }
    )

    this.platform.ready().then(
      (ready) => {
        this.getCareers();
      }
    )


  }

  getCareers() {
    let body = {}
    this.http.post(environment.getSpecificCareer+"?view="+this.id, body, environment.jsonHeader).then(
      async (data) => {
        // console.log(data);
        if(data.data == 'nocareers'){
          this.stringy = true;
          this.string = data.data;
          this.length=0;
        }else{
          this.stringy=false;
          this.arrayData = await JSON.parse(data.data);
          this.length = this.arrayData.length;
          console.log(data.data)
        }
      },
      (fail) => {
        console.log(fail)
      }
    )
  }

  getCourses(courseId, courseName){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        courseID: courseId,
        coursename: courseName
      }
    };
    
    this.router.navigate(['careers/courses/'], navigationExtras);
  }

}
