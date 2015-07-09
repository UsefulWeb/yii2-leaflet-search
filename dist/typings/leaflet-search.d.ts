/// <reference path="vendor/leaflet/leaflet.d.ts"/>

declare module L {
  export interface ControlStatic extends L.ClassStatic {
    geocoder: any;
    Geocoder: any;
  }
  function control(options?: L.ControlOptions): L.Control;
}
