# An Alternate Pebble Store (API)
This is an API intended to replace the Pebble store. The UI will be developed separately.

## Requirements
- NodeJS
- PostgreSQL

## Installation
```sh
$ git clone https://github.com/michahump/pet-rock-api.git
$ cd pet-rock-api
$ npm install
```

## Usage
1. Adjust `config/*.json` as necessary to connect to PostgreSQL
2. Run `npm start`
3. Run `node seed` to seed the database with sample data
4. See `docs/swagger.yaml` for API documentation
