// This is the class that builds the nodes
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// This is the tree class
export default class Tree {
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

  _insert(root, value) {
    if (root === null) {
      return new Node(value);
    }

    if (root.value === value) {
      return root;
    }

    if (value < root.value) {
      root.left = this._insert(root.left, value);
    } else {
      root.right = this._insert(root.right, value);
    }

    return root;
  }

  insert(value) {
    this.root = this._insert(this.root, value);
  }

  _remove(root, value) {
    function findNextBiggest(node) {
      let nextBiggest = node.right;
      while (nextBiggest.left !== null) {
        nextBiggest = nextBiggest.left;
      }
      return nextBiggest;
    }
    if (root === null) return root;

    if (value < root.value) {
      root.left = this._remove(root.left, value);
    } else if (value > root.value) {
      root.right = this._remove(root.right, value);
    } else if (value === root.value) {
      if (root.left === null) {
        return root.right;
      } else if (root.right === null) {
        return root.left;
      } else if (root.right !== null && root.left !== null) {
        let nextBiggest = findNextBiggest(root);
        root.value = nextBiggest.value;
        root.right = this._remove(root.right, nextBiggest.value);
      }
    }
    return root;
  }

  remove(value) {
    this.root = this._remove(this.root, value);
  }

  find(value, root = this.root) {
    if (root === null) return null;
    if (root.value === value) return root;
    if (value < root.value) {
      return this.find(value, root.left);
    } else {
      return this.find(value, root.right);
    }
  }

  levelOrderForEach(callback, root = this.root) {
    if (!callback) {
      throw new Error("No callback function provided");
    }
    if (root === null) return;
    const queue = [root];
    while (queue.length) {
      const node = queue.shift();
      callback(node);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

//   levelOrderForEachRecursive(callback, queue = [this.root]) {
//     if (!callback) {
//       throw new Error("No callback function provided");
//     }
//     if (queue.length === 0) return;

//     const node = queue.shift();
//     if (node) {
//       callback(node);
//       if (node.left) queue.push(node.left);
//       if (node.right) queue.push(node.right);
//     }

//     this.levelOrderForEachRecursive(callback, queue);
//   }

  height(value) {
    const node = this.find(value);
    if (node === null) return null;

    function computeHeight(n) {
      if (n === null) return -1;
      return 1 + Math.max(computeHeight(n.left), computeHeight(n.right));
    }

    return computeHeight(node);
  }

  depth(value, root = this.root) {
    if (root === null) return null;
    if (root.value === value) return 0;
    if (value < root.value) {
      return 1 + this.depth(value, root.left);
    } else {
      return 1 + this.depth(value, root.right);
    }
  }

  isBalanced(root = this.root) {
    if (root === null) return true;
    const leftHeight = root.left ? this.height(root.left.value) : -1;
    const rightHeight = root.right ? this.height(root.right.value) : -1;
    if (Math.abs(leftHeight - rightHeight) > 1) return false;
    return this.isBalanced(root.left) && this.isBalanced(root.right);
  }

  reBalance() {}

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}
