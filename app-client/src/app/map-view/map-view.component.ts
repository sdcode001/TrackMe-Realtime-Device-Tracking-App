import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MapViewService } from './map-view.service';
import * as L from 'leaflet';
import { customIcon } from './map-view.util';


@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})
export class MapViewComponent implements OnInit, AfterViewInit{
    private map!: L.Map;
    private markers: { [socket_id: string]: L.Marker } = {};

    private initMap(): void {
        this.map = L.map('map', {
          center: [ 20.5937, 78.9629 ],
          zoom: 7
        });

        const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });
    
        tiles.addTo(this.map);
    }


     constructor(private mapViewService: MapViewService){
        this.mapViewService.connect();
     }

     ngOnInit(){
        this.mapViewService.startSendingLocation();

        this.mapViewService.receiveMessage().subscribe({
          next: (data) => {
             const {device, socket_id, lon, lat} = data;
             this.map.setView([lat, lon], 30)
             if (this.markers[socket_id]) {
              // Update the position of the existing marker
              this.markers[socket_id].setLatLng([lat, lon]);
            } else {
              // Create a new marker and add it to the map
              const marker = L.marker([lat, lon], {
                icon: customIcon,
              }).addTo(this.map);

              // Bind a tooltip that displays the device name and make it permanent
              marker.bindTooltip(device, {
                permanent: true,     
                direction: 'auto',     
                className: 'custom-tooltip' 
              });

              marker.openTooltip();

              // Store the marker in the markers object
              this.markers[socket_id] = marker;
            }
      
          },
          error: (err) => {
            console.error(err)
          }
        })

        this.mapViewService.onSocketDisconnect().subscribe({
          next: (data) => {
            const { socket_id } = data;
            if (this.markers[socket_id]) {
              this.map.removeLayer(this.markers[socket_id]); // Remove marker from map
              delete this.markers[socket_id]; // Remove from markers list
            }
          },
          error: (err) => {
            console.error(err)
          }
        })
     }


     ngAfterViewInit() { 
        this.initMap();
     }

}
