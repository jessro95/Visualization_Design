// Main JavaScript File

// You'll have to wait for you page to load to assign events to the elements created in your index.html file
$(function() {
  

  // read data from file antibiotics_data.csv
   d3.csv('data/antibiotics_data.csv', function(error, data){
    console.log(data);

    // This function could help you format your data: lifted from the Plotly bubble map example:
    function unpack(rows, key) {
      return rows.map(function(row) { return row[key]; });
    }

    //store data into variables
    var bacteria = unpack(data, 'Bacteria ');
    var gram_stain = unpack(data, 'Gram Staining ');
    var neomycin = unpack(data, 'Neomycin');
    var penicilin = unpack(data, 'Penicilin');
    var streptomycin = unpack(data, 'Streptomycin ');
    var antibiotics = ['Penicilin', 'Streptomycin', 'Neomycin'];
    var dat = [];
    
    for(var i = 0; i < neomycin.length; i++){
      dat.push([penicilin[i], streptomycin[i],neomycin[i]]);
    }



    
    //data for visualization 1
    //gradiant colors
    var colorscaleValue = [
      [0, '#ffffff'],        //~.001
      [0.00001, '#ccccff'],  //~.01
      [0.0001, '#99ccff'],   //~.1
      [0.001, '#8abdf0'],    //~1
      [0.01, '#5d90c3'],    //~10
      [.01, '#4e81b4'],    //~100
      [1, '#3e72a5']      //~1000
    ];

    //put data in
    var data_plot = [{
      x: antibiotics,
      y: bacteria,
      z: dat,
      type: 'heatmap',
      uid: "56f1f9", 
      colorscale: colorscaleValue,
      zauto: false,
      showscale: true,
      opacity: .95
    }];

    var layout = {
      annotations: [],
      xaxis: {
        autorange: true, 
        range: [-.5, 5], 
        showgrid: true, 
        side: "top", 
        title: "", 
        type: "category"
      }, 
      yaxis: {
        autorange: true, 
        dtick: 1, 
        range: [-0.5, 30], 
        showgrid: true, 
        tickmode: "linear", 
        title: "", 
        type: "category"
      }
      };


    Plotly.newPlot('visual1', data_plot, layout);//visualization 1

    //visualization 2 scatterplot
    var plot = {
      x: penicilin,
      y: streptomycin,
      mode: 'markers',
      type: 'scatter',
      name: 'Team A',
      text: bacteria,
      marker: { size: 12 }
    };

    data_plot = [plot];

    layout = {
      xaxis: {
        title: 'Pencilin (MIC)',
        range: [ -5, 900 ]
      },
      yaxis: {
        title: 'Streptomycin (MIC)',
        range: [-5, 15]
      },
      title:'Pencilin vs Streptomycin (MIC)'
    };

    Plotly.newPlot('visual2', data_plot, layout);


    //visualization 3 box plot

    var trace_peni = {
      y: penicilin,
      x: gram_stain,
      name: 'Penicilin',
      marker: {color: '#AEC6CF'},
      type: 'box'
    };

    var trace_strept = {
      y: streptomycin,
      x: gram_stain,
      name: 'Streptomycin',
      marker: {color: '#DEA5A4'},
      type: 'box'
    };

    var trace_neom = {
      y: neomycin,
      x: gram_stain,
      name: 'Neomycin',
      maker: {color: '#B39EB5'},
      type: 'box'
    };

    data_plot = [trace_peni, trace_strept, trace_neom];

    layout = {
      yaxis: {
        title: 'Minimum Inhibitory Concentration'
      },
      xaxis:{
        title:'Gram Staining Test Result'
      },
      boxmode: 'group'
    };

    Plotly.newPlot('visual3', data_plot, layout);

  })
  
});
