# Getting Started with this API

This API provides access to a collection of rick and morty characters, allowing users to search, filter, get, and perform basic operations.

========================================================================
## Technologies

API - Node-Express-Redis-GraphQl-Sequelize-MySql-Swagger


## Starting  🚀

_These instructions will allow you to get a copy of the project running on the local machine for development and testing purposes._

See **Deployment** to learn how to deploy the project.


### Pre- requirements 📋

_NodeJS_
_MySql_

_Ubuntu 24 LTS in windows_
_Redis in ubuntu_
_Redis insight IDE_

### Installation 🔧

__To install the project locally and run the api please execute the following steps__

_Clone the api-node-characters repository from github_

```
git clone https://github.com/desobsesor/api-node-characters.git
```

_Install the dependencies_

```
npm i
```

_Boot Ubuntu on Windows and its redis service_

```
sudo service redis-server start
```

_Compile the project and start the server_

```
npm run start-dev
```

_Invoke the service status endpoint_

```
http://localhost:4000
```

## Swagger 📦

_Invoke the API documentation endpoint_

```
http://localhost:4000/api-docs
```

## Running the tests ⚙️

_Run to start unit tests_

```
npm run test
```

## Deployment 📦

_Compile the project and build the application sources_

```
npm run compile
```

## Built with 🛠️

_Tools and Technologies used_

* [Nodejs](https://nodejs.org/en/) - Server-side JavaScript environment, uses an asynchronous and event-driven model.
* [Npm](https://www.npmjs.com/) - Dependency manager
* [MySQL](https://www.mysql.com/) -Database engine
* [Sequelize](https://www.secuelize.org/) - ORM for databases
* [Redis](https://redis.io/) - Cache service - KVS
* [GraphQl](https://graphql.org) - A query language for your API
* [Swagger](https://swagger.io/) -Swagger is an open specification for defining APIs

## Contributing 🖇️

Contributions are currently not allowed.

## Versioned 📌

[SemVer](http://semver.org/) is used for versioning. For all versions available.

## Authors ✒️

_Built by_

* **Yovany Suárez Silva** - *Senior FullStack Developer* - [desobsesor](https://github.com/desobsesor)

## License 📄

This project is under the MIT License - see the file [LICENSE.md](LICENSE.md) for details

## Expressions of Gratitude 🎁

⌨️ con ❤️ por [desobsesor](https://github.com/desobsesor) 😊