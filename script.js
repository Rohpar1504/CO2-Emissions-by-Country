document.addEventListener("DOMContentLoaded", function() {
    // Load your data
    d3.csv("path_to_your_data.csv", function(data) {
        // Process data and create visualizations
        console.log(data);
        // Example: Create a simple bar chart
        const svg = d3.select("#visualization").append("svg")
            .attr("width", 800)
            .attr("height", 600);

        // Further D3.js visualization code goes here
    });
});

// Global Overview Visualization

d3.csv("data/global_average_data.csv").then(function(data) {
    // Set the dimensions and margins of the graph
    const margin = {top: 10, right: 30, bottom: 30, left: 60},
          width = 460 - margin.left - margin.right,
          height = 400 - margin.top - margin.bottom;

    // Append the svg object to the body of the page
    const svg = d3.select("#visualization")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis --> it is a date format
    const x = d3.scaleLinear()
      .domain(d3.extent(data, function(d) { return d.year; }))
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.value; })])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Add the line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.year) })
        .y(function(d) { return y(d.value) })
      )
});

// // Interactive Maps Visualization

// // Load and display the World Atlas TopoJSON
// d3.json("path_to_world_atlas.json").then(function(topojsonData) {
//     // Load your regional emissions data
//     d3.csv("path_to_regional_data.csv").then(function(emissionsData) {
//         // Prepare the data — join topojson data with emissions data

//         // Setup projection and path generator
//         const projection = d3.geoMercator().scale(150).translate([width / 2, height / 1.5]);
//         const path = d3.geoPath().projection(projection);

//         // Draw each country
//         svg.selectAll("path")
//           .data(topojson.feature(topojsonData, topojsonData.objects.countries).features)
//           .enter().append("path")
//             .attr("d", path)
//             .attr("fill", function(d) { /* Set fill based on emissions data */ });

//         // Add interactivity
//         svg.selectAll("path")
//           .on("click", function(event, d) {
//             // Function to update the visualization with the selected region's data
//           });
//     });
// });
