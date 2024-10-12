import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConfigViewService } from './config-view.service';
import { Config } from './config-view.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-config-view',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './config-view.component.html',
  styleUrl: './config-view.component.css'
})
export class ConfigViewComponent implements OnInit {
  @Output() submit_or_cancel = new EventEmitter<boolean>();

  email?: string;
  device_name?: string;

  constructor(private configViewService: ConfigViewService){

  }

  ngOnInit() {
    const config = this.configViewService.getUserConfig();
    this.email = config?.email
    this.device_name = config?.device
  }

  handelSubmit() {
    if(this.email && this.device_name){
      const my_config: Config = {email: this.email, device: this.device_name}
      this.configViewService.setUserConfig(my_config)
      this.submit_or_cancel.emit(false);
    }
  }

}
