import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone
} from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { MapsAPILoader } from '@agm/core';
// import {  } from 'googlemaps';
declare var google;

@Component({
  selector: 'zc-gmap',
  templateUrl: './zc-gmap.component.html',
  styleUrls: ['./zc-gmap.component.scss']
})
export class ZcGmapComponent extends FieldType implements OnInit {
  lat = 17.432;
  lng = 78.44692;
  to: any;
  @ViewChild('search')
  public searchElementRef: ElementRef;
  private autocompleteService;
  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {
    super();
    this.mapsAPILoader.load().then(() => {
      this.autocompleteService = new google.maps.places.AutocompleteService();
    });
  }
  ngOnInit(): void {
    if (this.to.readonly) {
      this.to.markerDragable = false;
    }
    if (this.formControl.value) {
      const coords = this.formControl.value;
      this.lat = coords.lat || this.lat;
      this.lng = coords.lng || this.lng;
    }
    this.formControl.valueChanges.subscribe(val => {
      if (val) {
        const coords = this.formControl.value;
        this.lat = coords.lat;
        this.lng = coords.lng;
      }
    });
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        {
          types: ['address']
        }
      );
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          // const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          const place = autocomplete.getPlace();
          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          // this.formControl.setValue({ lat: this.lat, lng: this.lng, address: place.formatted_address });
          this.clickEvent({
            lat: this.lat,
            lng: this.lng,
            address: place.formatted_address
          });
          // this.zoom = 12;
        });
      });
    });
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
  }

  markerDragEnd(event) {
    // this.formControl.setValue(event.coords);
    this.clickEvent(event.coords);
  }
  clickEvent(marker) {
    if (marker) {
      this.formControl.setValue(marker);
    }
    if (this.formControl.value) {
      if (this.field.templateOptions.change) {
        this.field.templateOptions.change(this.field, this.formControl.value);
      }
    }
  }
}
