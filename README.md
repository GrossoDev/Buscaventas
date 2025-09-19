# \~This project is in limbo\~
MercadoLibre has recently changed the way their web client gets search results.
They used to return results as a JSON array, but now they respond with a server-side rendered page.

Parsing the results would now require to do some scraping, and due to their CORS policy that can't be done in the browser.

Until ML provides an API to search their site, or until I can be bothered to implement a proxy to scrape the results, this project is on hold.

# Buscaventas
Search engine that helps you find different products from the same seller using Mercado Libre's API.

### [Visit site](https://grossodev.github.io/Buscaventas/)

## Usage
### Git Submodules
This project uses Git Submodules.
After cloning the repo, run `git submodule init` to initialize them and `git submodule update` to clone them into the project.

### Running locally
You can start this project locally by running `npm start`.
It will be hosted at `localhost:3000/Buscaventas`

### Building for deployment
You can build it by running `npm run build`.
The project assumes that its files will be served statically from `<PUBLIC_URL>/Buscaventas`.
