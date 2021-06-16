function initializeAutocomplete(id) {
  var element = document.getElementById(id);
  const options = {
    componentRestrictions: { country: "fr" },
    fields: ["address_components", "name", "formatted_phone_number", "website"],
  };

  if (element) {
    var autocomplete = new google.maps.places.Autocomplete(element, options);
  
    google.maps.event.addListener(autocomplete, 'place_changed', onPlaceChanged);
  }
}

function onPlaceChanged() {
  var place = this.getPlace();

   console.log(place);  // Uncomment this line to view the full object returned by Google API.

  for (var i in place.address_components) {
    var component = place.address_components[i];
    for (var j in component.types) {  // Some types are ["country", "political"]
      var type_element = document.getElementById(component.types[j]);
      if (type_element) {
        type_element.value = component.long_name;
      }
    }
  }

  nameLabel =  document.getElementById('name')
  if(nameLabel)
    nameLabel.value = place.name
  
  phone =  document.getElementById('phone')
  if(phone)
    phone.value = place.formatted_phone_number
  
  website =  document.getElementById('website')
  if(website)
    website.value = place.website
}

google.maps.event.addDomListener(window, 'load', function() {
  initializeAutocomplete('user_input_autocomplete_address');
});