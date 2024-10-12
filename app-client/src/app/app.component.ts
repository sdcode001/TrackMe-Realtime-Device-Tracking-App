import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfigViewService } from './config-view/config-view.service';
import { ConfigViewComponent } from "./config-view/config-view.component";
import { HeaderComponent } from './header/header.component';
import { MapViewComponent } from './map-view/map-view.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ConfigViewComponent, HeaderComponent, MapViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'TrackMe';

  constructor(private configViewService: ConfigViewService){

  }

  showConfigView = false;

  ngOnInit(){
    if(!this.configViewService.isUserConfigured()){
      this.showConfigView = true
    }
  }

  handelConfigAction(action: boolean) {
    this.showConfigView = action
  }

  onShowConfig(action: boolean) {
    this.showConfigView = action
  }

}
