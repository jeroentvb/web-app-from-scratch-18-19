# Web app from scratch
This repo contains a web app built from scratch.
You can view the web-app [here](https://jeroenvanberkum.nl/web-app-from-scratch-18-19/).

## Table of contents
* [Installation](#installation)
* [Usage](#usage)
* [What it does](#what-it-does)
* [Technical details](#technical-details)

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

## Technical details
On page load it sends 3 requests (one for each Mars Rover) using `fetch`, to get the data for all 3 Rovers for sol 1. It then parses the data and renders it on the page using template literals. Every picutre is rendered within an `<article>`.  
It also adds an event listener to the input field on the top of the page. If a different sol is selected it does the above again for the selected sol.  
If there is no data for a rover for the selected sol it displays that there were no pictures taken by the rover for the selected sol.
