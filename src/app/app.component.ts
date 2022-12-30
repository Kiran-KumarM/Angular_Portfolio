import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'portfolio';
  isToggel: boolean = false;
  skill_index: number = 1;
  qulifiactionIndex: number = 1;
  isDark: boolean = false;
  @Output() IsDarkTheme = new EventEmitter<boolean>();

  ngOnInit() {
    /*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
    const sections = document.querySelectorAll(
      'section[id]'
    ) as NodeListOf<HTMLElement>;

    window.addEventListener('scroll', (event) => {
      const scrollY = window.pageYOffset;
      this.changeScrollHeader(scrollY);
      this.scrollUp(scrollY);
      sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        let sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document
            .querySelector('.nav__menu a[href*=' + sectionId + ']')!
            .classList.add('active-link');
        } else {
          document
            .querySelector('.nav__menu a[href*=' + sectionId + ']')!
            .classList.remove('active-link');
        }
      });
    });
  }

  /*==================== CHANGE BACKGROUND HEADER ====================*/
  changeScrollHeader(scrollY: number) {
    const nav = <HTMLElement>document.getElementById('header');
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if (scrollY >= 80) nav.classList.add('scroll-header');
    else nav.classList.remove('scroll-header');
  }

  /*==================== SHOW SCROLL UP ====================*/
  scrollUp(scrollY: number) {
    const scrollUp = <HTMLElement>document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if (scrollY >= 560) scrollUp.classList.add('show-scroll');
    else scrollUp.classList.remove('show-scroll');
  }

  navToggle() {
    this.isToggel = !this.isToggel;
  }
  toggelTheme() {
    this.isDark = !this.isDark;
    if (this.isDark) document.body.classList.add('dark-theme');
    else document.body.classList.remove('dark-theme');
  }
  onSkillClick(index: number) {
    this.skill_index = index;
  }
  setQulificationIndex(index: number) {
    this.qulifiactionIndex = index;
  }
}
