import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AchieverListPage } from './achiever-list.page';

describe('AchieverListPage', () => {
  let component: AchieverListPage;
  let fixture: ComponentFixture<AchieverListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AchieverListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AchieverListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
