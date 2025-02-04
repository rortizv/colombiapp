import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonIcon, IonButton, IonButtons, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton } from '@ionic/angular/standalone';
import { locateSharp, peopleSharp, removeCircleOutline, caretForwardOutline } from 'ionicons/icons';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonTitle, IonContent, IonMenuButton, IonHeader, IonButtons, IonToolbar, CommonModule, FormsModule],
})
export class MapPage implements AfterViewInit, OnInit {

  private map!: L.Map;
  private userMarker: L.Marker<any> | undefined;
  private currentMarkerIndex = -1;

  public locateIcon = locateSharp;
  public peopleIcon = peopleSharp;
  public removeCircleIcon = removeCircleOutline;
  public caretForwardIcon = caretForwardOutline;

  public coordinates = [
    {
      "lat": 4.6231,
      "lng": -74.1031,
      "address": "Calle 8 sur #38a - 03",
      "name": "Clínica Veterinaria Raza - Sede Ciudad Montes",
      "phoneNumber": "(601) 378 81 22"
    },
    {
      "lat": 4.6576,
      "lng": -74.1105,
      "address": "Av. La Esperanza #81 - 38",
      "name": "Clínica Veterinaria Raza - Sede Modelia",
      "phoneNumber": "(601) 378 81 22"
    },
    {
      "lat": 4.6935,
      "lng": -74.0647,
      "address": "Carrera 53 #102a - 36",
      "name": "Clínica Veterinaria Raza - Sede Pasadena",
      "phoneNumber": "(601) 378 81 22"
    },
    {
      "lat": 4.5981,
      "lng": -74.0917,
      "address": "Carrera 27 #1g - 94",
      "name": "Clínica Veterinaria Raza - Sede Santa Isabel",
      "phoneNumber": "(601) 378 81 22"
    },
    {
      "lat": 4.7625,
      "lng": -74.0450,
      "address": "Cl.183 #45-03",
      "name": "Clínica Veterinaria Raza - Sede Centro Comercial Santafé",
      "phoneNumber": "(601) 378 81 22"
    },
    {
      "lat": 4.6965,
      "lng": -74.0497,
      "address": "Calle 116 # 16-62",
      "name": "Petplus Clínica Veterinaria - Hospital Pepe Sierra",
      "phoneNumber": "695 7656 – 715-6389"
    },
    {
      "lat": 4.6708,
      "lng": -74.0560,
      "address": "Carrera 13a # 87-52",
      "name": "Petplus Clínica Veterinaria - Hospital Virrey",
      "phoneNumber": "6017721928 – 6018089179"
    },
    {
      "lat": 4.7265,
      "lng": -74.0489,
      "address": "Calle 147 # 19-50 Centro Comercial Futuro 147",
      "name": "Petplus Clínica Veterinaria - Hospital Calle 147",
      "phoneNumber": "6017462028"
    },
    {
      "lat": 4.6265,
      "lng": -74.1377,
      "address": "Carrera 63 57 G 46 Sur Local 303 Centro Comercial Paseo Villa del Rio",
      "name": "Petplus Clínica Veterinaria - Hospital CC Paseo Villa del Rio",
      "phoneNumber": "3116569673"
    },
    {
      "lat": 4.7320,
      "lng": -74.0480,
      "address": "Cra. 21 No. 153 – 40",
      "name": "Clínica Veterinaria CPA - Sede Magdala",
      "phoneNumber": "601 7181552"
    },
    {
      "lat": 4.5985,
      "lng": -74.1456,
      "address": "Cl. 42a Sur #80d – 03",
      "name": "Clínica Veterinaria Happy Pet",
      "phoneNumber": "+57 315 4866362"
    },
    {
      "lat": 4.6305,
      "lng": -74.1289,
      "address": "Tv. 73d #38C-20 sur",
      "name": "Asimev Veterinaria",
      "phoneNumber": "+57 14531119"
    },
    {
      "lat": 4.6300,
      "lng": -74.1000,
      "address": "Ac. 3 #53b-49",
      "name": "Veterinaria Pro Animal",
      "phoneNumber": "+57 601 2907101"
    },
    {
      "lat": 4.6300,
      "lng": -74.1000,
      "address": "Ac. 3 #38b – 35",
      "name": "Clínica Veterinaria Zoovet",
      "phoneNumber": "+57 15603040"
    },
    {
      "lat": 4.6300,
      "lng": -74.1000,
      "address": "Teusaquillo",
      "name": "Clínica de Pequeños Animales Veterinaria",
      "phoneNumber": "+57 601 3165063"
    },
    {
      "lat": 4.6300,
      "lng": -74.1000,
      "address": "Cra. 17 #51 – 35",
      "name": "Clínica Veterinaria Patotas SAS",
      "phoneNumber": "+57 315 2126086"
    },
    {
      "lat": 4.6300,
      "lng": -74.1000,
      "address": "Dg. 61b #22-38",
      "name": "Clínica Veterinaria Dr. Alvaro Chaparro, Dra. Mariana Chaparro",
      "phoneNumber": "+57 601 3466566"
    },
    {
      "lat": 4.6300,
      "lng": -74.1000,
      "address": "Cra. 75 #23A 46",
      "name": "Clínica Veterinaria CPA",
      "phoneNumber": "+57 310 5667095"
    },
    {
      "lat": 4.6300,
      "lng": -74.1000,
      "address": "Av. Calle 72 #No. 78—65",
      "name": "DogMar Veterinaria Clínica",
      "phoneNumber": "+57 313 4101893"
    },
    {
      "lat": 4.6300,
      "lng": -74.1000,
      "address": "Cl. 98b #63-10",
      "name": "Veterinaria Pet Company",
      "phoneNumber": "+57 315 3906173"
    }
  ];

