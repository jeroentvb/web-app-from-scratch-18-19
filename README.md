# Web app from scratch
This repo contains a web app built from scratch.
You can view the web-app [here](https://jeroenvanberkum.nl/web-app-from-scratch-18-19/).

## Table of contents
* [Installation](#installation)
* [Usage](#usage)

## Installation
Run the following commands in terminal
```
git clone https://github.com/jeroentvb/web-app-from-scratch-18-19.git
cd web-app-from-scratch-18-19
```

## Usage
Open the [index.html](index.html) file in your browser of choice to view the web app.

## What it does
This web app talks with NASA's [Mars Rover Photos API](https://api.nasa.gov/api.html#MarsPhotos). On the client side, it pulls data about the photos (including links to the pictures) from the API and renders them on the page.

### Sol
On Mars, the days aren't the same length as the days on Earth. Because of this, there's a different day counting system on Mars: Sol.  
Images from the Mars Rover can be requested from the API by Earth date, or by Sol. I chose to use Sol, and built an input field to select the Sol date to display all images from. 
