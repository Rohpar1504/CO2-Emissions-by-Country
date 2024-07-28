// script.js

document.addEventListener("DOMContentLoaded", function() {
    // Load your data
    d3.csv("data/co2_emissions_by_country.csv", function(data) {
        // Process data and create visualizations
        console.log(data);
        // Example: Create a simple bar chart
        const svg = d3.select("#visualization").append("svg")
            .attr("width", 800)
            .attr("height", 600);

        // Further D3.js visualization code goes here

        // Global Overview Visualization

        d3.csv("data/global_average_data.csv", function(d) {
            return { year : d3.parseTime(d.year), value : +d.value }
        }).then(function(data) {
            // Define dimensions and margins
            const margin = {top: 20, right: 20, bottom: 30, left: 50},
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            // Define scales
            const x = d3.scaleTime()
                .domain(d3.extent(data, d => d.year))
                .range([0, width]);

            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.value)])
                .range([height, 0]);

            // Create SVG element
            const svg = d3.select("#visualization").append("svg")
                .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

            // Add X and Y axes
            svg.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x));

            svg.append("g")
                .call(d3.axisLeft(y));

            // Add the line
            svg.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 2)
                .attr("d", d3.line()
                    .x(d => x(d.year))
                    .y(d => y(d.value))
                );

            // Optionally, add area fill under the line
            svg.append("path")
                .datum(data)
                .attr("fill", "steelblue")
                .attr("opacity", 0.3)
                .attr("d", d3.area()
                    .x(d => x(d.year))
                    .y0(height)
                    .y1(d => y(d.value))
                );
        });
    });
});

