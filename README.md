# LogisTechs - AI Route Optimization Website

This project is a logistics optimization website that leverages Google Maps for route optimization. It dynamically loads Google Maps to show optimized routes based on user input.

## Features

- Google Maps API integration for route optimization
- Dynamic form handling
- Interactive map for displaying routes and directions

## Getting Started

### Prerequisites

To run this project locally, you will need:

- A web browser
- A Google Maps API key
- A simple HTTP server (such as Python's built-in server)

### Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/logistechs.git
    cd logistechs
    ```

2. Add your **Google Maps API key** in `apiKeys.js`:

    ```javascript
    var googleMapsApiKey = 'YOUR_API_KEY_HERE';
    ```

3. Start a local server to serve the project. For example, using Python:

    ```bash
    python3 -m http.server
    ```

4. Open your browser and navigate to `http://localhost:8000`.

### Project Structure

```plaintext
.
├── index.html
├── apiKeys.js
├── mapScript.js
├── css/
│   ├── bootstrap.min.css
│   └── style.css
├── js/
│   ├── bootstrap.bundle.min.js
│   ├── tiny-slider.js
│   └── custom.js
├── images/
│   └── Truck.png
├── README.md
├── LICENSE
└── .gitignore
