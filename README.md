# Belly Button Biodiversity

Partnered with Improbable Beef, a food startup, we are tasked to research baterial species that synthesize proteins that taste like beef. With our group of volunteers, we identify whether that species is found in quantity in their belly buttons and create the following for each volunteer:

1. Create a dashboard that has a completed panel for demographic information.
2. Create a bar chart of the top ten bacterial species in the volunteer's navel.
3. Create a bubble chart to visualize the relative frequency of all the bacterial species found.
4. Create a gauge chart to plot the weekly washing frequency of the individual.
5. Deploy our app to a free static page hosting service, such as GitHub Pages.

## Resources

- Data Source: samples.json
- Software: Visual Studio Code 1.43.0, HTML, CSS, Bootstrap, JavaScript
- Libraries: D3.js, Plotly.js

## Summary

![](https://github.com/Helen-Ly/Belly_Button_Biodiversity/blob/master/Webpage_Top.png)

As we see in the initial load of the webpage, information for *'ID: 940'* has been pre-loaded. Anyone on the webpage, such as one of our volunteers, can look up their ID and the charts will display their information, such as the top ten bacterial species in their belly button. We also added a small touch by putting a favicon for the webpage.

![](https://github.com/Helen-Ly/Belly_Button_Biodiversity/blob/master/Webpage_Bottom.png)

Aside from the top ten chart, demographic information and the gauge, we have included a bubble chart displaying all bacterial species found in the volunteer's navel. Finally, once all files have been uploaded to this repository, we navigated to the settings and deployed this project with GitHub Pages. You can take a look at the page with the following link:
https://helen-ly.github.io/Belly_Button_Biodiversity/.

## Usage

**Note:** Please ensure you have all the required and updated softwares on your computer.

1. Download the following files into the same folder for the project.
    
    - plots.js
    - index.html
    - style.css
    - samples.json

2. Open Visual Studio Code from your projects folder.

3. If you would like to run the webpage without deploying it, it will display a CORS error unless you run a local server. In your terminal or Git Bash, navigate to your folder and type the following:

    - python -m http.server

4. This will run the files and provide you with a URL. Copy and paste it into your browser.

5. If you would like to change the favicon, you can create the icon from any favicon generator and add the files into your folder. The link I used is the following: https://favicon.io/favicon-generator/.
