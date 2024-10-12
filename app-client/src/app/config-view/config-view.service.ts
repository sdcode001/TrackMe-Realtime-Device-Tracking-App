import { Injectable } from "@angular/core";
import { Config } from "./config-view.model";


@Injectable(
    {providedIn: 'root'}
)
export class ConfigViewService {
    private _config?: Config

    constructor(){
        const config = localStorage.getItem('USER_CONFIG')

        if(config){
            this._config = JSON.parse(config);
        }
    }

    public isUserConfigured(){
        if(this._config!=null && this._config!=undefined){return true;}
        return false;
    }

    public getUserConfig(){
        return this._config;
    }

    public setUserConfig(config: Config){
       this._config = config
       localStorage.setItem('USER_CONFIG', JSON.stringify(config));
    }

}