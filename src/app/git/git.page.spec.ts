import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GitPage } from './git.page';

describe('GitPage', () => {
  let component: GitPage;
  let fixture: ComponentFixture<GitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
