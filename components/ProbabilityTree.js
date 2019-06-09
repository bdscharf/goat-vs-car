const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');

const size = 300;

class ProbabilityTree extends D3Component {
 initialize(node, props) {
  var treeData =
  {
    "name": "Door 1",
    "children": [
      { 
        "name": "Door 1",
        "link": "1/3",
        "children": [
          { 
            "name": "Door 2",
            "link": "1/2",
            "children": [
              {
                "name": "Car"
              },
              {
                "name": "Goat"
              }
            ] 
          },
          { 
            "name": "Door 3",
            "link": "1/2",
            "children": [
              {
                "name": "Car"
              },
              {
                "name": "Goat"
              }
            ] 
          }
       ]
      },
      { "name": "Door 2",
        "link": "1/3",
        "children": [
          { 
            "name": "Door 3",
            "link": "1",
            "children": [
              {
                "name": "Car"
              },
              {
                "name": "Goat"
              }
            ] 
          }
        ] 
      },
      { "name": "Door 3",
       "link": "1/3",
        "children": [
          { 
            "name": "Door 2",
            "link": "1",
            "children": [
              {
                "name": "Car"
              },
              {
                "name": "Goat"
              }
            ] 
          }
        ] 
      },
    ]
  };

  var levelData = 
  {
    "first": "Your Door",
    "second": "Car Location",
    "third": "Monty Opens",
    "fourth": "Outcome"
  }

// Set the dimensions and margins of the diagram
var margin = {top: 20, right: 70, bottom: 20, left: 70},
    width = 850 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select(node).append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate("
          + margin.left + "," + margin.top + ")");

var i = 0,
    duration = 750,
    root;

 // var diagonal = d3.linkHorizontal().x(function (d) {
 //      console.log
 //        return d.y;
 //      }).y(function (d) {
 //        return d.x;
 //      });

// declares a tree layout and assigns the size
var treemap = d3.tree().size([height, width]);

// Assigns parent, children, height, depth
root = d3.hierarchy(treeData, function(d) { return d.children; });
root.x0 = height / 2;
root.y0 = 0;

// Collapse after the second level
root.children.forEach(collapse);

update(root);

// Collapse the node and all it's children
function collapse(d) {
  if(d.children) {
    d._children = d.children
    d._children.forEach(collapse)
    d.children = null
  }
}

function update(source) {

  // Assigns the x and y position for the nodes
  var treeData = treemap(root);

  // Compute the new tree layout.
  var nodes = treeData.descendants(),
      links = treeData.descendants().slice(1);

  // Normalize for fixed-depth.
  nodes.forEach(function(d){ d.y = d.depth * 180});

  // Showing the labels for the level of depths.
  let _ = require('underscore')
  var depthHash = _.uniq(_.pluck(nodes, "depth")).sort();
  svg.selectAll("g.levels-svg").remove();
  var levelSVG = svg.append("g").attr("class", "levels-svg");
  var levels =  levelSVG.selectAll("g.level");
  levels.data(depthHash)
    .enter().append("g")
    .attr("class", "level")
    .attr("transform", function(d) { return "translate(" + (d*185-50) + "," + 0 + ")"; })
    .append("text")
    .text(function(d){
      if (d == 0) {return levelData.first}
      if (d == 1) {return levelData.second}
      if (d == 2) {return levelData.third}
      else {return levelData.fourth}
    });

  // ****************** Nodes section ***************************

  // Update the nodes...
  var node = svg.selectAll('g.node')
      .data(nodes, function(d) {return d.id || (d.id = ++i); });

  // Enter any new modes at the parent's previous position.
  var nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr("transform", function(d) {
        return "translate(" + source.y0 + "," + source.x0 + ")";
    })
    .on('click', click);

  // Add Circle for the nodes
  nodeEnter.append('circle')
      .attr('class', 'node')
      .attr('r', 1e-6)
      .style("fill", function(d) {
          return d._children ? "lightsteelblue" : "#fff";
      });

  // Add labels for the nodes
  nodeEnter.append('text')
      .attr("dy", "-1em")
      .attr("x", function(d) {
          return d.children || d._children ? 15 : -10;
      })
      .attr("text-anchor", function(d) {
          return d.children || d._children ? "end" : "start";
      })
      .text(function(d) { return d.data.name; });

  // UPDATE
  var nodeUpdate = nodeEnter.merge(node);

  // Transition to the proper position for the node
  nodeUpdate.transition()
    .duration(duration)
    .attr("transform", function(d) { 
        return "translate(" + d.y + "," + d.x + ")";
     });

  // Update the node attributes and style
  nodeUpdate.select('circle.node')
    .attr('r', 10)
    .style("fill", function(d) {
        return d._children ? "lightsteelblue" : "#fff";
    })
    .attr('cursor', 'pointer');


  // Remove any exiting nodes
  var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) {
          return "translate(" + source.y + "," + source.x + ")";
      })
      .remove();

  // On exit reduce the node circles size to 0
  nodeExit.select('circle')
    .attr('r', 1e-6);

  // On exit reduce the opacity of text labels
  nodeExit.select('text')
    .style('fill-opacity', 1e-6);

  // ****************** links section ***************************

  // Update the links...
  var link = svg.selectAll('path.link')
      .data(links, function(d) { return d.id; });

  // Enter any new links at the parent's previous position.
  var linkEnter = link.enter().insert('path', "g")
      .attr("class", "link")
      .attr('d', function(d){
        var o = {x: source.x0, y: source.y0}
       return diagonal(o, o)
      });

  // UPDATE
  var linkUpdate = linkEnter.merge(link);

  // Transition back to the parent element position
  linkUpdate.transition()
      .duration(duration)
      .attr('d', function(d){ return diagonal(d, d.parent) });


  // Remove any exiting links
  var linkExit = link.exit().transition()
      .duration(duration)
      .attr('d', function(d) {
        var o = {x: source.x, y: source.y}
        return diagonal(o, o)
      })
      .remove();

 // Update the link text
    var linkLabel = svg.selectAll("g.link")
        .data(links, function (d) {
        return d.id;
    });   

    var linkLabelEnter = linkLabel.enter()
        .insert("g")
        .attr("class", "link")
        .append("text")
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .text(function (d) {
        return d.data.link;
    });

    var linkLabelUpdate = linkLabelEnter.merge(linkLabel);

    // Transition link text to their new positions

    linkLabel.transition()
        .duration(duration)
        .attr("transform", function (d) {
          return "translate(" + ((d.parent.y + d.y) / 2) + "," + ((d.parent.x + d.x) / 2) + ")";
    });

        //Transition exiting link text to the parent's new position.
    var linkLabelExit = linkLabel.exit().transition()
        .remove();

  // Store the old positions for transition.
  nodes.forEach(function(d){
    d.x0 = d.x;
    d.y0 = d.y;
  });

 // Creates a curved (diagonal) path from parent to the child nodes
  function diagonal(s, d) {

    var path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`

    return path
  }

  // Toggle children on click.
  function click(d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
    update(d);
  }
}
}

}

module.exports = ProbabilityTree;