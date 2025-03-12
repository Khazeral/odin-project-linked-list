class Node {
    constructor(value){
        this.value = value ?? null;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arrayNodes){
        this.root = this.init(arrayNodes)
    }

    buildTree(array, start, end){
        if(start > end) return null
        let mid = Math.floor((start + end) /2)
        const root = new Node(array[mid])
        root.left = this.buildTree(array, start, mid-1)
        root.right = this.buildTree(array, mid+1, end)
        this.prettyPrint(root)
        return root
    }

    init(array){
        const sortedArray = this.sort(array)
        return this.buildTree(sortedArray, 0, sortedArray.length -1)
    }

    sort(array){
        return array.sort((a,b) => a - b)
    }

    prettyPrint = (node, prefix = "", isLeft = true) => {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
      };
    
    insert(value, node = this.root) {
       if(node.value === null){
        node.value = value
       }else{
        if(node.value != value){
            if(node.value > value){
                if(node.left === null) node.left = new Node(value)
                else return this.insert(value, node.left)
            }else{
                if(node.right === null) node.right = new Node(value)
                    else return this.insert(value, node.right)
            }
        }
       }

    }

    delete(value, node= this.root, prevNode = this.root){
        if (value == node.value ) {
            if(node.left === null && node.right === null){
                if(prevNode.left == node){
                    prevNode.left = null
                }else{
                    prevNode.right = null
                }
            }else if( node.right === null){
                if(prevNode.left == node) {
                    prevNode.left = node.left
                }else{
                    prevNode.right = node.left
                }
                
            }else if( node.left === null){
                if(prevNode.left == node) {
                    prevNode.left = node.right
                }else{
                    prevNode.right = node.right
                }
                
            }else{
                let successor = node.right;
                let successorParent = node;

                while (successor.left !== null) {
                    successorParent = successor;
                    successor = successor.left;
                }

                node.value = successor.value;

                if (successorParent.left === successor) {
                    successorParent.left = successor.right;
                } else {
                    successorParent.right = successor.right;
                }
            }
        }else{
            if(node.value > value && node.left !== null) return this.delete(value, node.left, node)
            if(node.value < value && node.right !== null) return this.delete(value, node.right, node)
        }
        
        
    }

    find(value, node=this.root){
        if(node.value === value){
            return node
        }else{
            if(node.value > value && node.left !== null) return this.find(value, node.left)
            if(node.value < value && node.right !== null) return this.find(value, node.right)
        }
    
    }

    levelOrder(fn, queue = [this.root]){
        if(fn === null) throw new Error("The callback is not declared")
        if(queue.length === 0) return
        const node = queue.shift();
        fn(node)
        if(node.left !== null ) queue.push(node.left)
        if(node.right !== null) queue.push(node.right)
        this.levelOrder(fn, queue)
    }

    height(node){   
        if (node === null) {
            return -1;
        }
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
    
        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(node){
        let depth = 0;
        while (node !== null) {
            node = node.parent;
            depth++;
        }
        return depth;
    }

    
}



const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

tree.delete(23); // Suppression d'un nœud avec un seul enfant
console.log("✅ Suppression de 23 (nœud avec un seul enfant)");
tree.prettyPrint(tree.root);

tree.delete(7);  // Suppression d'un nœud avec deux enfants
console.log("✅ Suppression de 7 (nœud avec deux enfants)");
tree.prettyPrint(tree.root);
