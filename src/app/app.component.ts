import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare let Email: any;

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
  contactForm!: FormGroup;
  snackBar!: any;
  constructor() {}

  ngOnInit() {
    this.contactForm = new FormGroup({
      name: new FormControl(''),
      subject: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl(''),
    });
    // set theme based on session
    let currentTheme = localStorage.getItem('isDarkTheme');
    console.log(currentTheme);
    if (currentTheme == null) {
      localStorage.setItem('isDarkTheme', 'false');
      this.isDark = false;
    } else {
      this.isDark = currentTheme === 'false' ? false : true;
      this.updateThemeClasses();
    }
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
    localStorage.setItem('isDarkTheme', String(this.isDark));
    this.updateThemeClasses();
  }
  updateThemeClasses() {
    if (this.isDark) document.body.classList.add('dark-theme');
    else document.body.classList.remove('dark-theme');
  }
  onSkillClick(index: number) {
    this.skill_index = index;
  }
  setQulificationIndex(index: number) {
    this.qulifiactionIndex = index;
  }
  onSubmit() {
    console.log(this.contactForm.value);
    //   return;
    Email.send({
      SecureToken: '95a22a56-773a-43d4-87c7-6c84e75ff2b0',
      To: 'mkkumar7714@gmail.com',
      From: 'mkkumar7714@gmail.com',
      Subject: this.contactForm.value.subject,
      Body:
        '<p><b>Name :</b> ' +
        this.contactForm.value.name +
        '</p><p><b>From Email :</b> ' +
        this.contactForm.value.email +
        ' </p><p><b>Message :</b> ' +
        this.contactForm.value.message +
        '  </p>',
    }).then((message: any) => {
      if (message.includes('OK')) {
        this.contactForm.reset();
        this.toaster('Message Sent', 'success');
      } else {
        this.toaster('Something Went Wrong', 'error');
      }
    });
  }

  toaster(message: string, type: string) {
    this.snackBar = { message: message, type: type };
    // setTimeout(() => {
    //   this.snackBar = { message: '', type: '' };
    // }, 4000);
  }
}
