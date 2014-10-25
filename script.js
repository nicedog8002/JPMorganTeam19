d3.json("file.json", function(error, json){

var currentBranch = 0;
var   w = 250,
      h = 250;
var circleWidth = 12;
var tooltip = d3.select('#tree').append('div')
        .style('position', 'absolute')
        .style('padding', '0 15px')
        .style('background', 'pink')    
		.style('font-weight', 'bold');

var question = d3.select("#question-content").append('tspan');
var answer = d3.select("#answer-content").append('tspan');
var image = d3.select("#image-content").append('tspan');

var palette = {
      "lightgray": "#819090",
      "gray": "#708284",
      "mediumgray": "#536870",
      "darkgray": "#475B62",
      "darkblue": "#0A2933",
      "darkerblue": "#042029",
      "paleryellow": "#FCF4DC",
      "paleyellow": "#EAE3CB",
      "yellow": "#A57706",
      "orange": "#BD3613",
      "red": "#D11C24",
      "pink": "#C61C6F",
      "purple": "#595AB7",
      "blue": "#2176C7",
      "green": "#259286",
      "yellowgreen": "#738A05"
  }
var nodes = [];
nodes = setNodeData(json.branch[currentBranch]);
function setNodeData(branch){
	console.log(branch);
var nodes = [
      { name: "1st Parent ", questionID: branch[0]},
      { name: "2nd Parent ", target: [0], questionID: "Next Branch"},
      { name: "2nd Tier", target: [0], questionID: branch[1]},
      { name: "2nd Tier", target: [0], questionID: branch[2]},
      { name: "3rd Tier", target: [2], questionID: branch[3]},
      { name: "3rd Tier", target: [2], questionID: branch[4]},
      { name: "3rd Tier", target: [3], questionID: branch[5]},
      { name: "3rd Tier", target: [3], questionID: branch[6]},
      { name: "4th Tier", target: [4], questionID: branch[7]},
      { name: "4th Tier", target: [4], questionID: branch[8]},
      { name: "4th Tier", target: [5], questionID: branch[9]},
      { name: "4th Tier", target: [5], questionID: branch[10]},
      { name: "4th Tier", target: [6], questionID: branch[11]},
      { name: "4th Tier", target: [6], questionID: branch[12]},
      { name: "4th Tier", target: [7], questionID: branch[13]},
      { name: "4th Tier", target: [7], questionID: branch[14]}
];
	return nodes;
}
var nextB = d3.select('#next-branch');

nextB.on('click', function(){
	currentBranch++;
	nodes = setNodeData(json.branch[currentBranch]);
	node.data(nodes).update();
	//debugger;
});

var links = [];

for (var i = 0; i< nodes.length; i++) {
      if (nodes[i].target !== undefined) {
            for (var x = 0; x< nodes[i].target.length; x++ ) {
                  links.push({
                        source: nodes[i],
                        target: nodes[nodes[i].target[x]]
                  })
            }
			//debugger;
      }
}

var myTree = d3.select('#tree')
		.append('svg')
		.attr('width', w)
		.attr('height', h)

var force = d3.layout.force()
	.size([w, h])
	.nodes(nodes)
	.links([])

var link = myTree.selectAll('line')
	.data(links).enter().append('line')
	.attr('stroke', palette.gray)

var node = myTree.selectAll('circle')
	.data(nodes).enter()
	.append('g');

node.append('circle')
	.attr('cx', function(d, i) { 
        return d.x;
        })
	.attr('cy', function(d, i) {
        return d.y;
        })
	.attr('r', circleWidth )
	.attr('fill', function(d, i) {
        if (i <= 1) { return palette.blue}
        else if (i == 2 || i == 3) {return palette.green}
        else if (i >= 4 && i < 8) { return palette.red}
        else { return palette.yellow}
	})



var tempColor;
console.log(nodes);
force.on('tick', function(e) {
	node
	.attr('transform', function(d, i) {
        d.fixed = true;
        if (i == 0) d.x = 250;
        if (i == 1) d.x = 375;

        if (i == 2)  d.x = 150;
        if (i == 3)  d.x = 350;
        
        if (i == 4)  d.x = 100;
        if (i == 5)  d.x = 200;
        if (i == 6)  d.x = 300;
        if (i == 7)  d.x = 400;
        
        if (i == 8)  d.x = 75;
        if (i == 9)  d.x = 125;
        if (i == 10)  d.x = 175;
        if (i == 11)  d.x = 225;
        if (i == 12)  d.x = 275;
        if (i == 13)  d.x = 325;
        if (i == 14)  d.x = 375;
        if (i == 15)  d.x = 425;
        
        if (i == 0)  d.y = 100;
        if (i == 1)  d.y = 100;
        
        if (i == 2)  d.y = 200;
        if (i == 3)  d.y = 200;
        
        if (i == 4)  d.y = 300;
        if (i == 5)  d.y = 300;
        if (i == 6)  d.y = 300;
        if (i == 7)  d.y = 300;
        
        if (i == 8)  d.y = 400;
        if (i == 9)  d.y = 400;
        if (i == 10)  d.y = 400;
        if (i == 11)  d.y = 400;
        if (i == 12)  d.y = 400;
        if (i == 13)  d.y = 400;
        if (i == 14)  d.y = 400;
        if (i == 15)  d.y = 400;
		d.y = d.y/2;
		d.x = d.x/2;
		return 'translate('+ d.x +', '+ d.y +')';
	})
	.on('mouseover', function(d){
		//debugger;
		//d.circle.r = circleWidth * 2
		d3.select(this).select("circle").attr('r', circleWidth*3 )
		tooltip.transition()
            .style('opacity', 0.9)
		tempColor = this.style.fill;
		d3.select(this)
            .style('opacity', .5)
            .style('fill', palette.green)
        console.log(d.questionID);
		tooltip.html(json.question[d.questionID].concept_name);
		//console.log(json.question[d.questionID].question);
		answer.html(function(){return json.question[d.questionID].answers});
		image.html(function(){return json.question[d.questionID].image_id});
		question.html(function(){return json.question[d.questionID].question});
	})
	.on('mouseout', function(d) {
		d3.select(this).select("circle").attr('r', circleWidth )
        d3.select(this)
            .style('opacity', 1)
            .style('fill', tempColor)
    })
	link
		.attr('x1', function(d) { return d.source.x })
		.attr('y1', function(d) { return d.source.y })
		.attr('x2', function(d) { return d.target.x })
		.attr('y2', function(d) { return d.target.y })
})

var nextQ = d3.select("#next-question");

nextQ.on('click', function() {
	d3.select("#next-question").text('ok');
	//debugger;
})


force.start();
})

