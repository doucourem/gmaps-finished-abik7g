import { Component, Inject, Renderer2, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

declare const google;
@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  constructor(@Inject(DOCUMENT) private document: Document,
    private renderer2: Renderer2,
  ) {
  }

  ngOnInit() {
    const url = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBAyMH-A99yD5fHQPz7uzqk8glNJYGEqus';

    this.loadScript(url).then(() => {
      this.loadMap()
    });
  }

  private loadMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 0, lng: 0 },
      zoom: 1,
    });
  }


  private loadScript(url) {
    return new Promise((resolve, reject) => {
      const script = this.renderer2.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.text = ``;
      script.onload = resolve;
      script.onerror = reject;
      this.renderer2.appendChild(this.document.head, script);
    })
  }

}