  private userMarkers: L.Marker<any>[] = [];

  constructor() { }

  ngOnInit(): void { }

  private initMap(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const coords: [number, number] = [position.coords.latitude, position.coords.longitude];
        //lat: 40.73061, lon: -73.935242
        this.map = L.map('map').setView(coords, 14);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

        // Force map to resize after rendering
        this.map.invalidateSize();
      }, (error) => {
        alert('Error getting location: ' + error.message);
        // Fallback to a default location if geolocation fails
        this.map = L.map('map').setView([10.420747450286115, -75.54538551923045], 14);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
        this.map.invalidateSize();
      });
    } else {
      alert('Geolocation is not supported by this browser.');
      // Fallback to a default location if geolocation is not supported
      this.map = L.map('map').setView([10.420747450286115, -75.54538551923045], 14);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
      this.map.invalidateSize();
    }
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  public showUserLocation() {
    // get my current latitude and longitude
    if (navigator.geolocation) {
      const icon = L.icon({
        iconUrl: '../../../assets/icon/marker-icon-2x.png',
        iconSize: [25, 41]
      });

      navigator.geolocation.getCurrentPosition((position) => {
        const coords: [number, number] = [position.coords.latitude, position.coords.longitude];

        if (this.userMarker) {
          this.userMarker = L.marker(coords);
        } else {
          this.userMarker = L.marker(coords, { icon: icon })
            .addTo(this.map)
            .bindPopup('You are here!')
            .openPopup();
        }

        this.map.setView(coords, 12);

      }, (error) => {
        alert('Error getting location: ' + error.message);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  public showManyUsersLocation() {
    // Remove the current user marker, if any
    if (this.userMarker) {
      this.map.removeLayer(this.userMarker);
    }

    this.coordinates = [
      {
        "lat": 4.6231,
        "lng": -74.1031,
        "address": "Calle 8 sur #38a - 03",
        "name": "Clínica Veterinaria Raza - Sede Ciudad Montes",
        "phoneNumber": "(601) 378 81 22"
      },
      {
        "lat": 4.6576,
        "lng": -74.1105,
        "address": "Av. La Esperanza #81 - 38",
        "name": "Clínica Veterinaria Raza - Sede Modelia",
        "phoneNumber": "(601) 378 81 22"
      },
      {
        "lat": 4.6935,
        "lng": -74.0647,
        "address": "Carrera 53 #102a - 36",
        "name": "Clínica Veterinaria Raza - Sede Pasadena",
        "phoneNumber": "(601) 378 81 22"
      },
      {
        "lat": 4.5981,
        "lng": -74.0917,
        "address": "Carrera 27 #1g - 94",
        "name": "Clínica Veterinaria Raza - Sede Santa Isabel",
        "phoneNumber": "(601) 378 81 22"
      },
      {
        "lat": 4.7625,
        "lng": -74.0450,
        "address": "Cl.183 #45-03",
        "name": "Clínica Veterinaria Raza - Sede Centro Comercial Santafé",
        "phoneNumber": "(601) 378 81 22"
      },
      {
        "lat": 4.6965,
        "lng": -74.0497,
        "address": "Calle 116 # 16-62",
        "name": "Petplus Clínica Veterinaria - Hospital Pepe Sierra",
        "phoneNumber": "695 7656 – 715-6389"
      },
      {
        "lat": 4.6708,
        "lng": -74.0560,
        "address": "Carrera 13a # 87-52",
        "name": "Petplus Clínica Veterinaria - Hospital Virrey",
        "phoneNumber": "6017721928 – 6018089179"
      },
      {
        "lat": 4.7265,
        "lng": -74.0489,
        "address": "Calle 147 # 19-50 Centro Comercial Futuro 147",
        "name": "Petplus Clínica Veterinaria - Hospital Calle 147",
        "phoneNumber": "6017462028"
      },
      {
        "lat": 4.6265,
        "lng": -74.1377,
        "address": "Carrera 63 57 G 46 Sur Local 303 Centro Comercial Paseo Villa del Rio",
        "name": "Petplus Clínica Veterinaria - Hospital CC Paseo Villa del Rio",
        "phoneNumber": "3116569673"
      },
      {
        "lat": 4.7320,
        "lng": -74.0480,
        "address": "Cra. 21 No. 153 – 40",
        "name": "Clínica Veterinaria CPA - Sede Magdala",
        "phoneNumber": "601 7181552"
      },
      {
        "lat": 4.5985,
        "lng": -74.1456,
        "address": "Cl. 42a Sur #80d – 03",
        "name": "Clínica Veterinaria Happy Pet",
        "phoneNumber": "+57 315 4866362"
      },
      {
        "lat": 4.6305,
        "lng": -74.1289,
        "address": "Tv. 73d #38C-20 sur",
        "name": "Asimev Veterinaria",
        "phoneNumber": "+57 14531119"
      },
      {
        "lat": 4.6300,
        "lng": -74.1000,
        "address": "Ac. 3 #53b-49",
        "name": "Veterinaria Pro Animal",
        "phoneNumber": "+57 601 2907101"
      },
      {
        "lat": 4.6300,
        "lng": -74.1000,
        "address": "Ac. 3 #38b – 35",
        "name": "Clínica Veterinaria Zoovet",
        "phoneNumber": "+57 15603040"
      },
      {
        "lat": 4.6300,
        "lng": -74.1000,
        "address": "Teusaquillo",
        "name": "Clínica de Pequeños Animales Veterinaria",
        "phoneNumber": "+57 601 3165063"
      },
      {
        "lat": 4.6300,
        "lng": -74.1000,
        "address": "Cra. 17 #51 – 35",
        "name": "Clínica Veterinaria Patotas SAS",
        "phoneNumber": "+57 315 2126086"
      },
      {
        "lat": 4.6300,
        "lng": -74.1000,
        "address": "Dg. 61b #22-38",
        "name": "Clínica Veterinaria Dr. Alvaro Chaparro, Dra. Mariana Chaparro",
        "phoneNumber": "+57 601 3466566"
      },
      {
        "lat": 4.6300,
        "lng": -74.1000,
        "address": "Cra. 75 #23A 46",
        "name": "Clínica Veterinaria CPA",
        "phoneNumber": "+57 310 5667095"
      },
      {
        "lat": 4.6300,
        "lng": -74.1000,
        "address": "Av. Calle 72 #No. 78—65",
        "name": "DogMar Veterinaria Clínica",
        "phoneNumber": "+57 313 4101893"
      },
      {
        "lat": 4.6300,
        "lng": -74.1000,
        "address": "Cl. 98b #63-10",
        "name": "Veterinaria Pet Company",
        "phoneNumber": "+57 315 3906173"
      }
    ];

    // Add markers for all coordinates and store them
    this.coordinates.forEach((coord) => {
      const icon = L.icon({
        iconUrl: '../../../assets/icon/marker-icon-2x.png',
        iconSize: [25, 41]
      });

      const name = coord.name;
      const address = coord.address;
      const phoneNumber = coord.phoneNumber;
      const marker = L.marker(coord, { icon: icon })
        .addTo(this.map)
        .bindPopup(`<b>${name}</b><br>${address}<br><a href="tel:${phoneNumber}">${phoneNumber}</a>`); // Add popup with name and address

      this.userMarkers.push(marker); // Store marker reference
    });
  }

  public removeAllUserMarkers() {
    this.userMarkers.forEach((marker) => {
      this.map.removeLayer(marker); // Remove each marker from the map
    });

    this.userMarkers = []; // Clear the array
    this.coordinates = [];
  }

  public goToNextMarkerPosition() {
    if (this.coordinates.length === 0) {
      alert('No markers available to navigate.');
      return;
    }

    // Increment the marker index and loop back to the start if at the end
    this.currentMarkerIndex = (this.currentMarkerIndex + 1) % this.coordinates.length;

    // Get the next marker's coordinates
    const nextMarker = this.coordinates[this.currentMarkerIndex];

    // Fly the map to the next marker's position with animation
    this.map.flyTo([nextMarker.lat, nextMarker.lng], 14, {
      animate: true,
      duration: 1 // Animation duration in seconds
    });

    // Optionally, open the popup for the marker
    const marker = this.userMarkers[this.currentMarkerIndex];
    if (marker) {
      marker.openPopup();
    }
  }

  public addTrailRoutes() {
    const trailCoordinates = [
      { lat: 4.7313399, lon: -74.0296562 },
      { lat: 4.7315399, lon: -74.0294562 },
      { lat: 4.7317399, lon: -74.0292562 },
      { lat: 4.7319399, lon: -74.0290562 },
      { lat: 4.7321399, lon: -74.0288562 },
      { lat: 4.7323399, lon: -74.0286562 },
      { lat: 4.7325399, lon: -74.0284562 },
      { lat: 4.7327399, lon: -74.0282562 },
      { lat: 4.7329399, lon: -74.0280562 },
      { lat: 4.7331399, lon: -74.0278562 },
      { lat: 4.7333399, lon: -74.0276562 },
      { lat: 4.7335599, lon: -74.0275062 },
      { lat: 4.7337799, lon: -74.0273562 },
      { lat: 4.7340999, lon: -74.0271562 },
      { lat: 4.7341999, lon: -74.0273562 },
      { lat: 4.7343999, lon: -74.0275562 },
      { lat: 4.7345999, lon: -74.0277562 },
      { lat: 4.7347999, lon: -74.0279562 },
      { lat: 4.7350999, lon: -74.0281562 },
      { lat: 4.7352999, lon: -74.0283562 },
    ];

    const latlngs = trailCoordinates.map(coord => L.latLng(coord.lat, coord.lon));
    const trailRoute = L.polyline(latlngs, { color: 'blue' }).addTo(this.map);
    this.map.fitBounds(trailRoute.getBounds()); // zoom the map to the polyline
    trailRoute.bindPopup("Ruta: Sendero XYZ");
  }

}
