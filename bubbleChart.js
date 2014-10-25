d3.json("file.json", function(error, root){
	
var diameter = 800,
    format = d3.format(",d"),
    color = d3.scale.category20c();

var bubble = d3.layout.pack()
    .sort(null)
    .size([diameter, diameter])
    .padding(1.5);

var svg = d3.select("#bubbleChart").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

d3.json("file.json", function(error, root) {


  var node = svg.selectAll(".node")
      .data(bubble.nodes(classes(root))
      .filter(function(d) { return !d.children; }))
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  node.append("title")
      .text(function(d) { return d.className + ": " + format(d.value); });

  node.append("circle")
      .attr("r", function(d) { return d.r;})
      .style('fill', "#2176C7");

  node.append("text")
      .attr("dy", ".20em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.className.substring(0, d.r / 3) + "  " + d.value; });
});

function classes(root) {
  var classes = [];
  for(var y in root){
	classes.push({className: root[y]['issueName'], value: root[y]['frequency']});
	console.log(root[y]['frequency'] +  " " + root[y]['issueName']);
  }
  return {children: classes};
}

d3.select(self.frameElement).style("height", diameter + "px");
})

