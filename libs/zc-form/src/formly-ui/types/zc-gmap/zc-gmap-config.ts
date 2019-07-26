import { Injectable } from "@angular/core";
import { LazyMapsAPILoaderConfigLiteral } from "@agm/core";
import { AppConfigService } from '@zc-ui/zc-utilities';
@Injectable()
export class MapsConfig implements LazyMapsAPILoaderConfigLiteral {
    public apiKey: string
    public libraries: string[]
    constructor(appConfig: AppConfigService) {
        this.apiKey = appConfig.settings.googleMapKey;
        this.libraries = ['places'];
        // console.log("lazy map init with " + this.apiKey)
    }
}