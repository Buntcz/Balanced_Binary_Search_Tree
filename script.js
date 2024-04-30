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
    let current = this.root
    if(data < current.data && current.left) {
        current.left = current.left.delete(data);
    } else if(data > current.data && current.right) {
        current.right = current.right.delete(data);
    } else {
        if(data === current.data) {
            if(current.right && current.left) {
                let minVal = current.right.findMin();
                current.data = minVal;
                current.right = current.right.delete(minVal)
            }
            else if(current.left) {
                return current.left;
            } else if(current.right) {
                return current.right
            } else {
                return null;
            }
        }
        return current
    }
}

findMin() {
    let current = this.root
    if(current.left) {
        return current.left.findMin();
    } else {
        return current.data;
    }
}

   find(data) {
    let current = this.root;
    while(current) {
        if(data === current.data) {
            return data;
        }
        if(data < current.data) {
            current = current.left;
        } else if ( data > current.data) {
            current = current.right;
        }
    }
    return current;
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
}

const array = [1,7,4,23,8,9,4,3,5,7,8,67,6345,324];
const treeTest = new Tree(array);

console.log(treeTest.insert(18))
treeTest.delete(67)
console.log(treeTest.buildTree(array))


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
 
  prettyPrint(treeTest.root)