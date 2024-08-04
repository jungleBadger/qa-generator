# QA Generator

![GitHub repo size](https://img.shields.io/github/repo-size/jungleBadger/qa-generator)
![GitHub contributors](https://img.shields.io/github/contributors/jungleBadger/qa-generator)
![GitHub stars](https://img.shields.io/github/stars/jungleBadger/qa-generator?style=social)
![GitHub forks](https://img.shields.io/github/forks/jungleBadger/qa-generator?style=social)
![GitHub issues](https://img.shields.io/github/issues/jungleBadger/qa-generator)
![GitHub license](https://img.shields.io/github/license/jungleBadger/qa-generator)

## Overview

QA Generator is an application designed to parse user input as raw text or document uploads, process the content, and generate Question-Answer (QA) pairs. This tool is useful for automating the creation of QA pairs from various types of documents.

## Stack

### Backend

- **Node.js v20.16+**

### Frontend

- **React.js**: Frontend framework

## Diagrams

TBD

## Environment Variables

Sample environment variables:

```bash
APP_HOST=0.0.0.0
APP_PORT=4025
APP_SECRET=<32-Byte Hexadecimal Key>
VITE_PORT=5173
DEBUG=true
CHUNK_SIZE=3000
OVERLAP_SIZE=200

OPENAI_API_KEY=

MONGODB_URI=

AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
AUTH0_CALLBACK_URL=/auth/callback
AUTH0_DOMAIN=<domain>.us.auth0.com
```

## Building and Running the Application

### Using Docker

```bash
docker-compose up --build
```

### Local Run

#### Installing Dependencies

```bash
npm i
```

#### Building and Starting the App Without Live Reload

```bash
npm run build:client
npm start
```

#### Building and Starting Dev App with Server and UI Live Reload

```bash
npm run start:dev
```

#### Lint and Prettier

```bash
npm run lint
npm run format
```

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
