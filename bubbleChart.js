dataset = {
  children: [
    {
      state: "Karim Benzema",
      population: 55,
    },
    {
      state: "Sadio Mané",
      population: 38,
    },
    {
      state: "Robert Lewandowski",
      population: 46,
    },
    {
      state: "Kylian Mbappé",
      population: 61,
    },
    {
      state: "Vinicius Jr",
      population: 28,
    },
    {
      state: "Erling Haaland",
      population: 54,
    },
    {
      state: "Riyad Mahrez",
      population: 38,
    },
    {
      state: "Sébastien Haller",
      population: 31,
    },
    {
      state: "Rafael Leao",
      population: 25,
    },
    {
      state: "Fabinho",
      population: 7,
    },
    {
      state: "Virgil van Dijk",
      population: 4,
    },
    {
      state: "Casemiro ",
      population: 6,
    },
    {
      state: "Dusan Vlahovic",
      population: 29,
    },
    {
      state: "Luis Diaz",
      population: 18,
    },
    {
      state: "Cristiano Ronaldo",
      population: 28,
    },
    {
      state: "Harry Kane",
      population: 37,
    },
    {
      state: "Bernardo Silva",
      population: 21,
    },
    {
      state: "Trent Alexander-Arnold",
      population: 18,
    },
    {
      state: "Phil Foden",
      population: 22,
    },
    {
      state: "Darwin Nunez",
      population: 28,
    },
    {
      state: "Christopher Nkunku",
      population: 26,
    },
    {
      state: "Joao Cancelo",
      population: 15,
    },
    {
      state: "Antonio Rüdiger",
      population: 4,
    },
    {
      state: "Mike Maignan",
      population: 1,
    },
    {
      state: "Joshua Kimmich",
      population: 7,
    },
  ],
};

var diameter = 700;
var color = d3.scaleOrdinal(d3.schemeCategory20b);

//edited the responsive bar code to apply to bubble chart
default_height = 500;
default_ratio = diameter / default_height;

// Determine current size, which determines vars
function set_size() {
  current_width = window.innerWidth;
  current_height = window.innerHeight;
  current_ratio = current_width / current_height;
  // Check if height is limiting factor
  if (current_ratio > default_ratio) {
    diameter = 900;
    // Else width is limiting
  } else {
    diameter = 400;
  }
}
set_size();

var bubble = d3.pack(dataset).size([diameter, diameter]).padding(0.5);

var svg = d3
  .select("#bubble")
  .append("svg")
  .attr("width", diameter)
  .attr("height", diameter)
  .attr("class", "bubble");

var nodes = d3.hierarchy(dataset).sum(function (d) {
  return d.population;
});

var node = svg
  .selectAll(".node")
  .data(bubble(nodes).descendants())
  .enter()
  .filter(function (d) {
    return !d.children;
  })
  .append("g")
  .on("mouseover", function (d, i) {
    d3.select(this).transition().duration("100").attr("opacity", ".8");
  })
  .on("mouseout", function (d, i) {
    d3.select(this).transition().duration("100").attr("opacity", "1");
  })
  .attr("class", "node")
  .attr("transform", function (d) {
    return "translate(" + d.x + "," + d.y + ")";
  });

node.append("title").text(function (d) {
  return d.state;
});

node
  .append("circle")
  .attr("r", function (d) {
    return d.r;
  })
  .style("fill", function (d, i) {
    return color(i);
  });

node
  .append("text")
  .attr("dy", ".2em")
  .style("text-anchor", "middle")
  .text(function (d) {
    return d.data.state;
  })
  .attr("font-size", function (d) {
    return d.r / 5;
  })
  .attr("fill", "white");

node
  .append("text")
  .attr("dy", "1.3em")
  .style("text-anchor", "middle")
  .text(function (d) {
    return d.data.population
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  })
  .attr("font-size", function (d) {
    return d.r / 5;
  })
  .attr("fill", "white");

d3.select(self.frameElement).style("height", diameter + "px");
