// document.addEventListener("DOMContentLoaded", function() {
//     DisplayGlobalCO2Avg();
//     DisplayWorldAtlasMap();
// });

// function DisplayGlobalCO2Avg() {
//     d3.csv("data/global_average_data.csv").then(data => {
//         // play around with values (unable to fix display)
//         const svg = SVGSetUp(460, 400, 100, 300, 300, 600);
//         const { x, y } = XandYAxesSetUp(svg, data);
//         drawAvgEmissionsGraph(svg, data, x, y);
//     });
// }

// // unable to fix
// function DisplayWorldAtlasMap() {
//     Promise.all([d3.json("data/world_atlas.json"), d3.csv("data/co2_emissions_by_country.csv")]).then(([atlas, emissions]) => {
//         const svg = d3.select("#visualization")
//         .append("svg")
//         .attr("width", 960)
//         .attr("height", 600);
//         const projection = d3.geoMercator().scale(150).translate([480, 300]);
//         const path = d3.geoPath().projection(projection);
//         // still unable to figure out how to merge the topoJSON and emissions csv
//         const emissionsMap = new Map(emissions.map(d => [d.CountryCode, d.emissions]));
//         const colorScale = getColorScale();
//         drawColoredAtlast(svg, atlas, path, colorScale, emissionsMap);
//         initializeLegendAtlas(svg, colorScale);
//         initializeToolTip();
//     });
// }

// function SVGSetUp(width, height, top, right, bottom, left) {
//     return d3.select("#visualization").append("svg")
//         .attr("width", width + left + right)
//         .attr("height", height + top + bottom)
//         .append("g")
//         .attr("transform", `translate(${left}, ${top})`);
// }

// function XandYAxesSetUp(svg, data) {
//     const x = d3.scaleLinear()
//         .domain(d3.extent(data, d => d.year))
//         .range([0, svg.attr("width")]);
//     svg.append("g")
//         .attr("transform", `translate(0,${svg.attr("height")})`)
//         .call(d3.axisBottom(x));

//     const y = d3.scaleLinear()
//         .domain([0, d3.max(data, d => +d.value)])
//         .range([svg.attr("height"), 0]);
//     svg.append("g").call(d3.axisLeft(y));

//     return { x, y };
// }

// function drawAvgEmissionsGraph(svg, data, x, y) {
//     svg.append("path")
//         .datum(data)
//         .attr("fill", "none")
//         .attr("stroke", "steelblue")
//         .attr("stroke-width", 1.5)
//         .attr("d", d3.line()
//             .x(d => x(d.year))
//             .y(d => y(d.value))
//         );
// }

// function getColorScale() {
//     return d3.scaleThreshold()
//         .domain([0.5, 2, 5, 10, 20, 30])
//         .range(d3.schemeBlues[7]);
// }

// function drawColoredAtlast(svg, world, path, colorScale, emissionsMap) {
//     svg.selectAll("path")
//         .data(topojson.feature(world, world.objects.countries).features)
//         .enter().append("path")
//             .attr("fill", d => colorScale(emissionsMap.get(d.id)))
//             .attr("d", path)
//             .on("mouseover", (event, d) => showTooltip(d, emissionsMap, event))
//             .on("mouseout", hideTooltip);
// }

// function showTooltip(d, emissionsMap, event) {
//     const emissionsValue = emissionsMap.get(d.id) || "No data";
//     d3.select("#tooltip")
//         .style("left", `${event.pageX}px`)
//         .style("top", `${event.pageY}px`)
//         .style("display", "inline-block")
//         .html(`Country: ${d.properties.name}<br>Emissions: ${emissionsValue} tons per capita`);
// }

// function hideTooltip() {
//     d3.select("#tooltip").style("display", "none");
// }

// function initializeLegendAtlas(svg, colorScale) {
//     const legend = svg.append("g")
//         .attr("id", "legend")
//         .attr("transform", "translate(10,500)");

//     const x = d3.scaleLinear()
//         .domain([0, 30])
//         .range([0, 300]);

//     legend.selectAll("rect")
//         .data(colorScale.range().map(color => {
//             const d = colorScale.invertExtent(color);
//             if (d[0] == null) d[0] = x.domain()[0];
//             if (d[1] == null) d[1] = x.domain()[1];
//             return d;
//         }))
//         .enter().append("rect")
//             .attr("height", 8)
//             .attr("x", d => x(d[0]))
//             .attr("width", d => x(d[1]) - x(d[0]))
//             .attr("fill", d => colorScale(d[0]));

