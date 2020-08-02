import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CharityPage } from './charity.page';

describe('CharityPage', () => {
  let component: CharityPage;
  let fixture: ComponentFixture<CharityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharityPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CharityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
