import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { LIST_PAGE_MENU } from 'src/app/TOOLS/INITIALISATION/initVar';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  
  selectedPath = '';
  pages = LIST_PAGE_MENU;

  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });
   }

  ngOnInit() {
  }

}
