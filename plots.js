// Load data and appends ID numbers to dropdownmenu
function init() {
  var selector = d3.select("#selDataset");

  d3.json("samples.json").then((data) => {
    console.log(data);
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

  });

  buildMetadata('940');
  buildCharts('940');

};

init();

// When ID picked, build information panel and charts
function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
  };

// Create buildMetadata()
function buildMetadata(sample){
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];
        var PANEL = d3.select("#sample-metadata");

        PANEL.html("");

        // Object.entries(result).forEach(([key, value]) =>
        // {PANEL.append("h6").text(key + ': ' + value);});
        // <h6>Key: value</h6>
        // <h6><span>Key: </span><span>value</span></h6>

        Object.entries(result).forEach(([key, value]) =>
        {
          var h6 = PANEL.append("h6");
          h6.append('span').text(key + ': ');
          h6.append('span').text(value);

        });
        
    });
};

// Create buildCharts()
function buildCharts(sample){

  d3.json("samples.json").then((data) => {

    var sampleData = data.samples;
    var resultArray= sampleData.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    console.log(result);

    var sampleValues = result.sample_values;
    console.log(sampleValues);

    var otuIds = result.otu_ids;
    console.log(otuIds);

    var otuLabels = result.otu_labels;

    var metadata = data.metadata;
    var washMetadata = metadata.filter(washObj => washObj.id == sample);
    var wFreq = washMetadata[0].wfreq;
    console.log(wFreq);

    // Create bar chart
    var trace = [{

      x: sampleValues.slice(0,10).reverse(),
      y: otuIds.map(otu_ids => `OUT ${otu_ids}`).slice(0,10).reverse(),
      text: otuLabels,
      type: 'bar',
      orientation: 'h'
    }];

    var layout = {
      title: 'Top Ten Bacterial Species (OTUs)'
    };

    Plotly.newPlot('bar', trace, layout);
    
    // Create Bubble chart
    var trace1 = {
      x: otuIds,
      y: sampleValues,
      text: otuLabels,
      mode: 'markers',
      marker: {
        color: otuIds,
        colorscale: 'Earth',
        size: sampleValues
      }
    };
    
    var data = [trace1];
    
    var layout = {
      title: 'All Bacterial Species (OTUs)',
      showlegend: false,
      height: 600,
      width: 1200
    };
    
    Plotly.newPlot('bubble', data, layout);

    // Create gauge
    // In reference to: https://com2m.de/blog/technology/gauge-charts-with-plotly/
    
    // Enter wash frequency as per select ID
    var level = wFreq * 20;

    // Trig to calc meter point
    var degrees = 180 - level,
        radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);
    var path1 = (degrees < 45 || degrees > 135) ? 'M -0.0 -0.025 L 0.0 0.025 L ' : 'M -0.025 -0.0 L 0.025 0.0 L ';
    
    // Path: may have to change to create a better triangle
    var mainPath = path1,
        pathX = String(x),
        space = ' ',
        pathY = String(y),
        pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);

    var data = [{ type: 'scatter',
      x: [0], y:[0],
        marker: {size: 24, color:'850000'},
        showlegend: false,
        name:'times per week',
        text: wFreq,
        hoverinfo: 'text+name'},
      { values: [50/9,50/9,50/9,50/9,50/9,50/9,50/9,50/9,50/9,50],
      rotation: 90,
      text: ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9', ''],
      textinfo: 'text',
      textposition:'inside',
      direction: 'clockwise',
      marker: {
        colors:['#f7f1eb', 
                '#f3efe3',
                '#e7e5c7', 
                '#e3e7af',
                '#d3e393',
                '#b5cb89', 
                '#85bf7e', 
                '#83bb89', 
                '#7eb385',
                '#ffffff']                   
      },
      
      labels: ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9', ''],
      hoverinfo: 'label',
      hole: .5,
      type: 'pie',
      showlegend: false
    }];

    var layout = {
      title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week", font: { size: 20 } },
      shapes:[{
          type: 'path',
          path: path,
          fillcolor: '850000',
          line: {
            color: '850000'
          }
        }],
      height: 500,
      width: 500,
      xaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]},
      yaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]}
    };
    
    Plotly.newPlot('gauge', data, layout);

  });

};

