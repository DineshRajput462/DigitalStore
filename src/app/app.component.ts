import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationBarComponent } from "./navigation-bar/navigation-bar.component";
import { FooterSectionComponent } from "./footer-section/footer-section.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationBarComponent, FooterSectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'DigitalStore';
}
