import { Injectable } from "@angular/core";
import {io, Socket} from 'socket.io-client';
import { Observable } from 'rxjs';
import { ConfigViewService } from "../config-view/config-view.service";


@Injectable(
    {providedIn: 'root'}
)
export class MapViewService{

    private connection_url = 'https://trackme-backend-server.onrender.com' //'http://localhost:5000'
    private socket!: Socket;
    private my_socket_id?: any

    constructor(private configViewService: ConfigViewService){  }


    public connect(){
        const userConfig = this.configViewService.getUserConfig();

        this.socket = io(this.connection_url);

        this.socket.on('connected', (data)=> {
           this.my_socket_id = data.socket_id
           this.socket.emit('join-channel', {channel: userConfig?.email, device: userConfig?.device})
        })
    }


    public startSendingLocation(){
        const userConfig = this.configViewService.getUserConfig();

        // navigator is built-in browser object which provide location access
        if(navigator.geolocation){
            // watchPosition asynchroniously motinor position
             navigator.geolocation.watchPosition(
              (position) =>{
                const {latitude, longitude} = position.coords;
                this.socket.emit('send-location', {
                    channel: userConfig?.email, 
                    device: userConfig?.device, 
                    lon: longitude, 
                    lat: latitude
                  }
                )
             },
             (error) => {
                console.error(error)
             },
             {
                // settings for watchPosition
                enableHighAccuracy: true,
                timeout: 2000,
                maximumAge: 0
             }
            );
        }
    }


    public receiveMessage(): Observable<any>{
        return new Observable( observer => {
           this.socket.on('receive-location', (data) => observer.next(data));
        })
    }

    public onSocketDisconnect(): Observable<any>{
        return new Observable( observer => {
           this.socket.on('user-disconnect', (data) => observer.next(data));
        })
    }

}