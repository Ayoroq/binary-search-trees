// This is the class that builds the nodes
class Node{
    constructor(val){
        this.val = val;
        this.left = null;
        this.right  = null;
    }
}

// This is the tree class
class Tree{
    constructor(arr){
        this.root = this.buildTree(arr);
    }

}