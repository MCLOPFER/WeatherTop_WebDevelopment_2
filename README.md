
<p align="center">
  <img src="images/logo.png" width="400" height="110"/>
</p>
<br/>

# **WeatherTop** 

Weather reporting App

<br/>

- [**WeatherTop**](#weathertop)
  - [Features](#features)
  - [Installation Instructions](#installation-instructions)
    - [Prerequisite tools to install](#prerequisite-tools-to-install)
    - [Build command](#build-command)
  - [Usage](#usage)
  - [Tools and Technology used](#tools-and-technology-used)
  - [How access it](#how-access-it)
  - [Directory structure](#directory-structure)
  - [Source Attributions](#source-attributions)
  - [Authors](#authors)

<br/>

## Features
- Dashboard page displaying the stations needed
- List of *country codes (ISO3166-1)* provided
- Weather icon change based on weather code
- Little description about the wheater under the weather icon
- *Latitude* and *longitud* from the stations displayed automatically once added
- Current weather displayed in the dashboard
- Temperature provided in two different units: *Celcius* and *Fahrenheit*
- Wind Direction provided in *degrees* and *coordinal direcction*
- *Temperature* (°C) bar chart
- *Humidity* (%) line chart
- *Auto-generate* report, where you can compare the reports token from previous days
- Map with a marker on the location of that station, with an option to zoom in or zoom out
- *User account* on menu, where you can edit your personal details, and also, delete your account if it is not longer need.

## Installation Instructions

### Prerequisite tools to install
- [node](https://nodejs.org)
- [VSCode](https://code.visualstudio.com/)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [npm](https://docs.npmjs.com/cli/v10/commands/npm-install)
- [Nunjucks](https://mozilla.github.io/nunjucks/getting-started.html)

### Build command
To build this project run the following command from the root directory of the repo:
```

```

## Usage
To run this project locally run the following command:
```
git clone https://github.com/MCLOPFER/WeatherTop_WebDevelopment_2.git
Cloning into 'WeatherTop_WebDevelopment_2'...
remote: Enumerating objects: 239, done.
remote: Counting objects: 100% (239/239), done.
remote: Compressing objects: 100% (158/158), done.
remote: Total 239 (delta 111), reused 197 (delta 72), pack-reused 0 (from 0)
Receiving objects: 100% (239/239), 61.46 KiB | 5.59 MiB/s, done.
Resolving deltas: 100% (111/111), done.

WeatherTop_WebDevelopment_2 % npm install
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: 'glitch-template@0.0.1',
npm warn EBADENGINE   required: { node: '16.x.x' },
npm warn EBADENGINE   current: { node: 'v20.11.1', npm: '10.8.2' }
npm warn EBADENGINE }
added 95 packages, and audited 96 packages in 498ms
13 packages are looking for funding
  run `npm fund` for details
found 0 vulnerabilities

maricruzlopez@MacBook-Air WeatherTop_WebDevelopment_2 % npm start

> glitch-template@0.0.1 start
> node server.js

Todolist started on http://localhost:4000
```

The application will now be running on: http://localhost:4000/

To stop the project, enter Ctrl-C in the terminal,

## Tools and Technology used
- HTML
- Bulma CSS
- JavaScript
- JQuery
- Handelbars
- Glitch
- Node.js
- Dayjs
- Axios
- Leaflet
- Git

## How access it
You would just need internet and a device where you can open the following link: 
<br/>
https://gilded-holistic-bridge.glitch.me/

## Directory structure
```
.
├── README.md
├── controllers
│   ├── about-controller.js
│   ├── accounts-controller.js
│   ├── dashboard-controller.js
│   ├── report-controller.js
│   ├── station-controller.js
│   └── user-controller.js
├── images
│   ├── humidity-trend.png
│   ├── logo.png
│   ├── map.png
│   └── temperature-trend.png
├── models
│   ├── countryCodes.json
│   ├── object-store.js
│   ├── report-store.js
│   ├── reports.json
│   ├── station-store.js
│   ├── stations.json
│   ├── user-store.js
│   └── users.json
├── node_modules
├── package-lock.json
├── package.json
├── routes.js
├── server.js
├── utils
│   ├── store-utils.js
│   └── utils.js
└── views
    ├── about-view.hbs
    ├── countryCodeInfo-view.hbs
    ├── dashboard-view-error.hbs
    ├── dashboard-view.hbs
    ├── index.hbs
    ├── layouts
    │   └── main.hbs
    ├── login-view-error.hbs
    ├── login-view.hbs
    ├── partials
    │   ├── add-report.hbs
    │   ├── add-station-error.hbs
    │   ├── add-station.hbs
    │   ├── brand.hbs
    │   ├── cancel-delete-user.hbs
    │   ├── edit-report.hbs
    │   ├── icons
    │   │   ├── atmosphere.hbs
    │   │   ├── back.hbs
    │   │   ├── cloudy.hbs
    │   │   ├── delete.hbs
    │   │   ├── drizzle.hbs
    │   │   ├── edit.hbs
    │   │   ├── error.hbs
    │   │   ├── info.hbs
    │   │   ├── location.hbs
    │   │   ├── logo.hbs
    │   │   ├── pressure.hbs
    │   │   ├── rain.hbs
    │   │   ├── snow.hbs
    │   │   ├── success.hbs
    │   │   ├── sun.hbs
    │   │   ├── temperature.hbs
    │   │   ├── thunderstorm.hbs
    │   │   ├── user.hbs
    │   │   └── wind.hbs
    │   ├── list-reports.hbs
    │   ├── list-stations.hbs
    │   ├── menu.hbs
    │   ├── navbar-burger.hbs
    │   ├── station-summary.hbs
    │   ├── user-account.hbs
    │   ├── user-update.hbs
    │   └── welcome-menu.hbs
    ├── report-view.hbs
    ├── signup-view-error.hbs
    ├── signup-view.hbs
    ├── station-view.hbs
    ├── user-view-error.hbs
    ├── user-view-updated-successfully.hbs
    └── user-view.hbs
```
## Source Attributions
- Icons: https://iconify.design/
- Weather code references: API from https://openweathermap.org/api
- Map reference: https://leafletjs.com/examples/quick-start/

## Authors
- Mari Cruz Lopez: 20108907@gmail.wit.ie
- Student Number: 20108907












