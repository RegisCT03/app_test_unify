import { Component } from '@angular/core';
import { AdminRoutingModule } from "../../admin/admin-routing-module";

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.html',
  styleUrls: ['./hero-section.css'],
  imports: [AdminRoutingModule]
})
export class HeroSectionComponent {
}