import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  get history() {
    return this.gifsService.history;
  }

  constructor(private gifsService: GifsService) { }


  getGifBySidebar(query: string): void {
    this.gifsService.getImages(query);
  }

}
