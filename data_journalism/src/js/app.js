// @TODO: YOUR CODE HERE!

d3.csv('src/data/data.csv').then((data)=>{
    console.log(data);

    var smokes = data.map(d => Number(d.smokes));
    var age = data.map(d => Number(d.age));

    // console.log(age)

    var svgWidth = 960;
    var svgHeight = 500;

    var margin = {
        top: 50,
        right: 30,
        bottom: 100,
        left: 100
    };

    // var chartHeight = svgHeight = margin.top - margin.bottom; //
    // var chartWidth = svgHeight = margin.left - margin.right; //

    // append svg to page

    var svg = d3
    .select("#svg-area")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

    var chartGroup = svg.append("g")
    // .attr('transform',`translate(${margin.left},${margin.top})`) //

    // add x axis

    var yScale = d3.scaleLinear()
    .domain([0, d3.max(age)])
    .range([svgHeight, 0]) //
    .nice();  

    var xScale = d3.scaleLinear()
    .domain([0,d3.max(smokes)]) // try extent?
    .range([0,svgWidth])
    .nice(); // chart svg w

    
    var yAxis = d3.axisLeft(yScale);
    var xAxis = d3.axisBottom(xScale);

    chartGroup.append('g')
    .call(yAxis);

    chartGroup.append('g')
    .call(xAxis)

    chartGroup.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx',function(d){return xScale(Number(d.smokes))})
    .attr('cy',function(d){return yScale(Number(d.age))})
    .attr('r',5)
    .style('fill','red')


});