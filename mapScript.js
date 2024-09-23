console.log("mapScript.js is loaded");

// Access the global variables
console.log('LAT', window.latitude);  // This should output the latitude
console.log('LONG', window.longitude);  // This should output the longitude

if (typeof googleMapsApiKey === 'undefined') {
    console.error("googleMapsApiKey is not defined. Ensure apiKeys.js is loaded correctly.");
} else {
    console.log("Google Maps API key found:", googleMapsApiKey);
}

// Load Google Maps function
function loadGoogleMaps() {
    console.log("Loading Google Maps with API key:", googleMapsApiKey);

    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existingScript) {
        existingScript.remove();
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&callback=initMap&libraries=places`;
    script.async = true;
    script.defer = true;

    document.head.appendChild(script);

    script.onerror = function() {
        console.error("Failed to load the Google Maps script.");
    };
}

// Initialize the Google Map
function initMap() {
    console.log('Latitude:', window.latitude);
    console.log('Longitude:', window.longitude);

    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: { lat: 21.434927121763877, lng: 39.21677542419057 }  // Default location
    });

    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({ map: map });

    // Use the global variables for latitude and longitude
    const destination = { lat: parseFloat(window.latitude), lng: parseFloat(window.longitude) };

    const origin = { lat: 21.434927121763877, lng: 39.21677542419057 };  // Example origin

    const request = {
        origin: origin,
        destination: destination,
        travelMode: 'DRIVING',
        drivingOptions: {
            departureTime: new Date(),
            trafficModel: 'pessimistic'
        },
        unitSystem: google.maps.UnitSystem.IMPERIAL
    };

    directionsService.route(request, (response, status) => {
        if (status === 'OK') {
            directionsRenderer.setDirections(response);
        } else {
            console.error('Directions request failed due to ' + status);
        }
    });
}

// Add a form submission listener to trigger Google Maps update
document.getElementById('customerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    console.log("Form submitted, reloading Google Maps...");
    loadGoogleMaps();
});
