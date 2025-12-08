import { Component } from '@angular/core';
import { AdminRoutingModule } from "../../admin/admin-routing-module";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrls: ['./footer.css'],
  imports: [AdminRoutingModule]
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
}