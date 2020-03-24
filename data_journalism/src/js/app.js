// @TODO: YOUR CODE HERE!

d3.csv('src/data/data.csv').then((data)=>{
    console.log(data);

    var smokes = data.map(d => Number(d.smokes));
    var age = data.map(d => Number(d.age));

    // console.log(age)

    var svgWidth = 960;
    var svgHeight = 500;

    var svg = d3
    .select("body")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

    var chartGroup = svg.append("g");

    var yScale = d3.scaleLinear()
    .domain([0, d3.max(age)])
    .range([svgHeight, 0]);

    var xScale = d3.scaleLinear()
    .domain([0,d3.max(smokes)])
    .range([0,svgWidth]);

    
    var yAxis = d3.axisLeft(yScale);
    var xAxis = d3.axisBottom(xScale);

    chartGroup.append('g')
    .call(yAxis);

    chartGroup.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx',function(d){return xScale(Number(d.smokes))})
    .attr('cy',function(d){return yScale(Number(d.age))})
    .attr('r',5)
    .style('fill','red')


});