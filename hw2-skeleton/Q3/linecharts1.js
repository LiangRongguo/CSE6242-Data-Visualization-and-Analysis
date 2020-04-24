// PART a

// 2. Use the margin convention practice
var margin = {
    top: 100, 
    right: 100, 
    bottom: 100, 
    left: 100
};

var width = 900 // Use the window's width
var height = 400; // Use the window's height

// Set the color scheme
var colors = {
    '5_5.9': '#FFC300',
    '6_6.9': '#FF5733',
    '7_7.9': '#C70039', 
    '8.0+':  '#900C3F',
};

// append the svg object to the body of the page
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.dsv(",", "earthquakes.csv", function(d) {
    return {
        year: d3.timeParse("%Y")(d.year),
        value1: +d["5_5.9"],
        value2: +d["6_6.9"],
        value3: +d["7_7.9"],
        value4: +d["8.0+"],
    };})
    .then(function(data) {
    var scaleYear = d3.scaleTime().domain([
        d3.min(data, function(d){ 
            return d.year
        }), 
        d3.max(data, function(d){
            return d.year
        })
    ]).range([0, width]);

    console.log(data);

    var yScale = d3
        .scaleLinear()
        .domain([0, 2500])
        .range([height, 0]);
    
    var xScale = d3
        .scaleTime()
        .domain([new Date("2000"),new Date("2015")])
        .range([ 0, width ]);
    
    svg.append("g")
        .attr("class", "axis") 
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));

    var yAxis = d3
        .axisLeft()
        .scale(yScale)
        .ticks(10);
    
    svg.append("g")
        .attr("class", "axis") 
        .call(yAxis);

    var line1 = d3.line()
        .x(function(d) { 
            return scaleYear(d.year)
        }) 
        .y(function(d) {
            return yScale(d.value1)
        }) 
        .curve(d3.curveMonotoneX) 
    
    svg.append("path")
        .datum(data) 
        .style("stroke", colors['5_5.9'])
        .attr("class", "line") 
        .attr("d", line1); 

    var line2 = d3.line()
        .x(function(d) { 
            return scaleYear(d.year)
        }) 
        .y(function(d) {
            return yScale(d.value2)
        }) 
        .curve(d3.curveMonotoneX) 
    
    svg.append("path")
        .datum(data) 
        .style("stroke", colors['6_6.9'])
        .attr("class", "line") 
        .attr("d", line2); 

    var line3 = d3.line()
        .x(function(d) { 
            return scaleYear(d.year)
        }) 
        .y(function(d) {
            return yScale(d.value3)
        }) 
        .curve(d3.curveMonotoneX)

    svg.append("path")
        .datum(data) 
        .style("stroke", colors['7_7.9'])
        .attr("class", "line") 
        .attr("d", line3);

    var line4 = d3.line()
        .x(function(d) {
            return scaleYear(d.year)
        }) 
        .y(function(d) {
            return yScale(d.value4)
        }) 
        .curve(d3.curveMonotoneX)

    svg.append("path")
        .datum(data) 
        .style("stroke", colors['8.0+'])
        .attr("class", "line") 
        .attr("d", line4);

    svg.append("text")
        .attr("transform", "translate(" + (width/2) + "," + (height + 50) + ")")
        .style("text-anchor", "middle")
        .style("font-weight", "bold")
        .text("Year");

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height/2))
        .attr("dy", 50)
        .style("text-anchor" , "middle")
        .style("font-weight", "bold")
        .text("Number of Earthquakes");

    svg.append("text")
        .attr("x", (width/2))
        .attr("y", 0 - (margin.top /2 ))
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .style("font-weight", "bold")
        .text("Earthquake Statistics for 2000-2015");

    var legend_text = ['5_5.9', '6_6.9', '7_7.9', '8.0+'];

    var legend = svg.append("g")
        .attr("class", "legend")
        .attr("height", 150)
        .attr("width", 100) 

    legend.selectAll('rect').data(legend_text).enter()
        .append("rect")
        .attr("x", width + 10)
        .attr("y", function(d, i){ return i*25;})
        .attr("width", 30)
        .attr("height", 20)
        .style("fill", function(d) { 
            var color = colors[d];
            return color;
        })
                  
    legend.selectAll('text')
        .data(legend_text)
        .enter()
        .append("text")
        .style("font-size", "15px")
        .attr("x", width + 45)
        .attr("y", function(d, i){ return i*25 + 15;})
        .text(function(d) {
            var text = d;
            return text;
    });
});
