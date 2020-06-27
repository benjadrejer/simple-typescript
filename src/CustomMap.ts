export interface Mappable {
  location: {
    lat: number;
    lng: number;
  };
  markerContent(): string;
};

export class CustomMap {
  private googleMap: google.maps.Map;

  constructor(divId: string) {
    const mapEl = document.querySelector(`#${divId}`);
    this.googleMap = new google.maps.Map(mapEl, {
      zoom: 1,
      center: {
        lat: 0,
        lng: 0,
      },
    });
  }

  private addInfoWindow(marker: google.maps.Marker, mappable: Mappable): void {
    const infoWindow = new google.maps.InfoWindow({
      content: mappable.markerContent(),
    });
    marker.addListener('click', () => {
      infoWindow.open(this.googleMap, marker);
    })
  }

  addMarker(mappable: Mappable): void {
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lng,
      },
    });
    this.addInfoWindow(marker, mappable);
  }
}