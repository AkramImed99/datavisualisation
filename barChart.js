var data = [
  {
    date: "2022",
    "Karim Benzema": 11643,
    "Sadio Mané": 154593,
    "Robert Lewandowski": 38058,
    "Mohamed Salah": 161337,
    "Kylian Mbappé": 635203,
    "Thibaut Courtois": 55337,
    "Vinicius Jr": 50036,
    "Luka Modric": 14142,
    "Erling Haaland": 43965,
  },
  {
    date: "2021",
    "Karim Benzema": 110561,
    "Sadio Mané": 155041,
    "Robert Lewandowski": 79535,
    "Mohamed Salah": 146571,
    "Kylian Mbappé": 633842,
    "Thibaut Courtois": 57062,
    "Vinicius Jr": 49959,
    "Luka Modric": 140323,
    "Erling Haaland": 44193,
  },
  {
    date: "2020",
    "Karim Benzema": 93541,
    "Sadio Mané": 147101,
    "Robert Lewandowski": 76488,
    "Mohamed Salah": 135928,
    "Kylian Mbappé": 614348,
    "Thibaut Courtois": 55227,
    "Vinicius Jr": 48146,
    "Luka Modric": 133103,
    "Erling Haaland": 42826,
  },
  {
    date: "2019",
    "Karim Benzema": 84767,
    "Sadio Mané": 149205,
    "Robert Lewandowski": 75578,
    "Mohamed Salah": 130557,
    "Kylian Mbappé": 611105,
    "Thibaut Courtois": 56979,
    "Vinicius Jr": 47112,
    "Luka Modric": 128978,
    "Erling Haaland": 41149,
  },
  {
    date: "2018",
    "Karim Benzema": 83637,
    "Sadio Mané": 143489,
    "Robert Lewandowski": 73932,
    "Mohamed Salah": 127792,
    "Kylian Mbappé": 599711,
    "Thibaut Courtois": 50636,
    "Vinicius Jr": 45622,
    "Luka Modric": 128546,
    "Erling Haaland": 40600,
  },
  {
    date: "2017",
    "Karim Benzema": 84974,
    "Sadio Mané": 142943,
    "Robert Lewandowski": 73831,
    "Mohamed Salah": 126438,
    "Kylian Mbappé": 596577,
    "Thibaut Courtois": 53826,
    "Vinicius Jr": 45591,
    "Luka Modric": 128932,
    "Erling Haaland": 39518,
  },
  {
    date: "2016",
    "Karim Benzema": 83494,
    "Sadio Mané": 138080,
    "Robert Lewandowski": 69071,
    "Mohamed Salah": 120859,
    "Kylian Mbappé": 597689,
    "Thibaut Courtois": 50097,
    "Vinicius Jr": 50476,
    "Luka Modric": 129476,
    "Erling Haaland": 38364,
  },
  {
    date: "2015",
    "Karim Benzema": 79003,
    "Sadio Mané": 137353,
    "Robert Lewandowski": 68705,
    "Mohamed Salah": 118021,
    "Kylian Mbappé": 599413,
    "Thibaut Courtois": 53692,
    "Vinicius Jr": 48935,
    "Luka Modric": 128842,
    "Erling Haaland": 36909,
  },
];
var key = [
  "Karim Benzema",
  "Sadio Mané",
  "Robert Lewandowski",
  "Mohamed Salah",
  "Kylian Mbappé",
  "Thibaut Courtois",
  "Vinicius Jr",
  "Luka Modric",
  "Erling Haaland",
];
var initStackedBarChart = {
  draw: function (config) {
    (me = this),
      (domEle = config.element),
      (stackKey = config.key),
      (data = config.data),
      (margin = {
        top: 20,
        right: 40,
        bottom: 30,
        left: 40,
      }),
      (parseDate = d3.timeParse("%Y"));

    var legendRectSize = 17;
    var legendSpacing = 4;

    //making graph responsive
    default_width = 800;
    default_height = 500;
    default_ratio = default_width / default_height;

    // Determine current size, which determines vars
    function set_size() {
      current_width = window.innerWidth;
      current_height = window.innerHeight;
      current_ratio = current_width / current_height;
      // Check if height is limiting factor
      if (current_ratio > default_ratio) {
        h = default_height;
        w = default_width;
        // Else width is limiting
      } else {
        w = current_width;
        h = w / default_ratio;
        legendSpacing = 2;
        legendRectSize = 7;
      }
      // Set new width and height based on graph dimensions
      width = w - margin.left - margin.right;
      height = h - margin.top - margin.bottom;
    }
    set_size();
    //end responsive graph code

    (xScale = d3.scaleLinear().rangeRound([0, width])),
      (yScale = d3.scaleBand().rangeRound([height, 0]).padding(0.1)),
      (color = d3.scaleOrdinal(d3.schemeCategory20c)),
      (xAxis = d3.axisBottom(xScale).ticks(5)),
      (yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%Y"))),
      (svg = d3
        .select("#" + domEle)
        .append("svg")
        .attr("width", 1000 + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr(
          "transform",
          "translate(" + margin.left + "," + margin.top + ")"
        ));

    var stack = d3
      .stack()
      .keys(stackKey)
      .order(d3.stackOrder)
      .offset(d3.stackOffsetNone);

    var layers = stack(data);

    //sorts data by date- lowest to highest
    data.sort(function (a, b) {
      return a.date - b.date;
    });
    yScale.domain(
      data.map(function (d) {
        return parseDate(d.date);
      })
    );

    //x max
    xScale
      .domain([
        0,
        d3.max(layers[layers.length - 1], function (d) {
          return 1500000;
        }),
      ])
      .nice();

    var layer = svg
      .selectAll(".layer")
      .data(layers)
      .enter()
      .append("g")
      .attr("class", "layer")
      .style("fill", function (d, i) {
        return color(i);
      });

    var div = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    layer
      .selectAll("rect")
      .data(function (d) {
        return d;
      })
      .enter()
      .append("rect")
      .attr("y", function (d) {
        return yScale(parseDate(d.data.date));
      })
      .attr("x", function (d) {
        return xScale(d[0]);
      })
      .attr("height", yScale.bandwidth())
      .attr("width", function (d) {
        return xScale(d[1]) - xScale(d[0]);
      })
      .on("mouseover", function (d, i) {
        d3.select(this).transition().duration("200").attr("opacity", ".7");
        div.transition().duration(200).style("opacity", 0.9);
        let num = (d[1] - d[0])
          .toString()
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        div
          .html(num)
          .style("left", d3.event.pageX + 10 + "px")
          .style("top", d3.event.pageY - 15 + "px");
      })
      .on("mouseout", function (d, i) {
        d3.select(this).transition().duration("200").attr("opacity", "1");
        div.transition().duration("200").style("opacity", 0);
      });

    svg
      .append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + (height + 5) + ")")
      .call(xAxis);

    svg
      .append("g")
      .attr("class", "axis axis--y")
      .attr("transform", "translate(0,0)")
      .call(yAxis);

    var legend = svg
      .selectAll(".legend-bar")
      .data(color.domain())
      .enter()
      .append("g")
      .attr("class", "legend-bar")
      .attr("transform", function (d, i) {
        var height = legendRectSize + legendSpacing;
        var offset = (height * color.domain().length) / 2;
        var horz = width - 40;
        var vert = i * height + 7;
        return "translate(" + horz + "," + vert + ")";
      });

    legend
      .append("rect")
      .attr("width", legendRectSize)
      .attr("height", legendRectSize)
      .style("fill", color)
      .style("stroke", color);

    legend
      .append("text")
      .attr("x", legendRectSize + legendSpacing)
      .attr("y", legendRectSize - legendSpacing)
      .text(function (d) {
        return key[d];
      });
  },
};
initStackedBarChart.draw({
  data: data,
  key: key,
  element: "stacked-bar",
});
