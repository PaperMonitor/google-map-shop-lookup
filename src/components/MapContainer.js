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

          
// in MapContainer.js
handleSearch = (() => {
  const { mapsApi, directionService, placesService } = this.state;
  const filteredResults = [];
  
  // 1. Create places request 
  const placesRequest = {
    location: new mapsApi.LatLng(1.3521, 103.8198),
    type: ['restaurant', 'cafe'],
    query: 'ice cream',
    rankBy: mapsApi.places.RankBy.DISTANCE,
    // radius: 30000, 
  };
  
  // 2. Search for ice cream shops. Returns max 20 results.
  placesService.textSearch(placesRequest, ((response) => {
    
    // 3. Calculate traveling time for each location
    for (let i = 0; i < response.length; i ++) {
      const iceCreamPlace = response[i];
      const { rating, name } = iceCreamPlace;
      const address = iceCreamPlace.formatted_address; // e.g 80 mandai lake...
      
      // 4. Create direction request for each location
      const directionRequest = {
        origin: new mapsApi.LatLng(1.3521, 103.8198), // From
        destination: address, // To
        travelMode: 'DRIVING',
      };
      
      // 5. Make Request
      directionService.route(directionRequest, ((result, status) => {
        if (status !== 'OK') { return }
        const travellingRoute = result.routes[0].legs[0];
        const travellingTimeInMinutes = travellingRoute.duration.value / 60;
        
        // 6. Places within limit are added to results
        if (travellingTimeInMinutes < timeLimitInMinutes) {
          filteredResults.push(name);
        }
      });
                             
      // 7. Return results in state
      this.setState({ searchResults: filteredResults });
    }
  });
});
        </GoogleMapReact>
      </section>
    );
  }
}
