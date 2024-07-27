## Dependencies

- Node v20+

## Environment variables

Sample environment variables:

```bash
APP_HOST=0.0.0.0
APP_PORT=4025
VITE_PORT=5173
DEBUG=true
```

## Building and running the application

### Using Docker
```bash
docker-compose up --build
```

### Local run

#### Installing dependencies

```bash
npm i
```

#### Building and starting the app without Live Reload

```bash
npm run build:client
npm start
```

#### Building and starting dev app with Server and UI Live Reload

```bash
npm run start:dev
```

#### Lint and Prettier

```bash
npm run lint
npm run format
```
