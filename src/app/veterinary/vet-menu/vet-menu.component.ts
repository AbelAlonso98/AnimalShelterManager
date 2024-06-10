import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vet-menu',
  templateUrl: './vet-menu.component.html',
  styleUrls: ['./vet-menu.component.css']
})
export class VetMenuComponent {
  isMenu = false

  constructor(router: Router) {
    if (router.url != 'veterinary')
      this.isMenu = true
  }

}
