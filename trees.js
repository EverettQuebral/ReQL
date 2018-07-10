function Node(data){
  this.data = data;
  this.parent = null;
  this.children = [];
}

function Tree(data){
  var node = new Node(data);
  this._root = node;
}

Tree.prototype.traverseDF = function(){

}

Tree.prototype.traverseBF = function(){

}

Tree.prototype.contains = function(data, traversal){

}

Tree.prototype.add = function(child, parent){

}

Tree.prototype.remove = function(node, parent){

}
