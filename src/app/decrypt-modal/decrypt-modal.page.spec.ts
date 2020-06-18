import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DecryptModalPage } from './decrypt-modal.page';

describe('DecryptModalPage', () => {
  let component: DecryptModalPage;
  let fixture: ComponentFixture<DecryptModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecryptModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DecryptModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
