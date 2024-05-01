class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
        this.height = 0;
    }
}

class Tree {
    constructor(treeArray) {
        this.treeArray = treeArray;
        this.root = this.buildTree(treeArray);
    }
    buildTree(array) {
        let copyArray = array;
        copyArray.sort((a,b) => a - b);
        copyArray = [...new Set(copyArray)]
        let start = 0;
        let end = copyArray.length - 1;
        const tree = this.createTree(copyArray, start, end);
        return tree;
        }
    createTree(array, start, end) {
     if(start > end ) {
        return null;
     }
     const mid = Math.floor((start + end) / 2)
     const newNode = new Node(array[mid]);
     newNode.left = this.createTree(array,start,mid - 1)
     newNode.right = this.createTree(array, mid + 1, end)
     return newNode;
    }
   insert(data) {
    const newNode = new Node(data);
    if(this.root === null) {
        this.root = newNode;
        return this;
    }

    let current = this.root;
    while(current) {
        if(data === current.data) {
            return undefined;
        }
        if(data < current.data) {
            if(current.left === null) {
                current.left = newNode;
                return this;
            }
            current = current.left
        } else {
            if(current.right === null) {
                current.right = newNode;
                return this
            }
            current = current.right;
        }
    }
   }
   delete(data) {
    this.root = this.deleteNode(this.root, data);
}

deleteNode(root, data) {
    if(root === null) {
        return root
    }
    if(data < root.data) {
        root.left = this.deleteNode(root.left, data)
    } else if(data > root.data) {
        root.right = this.deleteNode(root.right, data);
    } else {
        if(!root.right && !root.left) {
            return null;
        }
        if(!root.left) {
            return root.right;
        } else if(!root.right) {
            root.left;
        }
        root.data = this.findMin(root.right)
        root.right = this.deleteNode(root.right, root.data);
    }
    return root;
}

findMin(root) {
   if(!root.left) {
    return root.data;
   } else {
    return this.findMin(root.left)
   }
}

   find(data) {
    let current = this.root;
    while(current) {
        if(data === current.data) {
            return true;
        } 
        if(data < current.data) {
            current = current.left;
        } else if ( data > current.data) {
            current = current.right;
        }
    }
   
   }
  levelOrder(callback) {
    let queue = [];

    let nextNode = this.root;

    queue.push(nextNode);

    while(queue.length>0) {
        nextNode = queue.shift();

        if(nextNode.left) {
            queue.push(nextNode.left);
        }

        if(nextNode.right) {
            queue.push(nextNode.right)
        }

        callback(nextNode.data);
    }
  }

  inOrder(callback) {
    const traverse = (node) => {
        if(node) {
            traverse(node.left);
            callback(node);
            traverse(node.right);
        }
    };
    traverse(this.root);
  }

  preOrder(callback) {
    const traverse = (node) => {
        if(node) {
            callback(node);
            traverse(node.left);
            traverse(node.right);
        }
    };
    traverse(this.root);
  }
  
postOrder(callback) {
    const traverse = (node) => {
    if(node) {
        traverse(node.left);
        traverse(node.right);
        callback(node)
    }
    };
    traverse(this.root);
}

height(root) {
    if(!root) {
        return 0;
    }
    const leftHeight = this.height(root.left);
    const rightHeight = this.height(root.right);
    return Math.max(leftHeight, rightHeight) + 1
}

depth(node) {
    if(!node) {
        return 0;
    }
    const leftDepth = this.depth(node.left);
    const rightDepth = this.depth(node.right);
    return Math.max(leftDepth, rightDepth) + 1;
}

isBalanced(root) {
  if(root === null) {
     return true;
  }
  const leftHeight = this.height(root.left);
  const rightHeight = this.height(root.right);
  const heightDiff = Math.abs(leftHeight - rightHeight);
  if(heightDiff > 1) {
    return false
  } else {
    return true;
  }
}

rebalance() {
    if(this.isBalanced(this.root)) {
        return;
    }
    let nodes = [];
    this.inOrder((node) => nodes.push(node.data));

   this.root = this.buildTree(nodes);
}

}

const array = [1,7,4,23,8,9,4,3,5,7,8,67,6345,324];
const treeTest = new Tree(array);


const Node1 = treeTest.insert(19);
const Node2 = treeTest.insert(2);
const Node3 = treeTest.insert(7000);
const Node4 = treeTest.insert(8000);
const Node5 = treeTest.insert(9000);
const Node6 = treeTest.insert(10000);
treeTest.rebalance();
console.log(treeTest.buildTree(array));


const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
 
  treeTest.inOrder((node) => console.log(node.data))
  prettyPrint(treeTest.root);
console.log(treeTest.isBalanced(treeTest.root));
  

  
