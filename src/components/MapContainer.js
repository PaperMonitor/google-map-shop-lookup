import GoogleMapReact from 'google-map-react';

class MapContainer extends Component {
  render() {
    return(
      <section className="col-8 h-lg">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: '{APIKEY_FORGOT_TO_GENERATE}',
            libraries: ['places', 'directions']
          }}
          defaultZoom={11} // Supports DP, e.g 11.5
          defaultCenter={{ lat: 1.3521, lng: 103.8198 }}
          yesIWantToUseGoogleMapApiInternals={true}
          onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, // maps === mapsApi. But I changed it for clearer naming.apiHasLoaded = ((map, mapsApi) => {
            this.setState({
              mapsApi,
              autoCompleteService: new mapsApi.places.AutocompleteService(),
              placesService: new mapsApi.places.PlacesService(map),
              directionService: new mapsApi.DirectionsService(),
              geoCoderService: new mapsApi.Geocoder(),
              singaporeLatLng: new mapsApi.LatLng(1.3521, 103.8198)
          });
          )}
        >
        </GoogleMapReact>
      </section>
    );
  }
}
