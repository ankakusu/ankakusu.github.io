svgApp = angular.module("SVGApp", [])

svgApp.directive "ngCanvas",  ->
  that = this;
  that.canvasWidth  = 500
  that.canvasHeight = 450
  that.root  = null
  that.links = null
  that.nodes = null
  that.force = null

  that.tick = (e) ->
    k = 2 * e.alpha;

    that.node.each (d) ->
      d.y += (( d.depth)* 60 - d.y ) * k;
    
    that.link.attr "x1", (d) -> d.source.x
    .attr "y1", (d) -> d.source.y
    .attr "x2", (d) -> d.target.x
    .attr "y2", (d) -> d.target.y

    that.node.attr "transform", (d) -> "translate(" + d.x + "," + d.y + ")"
    return

  that.init = (divName, cb) ->
    that.svg = d3.select(divName).append("svg")
    .attr("width", that.canvasWidth)
    .attr("height", that.canvasHeight)
    
    that.force = d3.layout.force()
      .linkDistance 80
      .charge( (d) ->  if d.type is "projects" then return -520 else return -120)
      .gravity( (d) -> if d.type is "projects" then return 0.005 else return .5; ) 
      .size([canvasWidth, canvasHeight])
      .on("tick", that.tick)

    that.link = that.svg.selectAll(".link")
    that.node = that.svg.selectAll(".node")

    if cb? then cb()

  that.showDetails = (item) ->
    if item.type is "project"
      console.log "Show details"
      console.log item
      position = d3.mouse(this);
      detailList = "<ul>";
      angular.forEach item.description , (description) ->
        detailList += "<li> #{description} </li>"
      detailList += "</ul>"

      entityType = null
      if item.company? 
        angular.element("##{that.divName}").append "<div class='info-menu'>" +
          "<div class='info-header'> Project Details </div>" +
          "<div class='info-item'> <span class='sub-header'>Name: </span> #{item.name} </div>" +
          "<div class='info-item'> <span class='sub-header'>Company:</span> <a href='#{item.company.url}'>#{item.company.name}</a> </div>" +
          "<div class='info-item'> <span class='sub-header'>Date:</span> #{item['start-date']} - #{item['end-date']} </div>" +
          "<div class='info-item'> <span class='sub-header'>Details:</span> #{detailList}  </div>" +
          "</div>" 
      else if item.university?
        angular.element("##{that.divName}").append "<div class='info-menu'>" +
          "<div class='info-header'> Project Details </div>" +
          "<div class='info-item'> <span class='sub-header'>Name: </span> #{item.name} </div>" +
          "<div class='info-item'> <span class='sub-header'>School:</span> <a href='#{item.university.url}'>#{item.university.name}</a> </div>" +
          "<div class='info-item'> <span class='sub-header'>Date:</span> #{item['start-date']} - #{item['end-date']} </div>" +
          "<div class='info-item'> <span class='sub-header'>Details:</span> #{detailList} </div>" +
          "</div>" 


      parentDiv = angular.element("svg")
      infoMenu = angular.element(".info-menu")
      infoMenu.css("position", "absolute")
        .css("left", (d3.event.pageX - 30) + "px"  )
        .css("top",  (d3.event.pageY - 55 ) + "px" )
        .mouseleave ->
          console.log "mouseleave"
          infoMenu = angular.element(".info-menu") 
          infoMenu.remove()

  that.render = (rootData) ->
    nodes = that.flatten(rootData)
    links = d3.layout.tree().links(nodes);

    # Restart the force layout.
    that.force.nodes(nodes)
      .links(links)
      .start();

    # Update links.
    that.link = that.link.data( links, (d) -> d.target.id; );
    that.link.exit().remove();
    that.link.enter().insert("line", ".node")
        .attr("class", "link");

    # Update nodes.
    that.node = that.node.data(nodes, (d) -> d.id );
   
    that.node.exit().remove();
   
    nodeEnter = that.node.enter().append("g")
      .attr("class", "node")
      .on("mouseover", that.showDetails )
      .on("click", that.click)
      .call( that.force.drag()
        .on("dragstart", -> d3.event.sourceEvent.stopPropagation())
        .on("drag", (d) -> d3.select(this).classed("fixed", d.fixed = true)  ) )
   
    nodeEnter.append("rect")
      .attr("width", 70 )
      .attr("height", 20 )
      .attr("y", "-0.7em")
      .attr("x", "-2em")
      .style("opacity", 0)
    
    nodeEnter.append("text")
      .attr("dy", ".35em")
      .text( (d) -> d.name )
      .style( "text-transform", (d) -> if d.type is "company" then return "uppercase" )
      .style "font-size", (d) -> 
        if d.name is "Argela" then return 26 
        else if d.name is "Mikes" then return 25
        else if d.name is "Ayyazılım" then return 14

        if d.type is "education" then return 25

      .style "fill", (d) -> 
        if d.type is "company" or d.type is "education" then return "rgba(110, 96, 134, 0.9)"

    nodeEnter.append("text")
      .attr "dy", (d) -> if d.type is "project" then return "-.6em" else return "-1.2em"
      .text (d) ->  "#{d["start-date"]} - #{d["end-date"]}"
      .style "font-size", (d) -> 10
        .style "fill", (d) -> if d.type is "company" then return "rgba(110, 96, 134, 0.9)"

    that.node.select("rect")
      .style("fill", color);

  that.color = (d) -> 
    if d._children? then return "#3182bd" # collapsed package
    else if d.children? then return "#c6dbef" # expanded package
    else return "#fd8d3c"; # leaf node

  that.click = (d) -> 
    console.log "click"
    if (d3.event.defaultPrevented) then return # ignore drag
    if (d.children)
      d._children = d.children;
      d.children = null;
    else 
      d.children = d._children;
      d._children = null;
    that.render(that.scope.mydata);

  # Returns a list of all nodes under the root.
  that.flatten = (root) -> 
    ns = []; i = 0;
 
    recurse = (n) -> 
      if (n.children) then n.children.forEach(recurse);
      if (!n.id) then n.id = ++i;
      ns.push(n);
   
    recurse(root);
    return ns;

  ngCanvas = {};
  ngCanvas.restrict = "AE";
  ngCanvas.link = (lScope, lElem, lAttr) ->
    that.init "##{lAttr.id}"
    that.divName = lAttr.id;
    that.scope = lScope;
    lScope.render = that.render

    lScope.$watch( "mydata", ->
      if lScope.mydata?
        that.rootData = lScope.mydata
        lScope.render(that.rootData);
        return;
    ,true)

    return;

  return ngCanvas;