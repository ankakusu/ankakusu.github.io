var svgApp;

svgApp = angular.module("SVGApp", []);

svgApp.directive("ngCanvas", function() {
  var ngCanvas, that;
  that = this;
  that.canvasWidth = 500;
  that.canvasHeight = 450;
  that.root = null;
  that.links = null;
  that.nodes = null;
  that.force = null;
  that.tick = function(e) {
    var k;
    k = 2 * e.alpha;
    that.node.each(function(d) {
      return d.y += (d.depth * 60 - d.y) * k;
    });
    that.link.attr("x1", function(d) {
      return d.source.x;
    }).attr("y1", function(d) {
      return d.source.y;
    }).attr("x2", function(d) {
      return d.target.x;
    }).attr("y2", function(d) {
      return d.target.y;
    });
    that.node.attr("transform", function(d) {
      return "translate(" + d.x + "," + d.y + ")";
    });
  };
  that.init = function(divName, cb) {
    that.svg = d3.select(divName).append("svg").attr("width", that.canvasWidth).attr("height", that.canvasHeight);
    that.force = d3.layout.force().linkDistance(80).charge(function(d) {
      if (d.type === "projects") {
        return -520;
      } else {
        return -120;
      }
    }).gravity(function(d) {
      if (d.type === "projects") {
        return 0.005;
      } else {
        return .5;
      }
    }).size([canvasWidth, canvasHeight]).on("tick", that.tick);
    that.link = that.svg.selectAll(".link");
    that.node = that.svg.selectAll(".node");
    if (cb != null) {
      return cb();
    }
  };
  that.showDetails = function(item) {
    var detailList, entityType, infoMenu, parentDiv, position;
    if (item.type === "project") {
      console.log("Show details");
      console.log(item);
      position = d3.mouse(this);
      detailList = "<ul>";
      angular.forEach(item.description, function(description) {
        return detailList += "<li> " + description + " </li>";
      });
      detailList += "</ul>";
      entityType = null;
      if (item.company != null) {
        angular.element("#" + that.divName).append("<div class='info-menu'>" + "<div class='info-header'> Project Details </div>" + ("<div class='info-item'> <span class='sub-header'>Name: </span> " + item.name + " </div>") + ("<div class='info-item'> <span class='sub-header'>Company:</span> <a href='" + item.company.url + "'>" + item.company.name + "</a> </div>") + ("<div class='info-item'> <span class='sub-header'>Date:</span> " + item['start-date'] + " - " + item['end-date'] + " </div>") + ("<div class='info-item'> <span class='sub-header'>Details:</span> " + detailList + "  </div>") + "</div>");
      } else if (item.university != null) {
        angular.element("#" + that.divName).append("<div class='info-menu'>" + "<div class='info-header'> Project Details </div>" + ("<div class='info-item'> <span class='sub-header'>Name: </span> " + item.name + " </div>") + ("<div class='info-item'> <span class='sub-header'>School:</span> <a href='" + item.university.url + "'>" + item.university.name + "</a> </div>") + ("<div class='info-item'> <span class='sub-header'>Date:</span> " + item['start-date'] + " - " + item['end-date'] + " </div>") + ("<div class='info-item'> <span class='sub-header'>Details:</span> " + detailList + " </div>") + "</div>");
      }
      parentDiv = angular.element("svg");
      infoMenu = angular.element(".info-menu");
      return infoMenu.css("position", "absolute").css("left", (d3.event.pageX - 30) + "px").css("top", (d3.event.pageY - 55) + "px").mouseleave(function() {
        console.log("mouseleave");
        infoMenu = angular.element(".info-menu");
        return infoMenu.remove();
      });
    }
  };
  that.render = function(rootData) {
    var links, nodeEnter, nodes;
    nodes = that.flatten(rootData);
    links = d3.layout.tree().links(nodes);
    that.force.nodes(nodes).links(links).start();
    that.link = that.link.data(links, function(d) {
      return d.target.id;
    });
    that.link.exit().remove();
    that.link.enter().insert("line", ".node").attr("class", "link");
    that.node = that.node.data(nodes, function(d) {
      return d.id;
    });
    that.node.exit().remove();
    nodeEnter = that.node.enter().append("g").attr("class", "node").on("mouseover", that.showDetails).on("click", that.click).call(that.force.drag().on("dragstart", function() {
      return d3.event.sourceEvent.stopPropagation();
    }).on("drag", function(d) {
      return d3.select(this).classed("fixed", d.fixed = true);
    }));
    nodeEnter.append("rect").attr("width", 70).attr("height", 20).attr("y", "-0.7em").attr("x", "-2em").style("opacity", 0);
    nodeEnter.append("text").attr("dy", ".35em").text(function(d) {
      return d.name;
    }).style("text-transform", function(d) {
      if (d.type === "company") {
        return "uppercase";
      }
    }).style("font-size", function(d) {
      if (d.name === "Argela") {
        return 26;
      } else if (d.name === "Mikes") {
        return 25;
      } else if (d.name === "Ayyazılım") {
        return 14;
      }
      if (d.type === "education") {
        return 25;
      }
    }).style("fill", function(d) {
      if (d.type === "company" || d.type === "education") {
        return "rgba(110, 96, 134, 0.9)";
      }
    });
    nodeEnter.append("text").attr("dy", function(d) {
      if (d.type === "project") {
        return "-.6em";
      } else {
        return "-1.2em";
      }
    }).text(function(d) {
      return "" + d["start-date"] + " - " + d["end-date"];
    }).style("font-size", function(d) {
      return 10;
    }).style("fill", function(d) {
      if (d.type === "company") {
        return "rgba(110, 96, 134, 0.9)";
      }
    });
    return that.node.select("rect").style("fill", color);
  };
  that.color = function(d) {
    if (d._children != null) {
      return "#3182bd";
    } else if (d.children != null) {
      return "#c6dbef";
    } else {
      return "#fd8d3c";
    }
  };
  that.click = function(d) {
    console.log("click");
    if (d3.event.defaultPrevented) {
      return;
    }
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    return that.render(that.scope.mydata);
  };
  that.flatten = function(root) {
    var i, ns, recurse;
    ns = [];
    i = 0;
    recurse = function(n) {
      if (n.children) {
        n.children.forEach(recurse);
      }
      if (!n.id) {
        n.id = ++i;
      }
      return ns.push(n);
    };
    recurse(root);
    return ns;
  };
  ngCanvas = {};
  ngCanvas.restrict = "AE";
  ngCanvas.link = function(lScope, lElem, lAttr) {
    that.init("#" + lAttr.id);
    that.divName = lAttr.id;
    that.scope = lScope;
    lScope.render = that.render;
    lScope.$watch("mydata", function() {
      if (lScope.mydata != null) {
        that.rootData = lScope.mydata;
        lScope.render(that.rootData);
      }
    }, true);
  };
  return ngCanvas;
});
