import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { BehaviorSubject, Observable, skip, Subject } from 'rxjs';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { MangasService } from '../../services/mangas.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { bleachManga, bleachMangaSaved } from '../../utils/tests/mock-data';
import { MatSidenav } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KeycloakService } from 'keycloak-angular';

class MockBreakpointObserver {
  private state: BehaviorSubject<BreakpointState> = new BehaviorSubject({} as BreakpointState);

  resize(breakPoint: string) {
    if (breakPoint === Breakpoints.TabletPortrait) {
      this.state.next({ matches: true, breakpoints: { [Breakpoints.TabletPortrait]: true } });
    } else if (breakPoint === Breakpoints.TabletLandscape) {
      this.state.next({ matches: true, breakpoints: { [Breakpoints.TabletLandscape]: true } });
    } else if (breakPoint === Breakpoints.HandsetPortrait) {
      this.state.next({ matches: true, breakpoints: { [Breakpoints.HandsetPortrait]: true } });
    } else if (breakPoint === Breakpoints.HandsetLandscape) {
      this.state.next({ matches: true, breakpoints: { [Breakpoints.HandsetLandscape]: true } });
    } else {
      this.state.next({ matches: false, breakpoints: {} });
    }
  }

  observe(breakPoint: string): Observable<BreakpointState> {
    return this.state.asObservable().pipe(skip(1));
  }
}

let breakpointObserver: MockBreakpointObserver;
let mangasServiceSpy: Spy<MangasService>;

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, MatSidenav],
      imports: [BrowserAnimationsModule],
      providers: [
        { provide: BreakpointObserver, useClass: MockBreakpointObserver },
        { provide: KeycloakService },
        {
          provide: MangasService,
          useValue: createSpyFromClass(MangasService, {
            observablePropsToSpyOn: ['mangaRefreshSubject']
          })
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    breakpointObserver = TestBed.inject<any>(BreakpointObserver);
    mangasServiceSpy = TestBed.inject<any>(MangasService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('property isMobile should be true when screen match TabletPortrait', fakeAsync(() => {
      testBreakpointsToBeTrueOnResize(Breakpoints.TabletPortrait);
    }));

    it('property isMobile should be true when screen match TabletLandscape', fakeAsync(() => {
      testBreakpointsToBeTrueOnResize(Breakpoints.TabletLandscape);
    }));

    it('property isMobile should be true when screen match HandsetPortrait', fakeAsync(() => {
      testBreakpointsToBeTrueOnResize(Breakpoints.HandsetPortrait);
    }));

    it('property isMobile should be true when screen match HandsetLandscape', fakeAsync(() => {
      testBreakpointsToBeTrueOnResize(Breakpoints.HandsetLandscape);
    }));

    it('property isMobile should be false when screen match Web', fakeAsync(() => {
      // GIVEN

      // WHEN
      breakpointObserver.resize(Breakpoints.Web);
      tick();

      // THEN
      expect(component.isMobile).toBeFalse();
    }));
  });

  function testBreakpointsToBeTrueOnResize(breakpoints: string) {
    // GIVEN

    // WHEN
    breakpointObserver.resize(breakpoints);
    tick();

    // THEN
    expect(component.isMobile).toBeTrue();
  }

  describe('onSelectedManga', () => {
    it('should set component property when method is called', () => {
      // GIVEN

      // WHEN
      component.onSelectedManga(bleachManga);

      // THEN
      expect(component.selectedManga).toBe(bleachManga);
    });
  });

  describe('saveManga', () => {
    it('should refresh mangas list, close sidevav and reset selected manga when manga was create from method createManga in MangasService', fakeAsync(() => {
      // GIVEN

      let sidenavSpy = createSpyFromClass(MatSidenav);
      component.sidenav = sidenavSpy;
      mangasServiceSpy.createManga.calledWith(bleachManga).nextWith(bleachMangaSaved);
      mangasServiceSpy.mangaRefreshSubject = createSpyFromClass<any>(Subject);

      // WHEN
      component.saveManga(bleachManga);
      tick();

      // THEN
      expect(mangasServiceSpy.createManga).toHaveBeenCalledWith(bleachManga);
      expect(mangasServiceSpy.mangaRefreshSubject.next).toHaveBeenCalled();
      expect(sidenavSpy.close).toHaveBeenCalled();
      expect(component.selectedManga).toBeUndefined();
    }));
  });
});
