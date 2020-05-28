import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit {


  private courseId;
  private courseName;
  private courseData;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HTTP,
    private platform: Platform,

  ) { }

  ngOnInit() {
    let id = this.route.queryParams.subscribe(
      (params) => {
        if (params && params.courseID) {
          this.courseId = params['courseID'];
          let tempName = params['coursename'];
          this.courseName = tempName;
        }

        // alert(this.id);
      })

      this.platform.ready().then(
        (ready)=>{
          this.getCourses()
        }
      )
  }

  getCourses(){
    this.http.post(environment.getSpecificCourseUrl, {oneCar:this.courseId}, environment.jsonHeader).then(
      (data)=>{
        console.log(JSON.parse(data.data))
        this.courseData = JSON.parse(data.data);
      },
      (fail)=>{
        console.log(fail)
      }
    )
  }

}

