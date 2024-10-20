# TrackMe - Realtime Device Tracker
TrackMe is a real-time device tracking application that allows users to monitor multiple devices from a single location. Devices are linked by the same email address, creating a unified tracking channel for each user. This makes it easy to track the location of all devices associated with an account in real time.

## Features
#### Real-Time Tracking: Track multiple devices simultaneously in real-time.
#### Multiple Device Support: Link multiple devices under the same email (channel) to monitor them from one place.
#### WebSocket-Based: Fast and reliable communication using websockets (Socket.io).
#### Geolocation: Uses device geolocation for accurate real-time position updates.
#### Interactive Map: Displays device locations on a map using Leaflet.
## Tech Stack
### Backend
#### Node.js: The backend is built with Node.js to handle server-side logic and websocket connections.
#### Socket.io: Used to implement a pub-sub architecture for real-time communication between the server and devices.
### Frontend
#### Angular: The front-end interface is built with Angular to provide a dynamic and responsive user experience.
#### RxJS: Utilized for handling real-time data streams from the backend using observables.
#### Socket.io-client: Used on the client-side to connect with the Socket.io server for receiving location updates.
#### Leaflet: An interactive map library to display the real-time location of devices.
#### Geolocation: Retrieves the current location of each device.
## How It Works
Device Registration: Each device is linked to a user's email (channel name) when they join.
Real-Time Updates: Devices send geolocation data to the server in real-time via websocket connections.
Centralized Tracking: The user can see the location of all their devices in real-time on an interactive map.
Pub-Sub Architecture: The server uses a publish-subscribe model to push location updates to all connected devices of the user.
