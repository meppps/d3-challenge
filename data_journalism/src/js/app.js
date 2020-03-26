// @TODO: YOUR CODE HERE!

d3.csv('./data_journalism/src/data/data.csv').then((data)=>{
    console.log(data);

    var smokes = data.map(d => Number(d.smokes));
    var age = data.map(d => Number(d.age));
    var states = data.map(d => d.state);
    var abbrs = data.map(d => d.abbr);


    var svgWidth = 960;
    var svgHeight = 500;

    var margin = {
        top: -10,
        right: -430,
        bottom: 100,
        left: 130
    };

    var chartHeight = svgHeight - margin.top - margin.bottom; //
    var chartWidth = svgHeight - margin.left - margin.right; //


    var svg = d3
    .select("#svg-area")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

    var chartGroup = svg.append("g")
    .attr('transform',`translate(${margin.left},${margin.top})`) //



    
    // scales
    var yScale = d3.scaleLinear()
    .domain([d3.min(age), d3.max(age)])
    .range([chartHeight, d3.min(age)]) //
    .nice();  

    var xScale = d3.scaleLinear()
    .domain([d3.min(smokes),d3.max(smokes)]) // try extent?
    .range([d3.min(smokes),chartWidth])
    .nice(); // chart svg w



    // axes
    var yAxis = d3.axisLeft(yScale);
    var xAxis = d3.axisBottom(xScale);

    chartGroup.append('g')
    .call(yAxis);

    chartGroup.append('g')
    .call(xAxis)
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(xAxis);


    var circlesGroup = chartGroup.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx',function(d){return xScale(Number(d.smokes))})
    .attr('cy',function(d){return yScale(Number(d.age))})
    .attr('r', 13)
    .attr('opacity',.6)
    .style('fill','red');


    // add text to circles
    var textGroup = chartGroup.append('g')
    .selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .attr('x',d=> xScale(d.smokes))
    .attr('y',d=> yScale(d.age))
    .text(d => d.abbr)
    .attr("font-size", "13px")
    .attr("stroke", "#333")
    .attr("text-anchor", "middle")
    .attr("fill", "#333")
    .attr('margin-top','10px');



    // Add axes labels
    var xText = svg.append('text')
    .text("Smokes(%)")
    .attr('transform','translate(450, 465)')
    .attr('font-size','40px');
    
    var yText = svg.append('text')
    .text('Age')
    .attr('transform','translate(10,220)')
    .attr('font-size','40px');


    // Tool Tip
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .attr('backgroun','black')
      .offset([0, -20])
      .html(function(d) {
        return (`State: ${d.state}<br>Smokes: ${d.smokes}%<br>Median Age: ${d.age}`);
      });

    chartGroup.call(toolTip);

    circlesGroup.on('click',(data)=>{
        toolTip.show(data, this);
    });


    




});