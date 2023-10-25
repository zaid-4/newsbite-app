# NewsBite - A React App
Welcome to the take-home challenge for the FullStack web developer position. The challenge is to build a news aggregator website that pulls articles from various sources and displays them in a clean, easy-to-read format.

## Getting Started

### Without Docker

To run the app without Docker, follow these steps:

1. Clone this repository to your local machine.
2. Open your terminal and navigate to the project directory.
3. Install the necessary dependencies by running:

```shell
   npm install
```

4. Setup the Server API, default is [http://localhost:8000], you can change it with your server in `Config.json`

```shell
    {
        "SERVER_URL": "http://127.0.0.1:8000/api"
    }
```
5. Start the Server

```shell
   npm start
```

### With Docker

To run the app with Docker, follow these steps:

1. Clone this repository to your local machine.
2. Open your terminal and navigate to the project directory.
3. Build the Docker image using the provided Dockerfile:

```shell
   sudo docker build -t newsbite-app .
```

4. Once the image is built, you can run the app in a Docker container:

```shell
    sudo docker run -p 3000:3000 newsbite-app
```
5. This will start the app in a Docker container, and you can access it in your web browser at [`http://localhost:3000`].

