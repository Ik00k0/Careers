import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CareersSpecPage } from './careers-spec.page';

describe('CareersSpecPage', () => {
  let component: CareersSpecPage;
  let fixture: ComponentFixture<CareersSpecPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareersSpecPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CareersSpecPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