//     legend.append("g")
//         .call(d3.axisBottom(x)
//             .tickSize(13)
//             .tickFormat(x => Math.round(x) + " tons")
//             .tickValues(colorScale.domain()))
//         .select(".domain").remove();
// }

// function initializeToolTip() {
//     d3.select("body").append("div")
//         .attr("id", "tooltip")
//         .attr("class", "tooltip")
//         .style("display", "none");
// }

document.addEventListener("DOMContentLoaded", function() {
    d3.csv("path_to_your_data.csv", function(data) {
        console.log(data);
        
        const svg = d3.select("#visualization").append("svg")
            .attr("width", 8000)
            .attr("height", 6000);

        d3.csv("data/global_average_data.csv").then(function(data) {
            const margin = {top: 100, right: 300, bottom: 300, left: 600},
                width = 460 - margin.left - margin.right,
                height = 400 - margin.top - margin.bottom;
            const svg = d3.select("#visualization")
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");
            const x = d3.scaleLinear()
            .domain(d3.extent(data, function(d) { return d.year; }))
            .range([ 0, width ]);
            svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

            const y = d3.scaleLinear()
            .domain([0, d3.max(data, function(d) { return +d.value; })])
            .range([ height, 0 ]);
            svg.append("g")
            .call(d3.axisLeft(y));

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
    });


    Promise.all([
        d3.json("data/world_atlas.json"),
        d3.csv("data/co2_emissions_by_country.csv")
    ]).then(function([world, emissions]) {
        const emissionsMap = new Map(emissions.map(d => [d.countryCode, +d.emissions]));

        const svg = d3.select("#visualization").append("svg")
            .attr("width", 960)
            .attr("height", 600);

        const projection = d3.geoMercator()
            .scale(150)
            .translate([480, 300]);

        const path = d3.geoPath()
            .projection(projection);

        const colorScale = d3.scaleThreshold()
            .domain([0.5, 2, 5, 10, 20, 30])
            .range(d3.schemeBlues[7]);

        svg.selectAll("path")
            .data(topojson.feature(world, world.objects.countries).features)
            .enter().append("path")
                .attr("fill", d => colorScale(emissionsMap.get(d.id)))
                .attr("d", path)
                .on("mouseover", (event, d) => {
                    const emissionsValue = emissionsMap.get(d.id) || "No data";
                    d3.select("#tooltip")
                        .style("left", event.pageX + "px")
                        .style("top", event.pageY + "px")
                        .style("display", "inline-block")
                        .html(`Country: ${d.properties.name}<br>Emissions: ${emissionsValue} tons per capita`);
                })
                .on("mouseout", () => {
                    d3.select("#tooltip").style("display", "none");
                });

        const x = d3.scaleLinear()
            .domain([0, 30])
            .range([0, 300]);

        const legend = svg.append("g")
            .attr("id", "legend")
            .attr("transform", "translate(10,500)");

        legend.selectAll("rect")
            .data(colorScale.range().map(color => {
                const d = colorScale.invertExtent(color);
                if (d[0] == null) d[0] = x.domain()[0];
                if (d[1] == null) d[1] = x.domain()[1];
                return d;
            }))
            .enter().append("rect")
                .attr("height", 8)
                .attr("x", d => x(d[0]))
                .attr("width", d => x(d[1]) - x(d[0]))
                .attr("fill", d => colorScale(d[0]));
        legend.append("g")
            .call(d3.axisBottom(x)
                .tickSize(13)
                .tickFormat(x => Math.round(x) + " tons")
                .tickValues(colorScale.domain()))
            .select(".domain")
            .remove();

        d3.select("body").append("div")
            .attr("id", "tooltip")
            .style("position", "absolute")
            .style("text-align", "center")
            .style("width", "120px")
            .style("height", "50px")
            .style("padding", "2px")
            .style("font", "12px sans-serif")
            .style("background", "lightsteelblue")
            .style("border", "0px")
            .style("border-radius", "8px")
            .style("pointer-events", "none")
            .style("opacity", 0.9)
            .style("display", "none");
    });
});