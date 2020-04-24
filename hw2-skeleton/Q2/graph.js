// get the data
links =  [
    {
      "source": "Milwaukee Bucks",
      "target": "Cleveland Cavaliers",
      "value": 0
    },
    {
      "source": "Milwaukee Bucks",
      "target": "Sacramento Kings",
      "value": 0
    },
    {
      "source": "Detroit Pistons",
      "target": "Philadelphia 76ers",
      "value": 1
    },
    {
      "source": "Cleveland Cavaliers",
      "target": "Los Angeles Lakers",
      // R.I.P Kobe Bean Bryant
      "value": 1
    },
    {
      "source": "Dallas Mavericks",
      "target": "Houston Rockets",
      "value": 1
    },
    {
      "source": "Miami Heat",
      "target": "San Antonio Spurs",
      "value": 1
    },
    {
      "source": "Miami Heat",
      "target": "Los Angeles Lakers",
      "value": 1
    },
    {
      "source": "Brooklyn Nets",
      "target": "Los Angeles Lakers",
      "value": 1
    },
    {
      "source": "Brooklyn Nets",
      "target": "Houston Rockets",
      "value": 1
    },
    {
      "source": "Sacramento Kings",
      "target": "Los Angeles Lakers",
      "value": 1
    },
    {
      "source": "Houston Rockets",
      "target": "Golden State Warriors",
      "value": 0
    },
    {
      "source": "Los Angeles Lakers",
      "target": "Los Angeles Clippers",
      "value": 1
    },
    {
      "source": "Sacramento Kings",
      "target": "Philadelphia 76ers",
      "value": 1
    },
    {
      "source": "San Antonio Spurs",
      "target": "Miami Heat",
      "value": 0
    },
    {
      "source": "Portand Trail Blazers",
      "target": "Miami Heat",
      "value": 0
    },
    {
      "source": "Chicago Bulls",
      "target": "Boston Celtics",
      "value": 0
    },
    {
      "source": "New York Knicks",
      "target": "Golden State Warriors",
      "value": 0
    },
    {
      "source": "Denver Nuggets",
      "target": "Golden State Warriors",
      "value": 0
    },
    {
      "source": "Portand Trail Blazers",
      "target": "Golden State Warriors",
      "value": 0
    },
    {
      "source": "New York Knicks",
      "target": "Denver Nuggets",
      "value": 1
    },
    {
      "source": "San Antonio Spurs",
      "target": "Denver Nuggets",
      "value": 0
    },
    {
      "source": "Houston Rockets",
      "target": "Denver Nuggets",
      "value": 1
    },
    {
      "source": "Portand Trail Blazers",
      "target": "San Antonio Spurs",
      "value": 1
    },
    {
      "source": "Houston Rockets",
      "target": "Brooklyn Nets",
      "value": 0
    },
    {
      "source": "Milwaukee Bucks",
      "target": "Boston Celtics",
      "value": 0
    },
    {
      "source": "Golden State Warriors",
      "target": "Milwaukee Bucks",
      "value": 1
    },
    {
      "source": "Golden State Warriors",
      "target": "Atlanta Hawks",
      "value": 1
    },
    {
      "source": "Orlando Magic",
      "target": "Memphis Grizzlies",
      "value": 0
    },
    {
      "source": "Washington Wizards",
      "target": "New York Knicks",
      "value": 1
    },
    {
      "source": "Boston Celtics",
      "target": "Orlando Magic",
      "value": 1
    },
    {
      "source": "Oklahoma City Thunder",
      "target": "Sacramento Kings",
      "value": 0
    },
    {
      "source": "Boston Celtics",
      "target": "Charlotte Hornets",
      "value": 1
    },
    {
      "source": "Boston Celtics",
      "target": "Philadelphia 76ers",
      "value": 1
    },
    {
      "source": "Brooklyn Nets",
      "target": "Miami Heat",
      "value": 1
    },
    {
      "source": "Indiana Pacers",
      "target": "Chicago Bulls",
      "value": 1
    },
    {
      "source": "New York Knicks",
      "target": "Boston Celtics",
      "value": 0
    },
    {
      "source": "Los Angeles Lakers",
      "target": "Phoenix Suns",
      "value": 0
    },
    {
      "source": "Golden State Warriors",
      "target": "Dallas Mavericks",
      "value": 1
    },
    {
      "source": "New Orleans Pelicans",
      "target": "Indiana Pacers",
      "value": 0
    },
    {
      "source": "Milwaukee Bucks",
      "target": "Brooklyn Nets",
      "value": 0
    },
    {
      "source": "Washington Wizards",
      "target": "Portand Trail Blazers",
      "value": 1
    },
    {
      "source": "Utah Jazz",
      "target": "Golden State Warriors",
      "value": 1
    },
    {
      "source": "Boston Celtics",
      "target": "Utah Jazz",
      "value": 1
    },
    {
      "source": "Golden State Warriors",
      "target": "Charlotte Hornets",
      "value": 1
    },
    {
      "source": "Boston Celtics",
      "target": "Atlanta Hawks",
      "value": 1
    },
    {
      "source": "Philadelphia 76ers",
      "target": "Boston Celtics",
      "value": 0
    }
  ];
  
  var nodes = {};
  
  // compute the distinct nodes from the links.
  links.forEach(function(link) {
      link.source = nodes[link.source] ||
          (nodes[link.source] = {name: link.source});
      link.target = nodes[link.target] ||
          (nodes[link.target] = {name: link.target});
  });
  
  var width = 1200,
      height = 700;
  
  var force = d3.forceSimulation()
      .nodes(d3.values(nodes))
      .force("link", d3.forceLink(links).distance(100))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force("x", d3.forceX())
      .force("y", d3.forceY())
      .force("charge", d3.forceManyBody().strength(-250))
      .alphaTarget(1)
      .on("tick", tick);
  
  var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height);
  
  // add the links and the arrows
  var path = svg.append("g")
      .selectAll("path")
      .data(links)
      .enter()
      .append("path")
      .attr("class", function(d) { return "link " + d.type; })
      // edge style
      // value = 1 -> black
      // value = 0 -> blue
      .style("stroke", function(d) {
        if(d.value == 1) return "black";
        else return "blue";})
      // value = 1 -> dashed
      // value = 0 -> solid
      .style("stroke-dasharray",function(d) {
        if(d.value == 1) return "4 3";
            else return "1 0";})
      // value = 1 -> thin
      // value = 0 -> thick
      .style("stroke-width",function(d) {
        if(d.value == 1) return "1.5px";
            else return "3.0px";});
  
  var color = d3.scaleLinear()
                .domain([0,9])
                .range(["white", "yellow"]);

  // define the nodes
  var node = svg.selectAll(".node")
      .data(force.nodes())
      .enter().append("g")
      .attr("class", "node")
      .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));
  
  // add the nodes
  node.append("circle")
      .attr("r", function(d){
        d.weight = path.filter(function(p) {
          return p.source.index == d.index || p.target.index == d.index
        }).size();
        // min radiuus for a circle is 3
        var min_r = 3;
        // scale the radius according to the degree
        return min_r + (d.weight * 2);}
      )
      .style("fill", function(d) {
        // color
        return color(d.weight);
      })
      .on("dblclick", function(d){
        // double click function
        if(d.fixed == true ){
          // when frozen
          unfreeze_node(d);
          d3.select(this).style("fill", color(d.weight));
        }
        else {
          // when free
          freeze_node(d);
          d3.select(this).style("fill", "rgb(255, 0, 0)");
        }
      });
  
  node.append("text")
      .attr('x',10)
      .attr('y',15)
      // font bold
      .style('font-weight', 'bold')
      .style("text-anchor","start")
      .text(function(d){
          return d.name;});
  
  // add the curvy lines
  function tick() {
      path.attr("d", function(d) {
          var dx = d.target.x - d.source.x,
              dy = d.target.y - d.source.y,
              dr = Math.sqrt(dx * dx + dy * dy);
          return "M" +
              d.source.x + "," +
              d.source.y + "A" +
              dr + "," + dr + " 0 0,1 " +
              d.target.x + "," +
              d.target.y;
      });
  
      node
          .attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")"; })
  };
  
  function dragstarted(d) {
      if (!d3.event.active) force.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
  };
  
  function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
  };
  
  function dragended(d) {
      if (!d3.event.active) force.alphaTarget(0);
      if (d.fixed == true) {
          d.fx = d.x;
          d.fy = d.y;
      }
      else {
          d.fx = null;
          d.fy = null;
      }
  };

  // function to pin a node
  function freeze_node(d) {
    d.fixed = true;
    d.fx = d.x;
    d.fy = d.y
  };

  // function to free a node
  function unfreeze_node(d) {
    d.fixed = false;
    d.fx = null;
    d.fy = null;
  };

  // GT username
  var x_offset = 30;
  var y_offset = 20;
  svg.append("text")
    .attr("x", width - x_offset)
    .attr("y", y_offset)
    .attr("text-anchor", "middle")
    .style("font-size", "15px")
    .text("rliang37");