import * as L from 'leaflet';

export const customIcon = L.icon({
  iconUrl: 'assets/images/marker-icon-red.png', 
  iconRetinaUrl: 'assets/images/marker-icon-2x-red.png', 
  shadowUrl: 'assets/images/marker-shadow.png',
  iconSize: [25, 41], 
  iconAnchor: [12, 41], 
  popupAnchor: [1, -34], 
  shadowSize: [41, 41] 
})