// @TODO: YOUR CODE HERE!

d3.csv('/data_journalism/src/data/data.csv').then((data)=>{
    console.log(data);

    var smokes = data.map(d => Number(d.smokes));
    var age = data.map(d => Number(d.age));
    var states = data.map(d => d.state);
    var abbrs = data.map(d => d.abbr);


    console.log(states)

    // console.log(age)


    var svgWidth = 960;
    var svgHeight = 500;

    var margin = {
        top: 100,
        right: 10,
        bottom: 100,
        left: 50
    };

    var chartHeight = svgHeight - margin.top - margin.bottom; //
    var chartWidth = svgHeight - margin.left - margin.right; //

    // append svg to page
    // console.log(chartHeight,chartWidth)

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
    .attr('r', 10)
    .attr('opacity',.75)
    .style('fill','red');

    // add text to circles
    /* Define the data for the circles */
  




    // Add axes labels
    var xText = svg.append('text').attr('transform','translate(320, 450)').text("Smokes");
    // var yText = svg.append('text').attr('transform','translate(200, 450)').text('Age')
    var yText = svg.append('text').text('Age').attr('transform','translate(20,300)').text('Age');


    // Tool Tip
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .attr('backgroun','black')
      .offset([20, -20])
      .html(function(d) {
        return (`State: ${d.state}<br>Smokes: ${d.smokes}%<br>Median Age: ${d.age}`);
      });

    chartGroup.call(toolTip);

    circlesGroup.on('mouseover',(data)=>{
        toolTip.show(data, this);
    })
    .on('mouseout',(data,index)=>{
        toolTip.hide(data)
    })

    // circlesGroup.on('mouseout',(data,index)=>{
    //     toolTip.hide(data,index)
    // })

    




});