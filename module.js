import Tree from "./bst.js";

// Function to generate an array of random numbers < 100
function generateRandomArray(size = 15, max = 100) {
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * max));
  }
  return arr;
}

// 1. Create tree from random numbers
const numbers = generateRandomArray();
console.log("Initial array:", numbers);
const tree = new Tree(numbers);

// 2. Confirm tree is balanced
console.log("Is tree balanced?", tree.isBalanced());
tree.prettyPrint();

// 3. Print traversals
console.log("Level-order traversal:");
tree.levelOrderForEach(node => console.log(node.value));
console.log("In-order traversal:");
tree.inOrderForEach(node => console.log(node.value));
console.log("Pre-order traversal:");
tree.preOrderForEach(node => console.log(node.value));
console.log("Post-order traversal:");
tree.postOrderForEach(node => console.log(node.value));

// 4. Unbalance the tree by adding several numbers > 100
tree.insert(101);
tree.insert(150);
tree.insert(200);
tree.insert(300);

// 5. Confirm tree is unbalanced
console.log("Is tree balanced after adding large numbers?", tree.isBalanced());

// 6. Rebalance the tree
tree.reBalance();

// 7. Confirm tree is balanced again
console.log("Is tree balanced after rebalancing?", tree.isBalanced());

// 8. Print traversals again
console.log("Level-order traversal after rebalancing:");
tree.levelOrderForEach(node => console.log(node.value));
console.log("In-order traversal after rebalancing:");
tree.inOrderForEach(node => console.log(node.value));
console.log("Pre-order traversal after rebalancing:");
tree.preOrderForEach(node => console.log(node.value));
console.log("Post-order traversal after rebalancing:");
tree.postOrderForEach(node => console.log(node.value));