import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MatrimonyPage } from './matrimony.page';

describe('MatrimonyPage', () => {
  let component: MatrimonyPage;
  let fixture: ComponentFixture<MatrimonyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrimonyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MatrimonyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
