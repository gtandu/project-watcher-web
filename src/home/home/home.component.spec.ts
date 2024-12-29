import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { BehaviorSubject, Observable, skip, Subject } from 'rxjs';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { bleachManga, bleachOneShotReadingManga, bleachReadingManga, bleachReadingMangaSaved } from '../../utils/tests/mock-data';
import { MatSidenav } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReadingMangasService } from '../../services/reading-mangas.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import Keycloak from 'keycloak-js';

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
let readingMangasServiceSpy: Spy<ReadingMangasService>;
let matSnackbar: Spy<MatSnackBar>;

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MatMenuModule, MatSidenav],
      providers: [
        { provide: BreakpointObserver, useClass: MockBreakpointObserver },
        {
          provide: Keycloak,
          useValue: createSpyFromClass(Keycloak, {
            methodsToSpyOn: ['logout']
          })
        },
        {
          provide: ReadingMangasService,
          useValue: createSpyFromClass(ReadingMangasService, {
            observablePropsToSpyOn: ['readingMangasRefreshSubject']
          })
        },
        { provide: MatSnackBar, useValue: createSpyFromClass(MatSnackBar) }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    breakpointObserver = TestBed.inject<any>(BreakpointObserver);
    readingMangasServiceSpy = TestBed.inject<any>(ReadingMangasService);
    matSnackbar = TestBed.inject<any>(MatSnackBar);

    readingMangasServiceSpy.getAllReadingMangasByUserId.and.nextWith({ content: [{ ...bleachReadingManga }, { ...bleachOneShotReadingManga }] });

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

  describe('onSearchResultMangas', () => {
    it('should set searchResultMangas property when method is called', () => {
      // GIVEN
      const searchResultMangas = [bleachManga];

      // WHEN
      component.onSearchResultMangas(searchResultMangas);

      // THEN
      expect(component.searchResultMangas).toBe(searchResultMangas);
    });
  });

  describe('saveManga', () => {
    it('should refresh mangas list, close sidenav and reset selected manga when manga was create from method createManga in MangasService', fakeAsync(() => {
      // GIVEN

      let sidenavSpy = createSpyFromClass(MatSidenav);
      component.sidenav = sidenavSpy;
      readingMangasServiceSpy.addMediaToReadingList.calledWith(bleachReadingManga).nextWith(bleachReadingMangaSaved);
      readingMangasServiceSpy.readingMangasRefreshSubject = createSpyFromClass<any>(Subject);

      // WHEN
      component.saveManga(bleachManga);
      tick();

      // THEN
      expect(readingMangasServiceSpy.addMediaToReadingList).toHaveBeenCalledWith(bleachReadingManga);
      expect(readingMangasServiceSpy.readingMangasRefreshSubject.next).toHaveBeenCalled();
      expect(sidenavSpy.close).toHaveBeenCalled();
      expect(component.selectedManga).toBeUndefined();
      expect(matSnackbar.open).toHaveBeenCalledWith('Manga added', 'Close', jasmine.objectContaining({ duration: 2000 }));
    }));
  });

  describe('onClosedSidenav', () => {
    it('should close sidenav and reset selectedManga and searchResultMangas', () => {
      // GIVEN
      let sidenavSpy = createSpyFromClass(MatSidenav);
      component.sidenav = sidenavSpy;

      // WHEN
      component.onClosedSidenav();

      // THEN
      expect(sidenavSpy.close).toHaveBeenCalled();
      expect(component.selectedManga).toBeUndefined();
      expect(component.searchResultMangas).toEqual([]);
    });
  });

  describe('logout', () => {
    it('should call logout method from KeycloakService', () => {
      // GIVEN
      const keycloakServiceSpy: Spy<Keycloak> = TestBed.inject<any>(Keycloak);

      // WHEN
      component.logout();

      // THEN
      expect(keycloakServiceSpy.logout).toHaveBeenCalled();
    });
  });
});
