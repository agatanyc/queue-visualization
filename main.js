var ns = "http://www.w3.org/2000/svg";
 
var svg = document.createElementNS(ns, "svg");
svg.setAttributeNS(null, "width", 500);
svg.setAttributeNS(null, "height", 500);
document.body.appendChild(svg);
 
// Stack class
var Stack = function() {
    this.items = [];
    this.svgElement = document.createElementNS(ns, "g");
    this.svgItems = [];
}
 
// define the 'add' method in Stack class
Stack.prototype.add = function(item) {
    this.items.push(item);
 
    var nextY = 500 - this.size() * 40;
 
    var g = document.createElementNS(ns, "g");
    this.svgElement.appendChild(g);
 
    var r = document.createElementNS(ns, "rect");
    r.setAttributeNS(null, "x", 10);
    r.setAttributeNS(null, "y", nextY);
    r.setAttributeNS(null, "width", 100);
    r.setAttributeNS(null, "height", 40);
    var r1 = 200 + Math.round(Math.random() * 55);
    var g1 = 200 + Math.round(Math.random() * 55);
    var b1 = 200 + Math.round(Math.random() * 55);
    var randomColor = "rgb(" + r1 + ", " + g1 + ", " + b1 + ")";
    r.setAttributeNS(null, "fill", randomColor);
    r.setAttributeNS(null, "stroke", "black");
    r.setAttributeNS(null, "stroke-width", "2");
    g.appendChild(r);
 
    var text = document.createElementNS(ns, "text");
    text.setAttributeNS(null, "x", 60);
    text.setAttributeNS(null, "y", nextY + 30);
    text.setAttributeNS(null, "text-anchor", "middle");
    text.innerHTML = item;
    g.appendChild(text);
 
    this.svgItems.push(g);
}
 
Stack.prototype.pop = function() {
    var svgItem = this.svgItems[this.svgItems.length - 1];
    this.svgElement.removeChild(svgItem);
    this.svgItems.pop();
    return this.items.pop();
}
 
Stack.prototype.isEmpty = function() {
    return this.items.length == 0;
}
 
Stack.prototype.size = function() {
    return this.items.length;
}
 
Stack.prototype.pick = function() {
    return this.items[this.items.length - 1];
}
 
 
var Queue = function() {
    this.items = new Stack();
    this.temp = new Stack();
 
    this.svgElement = document.createElementNS(ns, "g");
    this.svgElement.appendChild(this.items.svgElement);
    this.svgElement.appendChild(this.temp.svgElement);
    this.temp.svgElement.setAttributeNS(null, "transform", "translate(200 0)");
}
 
Queue.prototype.enqueue = function(item) {
    this.items.add(item);
}
 
Queue.prototype.dequeue = function() {
    if (this.temp.isEmpty()) {
        var len = this.items.size();
        for (var i = 0; i < len; i++) {
            this.temp.add(this.items.pop());
        }
        return this.temp.pop();
    } else {
        return this.temp.pop();
    }
}
 
var queue = new Queue();
svg.appendChild(queue.svgElement);
 
queue.enqueue(10);
queue.enqueue(1);
queue.enqueue(12);
queue.enqueue(34);
queue.enqueue(90);
queue.dequeue();
queue.dequeue();
queue.enqueue(340);
queue.enqueue(90);
queue.dequeue();
queue.enqueue(12);
queue.dequeue();
queue.dequeue();
queue.dequeue();
