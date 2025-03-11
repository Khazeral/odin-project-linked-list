class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  append(value) {
    let node = new Node(value);
    if (this.head === null) {
      this.head = node;
    } else {
      let temp = this.head;
      while (temp.next !== null) {
        temp = temp.next;
      }
      temp.next = node;
    }
  }

  prepend(value) {
    let node = new Node(value);
    if (this.head === null) {
      this.head = node;
    } else {
      let temp = this.head;
      this.head = node;
      node.next = temp;
    }
  }

  size() {
    let sum = 0;
    let currentNode = this.head;
    while (currentNode) {
      sum++;
      currentNode = currentNode.next;
    }
    return sum;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.next === null) {
        return currentNode;
      }
      currentNode = currentNode.next;
    }
    return currentNode;
  }

  atIndex(index) {
    if (index === -1) return null;
    let currentIndex = 0;
    let currentNode = this.head;
    while (currentIndex < index) {
      currentIndex++;
      if (currentNode.next === null) {
        return null;
      }
      currentNode = currentNode.next;
    }
    return currentNode;
  }

  pop() {
    let currentNode = this.head;
    if (!currentNode) {
      return;
    }
    if (!currentNode.next) {
      this.head = null;
      return currentNode;
    }
    while (currentNode.next) {
      if (!currentNode.next.next) {
        currentNode.next = null;
        return currentNode;
      }
      currentNode = currentNode.next;
    }
    return;
  }

  contains(value) {
    let currentNode = this.head;
    if (!currentNode) {
      return;
    }
    while (currentNode) {
      if (currentNode.value === value) {
        return true;
      } else {
        if (!currentNode.next) {
          return false;
        }
        currentNode = currentNode.next;
      }
    }
  }

  find(value) {
    let currentIndex = 0;
    let currentNode = this.head;
    if (!currentNode) {
      return null;
    }
    while (currentNode) {
      if (currentNode.value === value) {
        return currentIndex;
      } else {
        if (!currentNode.next) {
          return null;
        }
        currentNode = currentNode.next;
        currentIndex++;
      }
    }
  }

  toString() {
    let stringFinal = "";
    let currentNode = this.head;
    if (!currentNode) {
      stringFinal += " null ";
    }
    while (currentNode) {
      stringFinal += `( ${currentNode.value} )`;

      if (!currentNode.next) {
        stringFinal += ` -> null `;
        return stringFinal;
      }
      currentNode = currentNode.next;
      stringFinal += ` -> `;
    }
    return stringFinal;
  }

  insertAt(value, index) {
    if (index < 0 || index > this.size()) {
      return;
    }

    const node = new Node();
    node.value = value;
    if (index === 0) {
      this.prepend(value);
      return;
    }

    let currentNode = this.head;
    let previousNode;
    let currentIndex = 0;
    while (currentIndex < index) {
      previousNode = currentNode;
      currentNode = currentNode.next;
      currentIndex++;
    }

    previousNode.next = node;
    node.next = currentNode;
  }

  removeAt(index) {
    if (index < 0 || index >= this.size()) {
      return;
    }

    let currentNode = this.head;

    if (index === 0) {
      this.head = currentNode.next;
      return;
    }

    let previousNode;
    let currentIndex = 0;

    while (currentIndex < index) {
      previousNode = currentNode;
      currentNode = currentNode.next;
      currentIndex++;
    }

    previousNode.next = currentNode.next;
  }
}
