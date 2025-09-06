// This is the class that builds the nodes
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// This is the tree class
class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  // This is the binary search tree function itself
  buildTree(arr) {
    arr = this._sortArray(arr);
    arr = this._removeDuplicate(arr);
    if (arr.length === 0) return null;
    const mid = Math.floor(arr.length / 2);
    const root = new Node(arr[mid]);
    root.left = this.buildTree(arr.slice(0, mid));
    root.right = this.buildTree(arr.slice(mid + 1));
    return root;
  }

  _removeDuplicate(arr) {
    return [...new Set(arr)];
  }

  _sortArray(arr) {
    if (arr.length <= 1) return arr;
    function merge(left, right) {
      const sorted = [];
      while (left.length && right.length) {
        if (left[0] < right[0]) {
          sorted.push(left.shift());
        } else {
          sorted.push(right.shift());
        }
      }
      return [...sorted, ...left, ...right];
    }
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
    return merge(this._sortArray(left), this._sortArray(right));
  }

  
}
