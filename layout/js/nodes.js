
  var Nodes;

  //Graph = data;
  Nodes = (function() {
    Nodes.prototype.w = 300;
    Nodes.prototype.h = 500;
    Nodes.prototype.nodes = Graph.nodes;
    Nodes.prototype.links = Graph.links;
    Nodes.prototype.node = {};
    Nodes.prototype.link = {};
    Nodes.prototype.force = {};
    Nodes.prototype.element = '';

    function Nodes(el, w, h) {
      var links, nodes, rightSide;
      this.element = el;
      this.w = w;
      this.h = h;
      rightSide = d3.select('#' + el).append('svg').attr('width', this.w).attr('height', this.h);
      rightSide.append('rect').attr('width', this.w).attr('height', this.h).attr('fill', 'none');
      this.node = rightSide.selectAll(el + '-node');
      this.link = rightSide.selectAll(el + '-link');
      this.force = d3.layout.force().size([this.w, this.h]).nodes(this.nodes).links(this.links).linkStrength(5).linkDistance(function(link) {
        var x, y;
        x = link.target.x - link.source.x;
        y = link.target.y - link.source.y;
        return Math.sqrt(x * x + y * y);
      }).gravity(0.5).charge(0).on('tick', (function(_this) {
        return function() {
          _this.link.attr('x1', function(d) {
            return d.source.x;
          }).attr('y1', function(d) {
            return d.source.y;
          }).attr('x2', function(d) {
            return d.target.x;
          }).attr('y2', function(d) {
            return d.target.y;
          });
          return _this.node.attr('cx', function(d) {
            return d.x;
          }).attr('cy', function(d) {
            return d.y;
          });
        };
      })(this));
      nodes = this.force.nodes();
      links = this.force.links();
      this.render();
    }

    Nodes.prototype.render = function() {
      this.link = this.link.data(this.links);
      this.link.enter().insert('line', this.element + '-node').attr('class', this.element + '-link').attr('opacity', function(link) {
        if (link.z === 1) {
          return 0.3;
        }
      }).attr('stroke', '#F1AD2F').attr('stroke-width', function(link) {
        if (link.z === 1) {
          return 1;
        } else {
          return 3;
        }
      });
      this.node = this.node.data(this.nodes);
      this.node.enter().insert('circle', '.cursor').attr('class', this.element + '-node').attr('fill', '#282C34').attr('stroke-opacity', function(node) {
        if (node.r === 6) {
          return 0.3;
        }
      }).attr('stroke', '#F1AD2F').attr('stroke-width', 2).attr('r', function(node) {
        return node.r;
      }).call(this.force.drag);
      return this.force.start();
    };

    return Nodes;

  })();
