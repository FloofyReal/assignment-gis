# Date Helper

## Intro
Ever was in a situation, that your lovely SO didn't want to sit another evening in front of yet another TV series? Did you ever feel you want to impress a girl, but find yourself lacking useful Geological information? Well, today is your lucky day, because with Date Helper, you will give her above average time with B+ for trying!


1. Custom-styled background map, ideally built with [mapbox](http://mapbox.com).
2. Local server with [PostGIS](http://postgis.net/) and an API layer that exposes data in a [geojson format](http://geojson.org/) using CherryPy as dedicated server and MapBox.js API to help with useful GeoJSON functions.
3. The user-facing web application which calls the API and lets the user see and navigate in the map and shows the geodata. You can (and should) use existing components, such as the Mapbox SDK, or [Leaflet](http://leafletjs.com/).

## Example of use

- Showing nearby (or rather ALL) shops by choice (Supermarkets, Florists, Newsagents and Fuel stations).
- Showing nearby (or rather ALL) parks with existing paths for walking OR parks that are nearby water areas (even without paths - Let's go for an adventure!)

## Data sources

- [Open Street Maps](https://www.openstreetmap.org/)

## My project

Fill in (either in English, or in Slovak):

**Application description**: `Date Helper`

**Data source**: `<OSM data dump of Slovakia>`

**Technologies used**: `PostGis, PSGCOG2, CherryPy, Mapbox`
