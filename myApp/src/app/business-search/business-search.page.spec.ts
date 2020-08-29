import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusinessSearchPage } from './business-search.page';

describe('BusinessSearchPage', () => {
  let component: BusinessSearchPage;
  let fixture: ComponentFixture<BusinessSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessSearchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
