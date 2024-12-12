
# GISAT | COG Explorer

![version](https://img.shields.io/badge/version-0.2.0-blue)

COG Explorer is an internal web application developed by GISAT for exploring **Cloud Optimized GeoTIFFs (COGs)**. Designed for GIS professionals, COG Explorer enables efficient visualization, analysis, and management of geospatial data directly from the cloud.

## Features

- **Explore Cloud Optimized GeoTIFFs** (COGs) easily and efficiently.
- **Interactive map interface** for seamless geospatial data viewing.
- **Customizable settings and filters** to tailor data views.
- **Responsive design** suitable for desktop and mobile use.
- **Scalable architecture** for performance with large datasets.

## Getting Started

Follow these steps to set up and run COG Explorer in development mode.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/gisat-panther/app-gisat-cog-explorer
   ```

2. Navigate into the project directory:
   ```bash
   cd app-gisat-cog-explorer
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and go to `http://localhost:3000` to start exploring!

### Requirements

- **Node.js**: v21.7.0
- **NPM**: v10.5.0

*Note: This application has been tested on the above versions. Compatibility with other versions may vary.*

## Project Structure

The core files and directories include:

- `src/`: Contains the application’s main source code.
- `components/`: Reusable UI components, such as sliders and checkboxes, used across the application.
- `utils/`: Utility functions, such as query string manipulation, for app functionality.
- `public/`: Static assets, including images and icons.
- `README.md`: Project documentation.

## Development Guide

1. **Configuration**: Customize any necessary configuration files in the root directory.
2. **Testing**: Currently, the app uses basic unit testing. Run tests with:
   ```bash
   npm test
   ```
3. **Deployment**: Refer to your server setup or containerize with Docker for production.

## Contact

COG Explorer was developed by [@ander481](https://github.com/ander481) as part of GISAT’s internal tools suite. 

For questions or support, please contact:
- **Andrii Khrystodulov** - [andrii.khrystodulov@gisat.cz](mailto:andrii.khrystodulov@gisat.cz)

Visit [GISAT](https://gisat.cz) for more information on geospatial solutions.

## License

*(To be completed...)*
