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
          onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
        >
        </GoogleMapReact>
      </section>
    );
  }
}
