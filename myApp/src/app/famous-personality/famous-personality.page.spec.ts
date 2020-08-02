import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FamousPersonalityPage } from './famous-personality.page';

describe('FamousPersonalityPage', () => {
  let component: FamousPersonalityPage;
  let fixture: ComponentFixture<FamousPersonalityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamousPersonalityPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FamousPersonalityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
