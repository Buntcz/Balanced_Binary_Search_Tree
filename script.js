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
        let end = array.length - 1;
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
    const node = this.root;
    if(node === null) {
        this.root = new Node(data);
        return;
    } else {
        const searchTree = function(node) {
            if(data < node.data) {
                if(node.left === null) {
                    node.left = new Node(data);
                    return
                } else if(node.left !== null) {
                    return searchTree(node.left);
                }
            } else if ( data > node.data) {
                if(node.right === null) {
                    node.right = new Node(data);
                } else if(node.right !== null) {
                    return searchTree(node.right)
                }
            } else {
                return null;
            }
        }
        return searchTree(node);
    }
   }
   delete(root, data) {
    if(root === null) {
        return root;
    }
    if(key < root.key) {
        root.left = this.delete(root.left, data);
    } else if(key > root.key) {
        root.right = this.delete(root.right, data);
    } else {
        if(root.left === null) {
            return root.right;
        } else if(root.right === null) {
            return root.left;
        }
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
   *levelOrder() {
    const queue = [];
    if(this.root) {
        queue.push(this.root);
        while (queue.length) {
            const node = queue.shift();
            yield node.nodeValue;
            if(node.left) {
                queue.push(node.left)
            } else if(node.right) {
                queue.push(node.right)
            }
            this.height++
        }
    }
   }

   inOrder() {
    let current = this.root;
    if(current === null) {
        return;
    }
   }
}

const array = [1,7,4,23,8,9,4,3,5,7,8,67,6345,324];
const treeTest = new Tree(array);

console.log(treeTest.buildTree(array))
console.log(treeTest.find(3))