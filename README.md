# Todo Database Systems Project

## Installation Instructions

Make sure to have the following requisite software:

* Node.js version 18 or greater
* yarn package manager
* Docker

1. Start a MongoDB instance using Docker by executing such command:
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```
**NOTE:** The following command sets default *unsafe* MongoDB instance, to customize check the documentation at Docker Hub.

2. Navigate to the `/backend` and `/frontend` in each directory execute the following command to install Node.js packages.
```bash
yarn
```

3. To start running the backend and frontend services, use two terminal windows or multi-pane terminal emulator (such as `tmux`).
```bash
# start service by:
yarn dev
```
