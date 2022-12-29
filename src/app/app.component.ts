import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'portfolio';
  isToggel: boolean = false;
  skill_index: number = 1;
  qulifiactionIndex: number = 1;

  navToggle() {
    this.isToggel = !this.isToggel;
  }
  onSkillClick(index: number) {
    this.skill_index = index;
  }
  setQulificationIndex(index: number) {
    this.qulifiactionIndex = index;
  }
}
