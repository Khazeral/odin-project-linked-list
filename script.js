class Node {
    constructor() {
      this.value = null;
      this.next = null;
    }
  }
  
  class LinkedList {
    constructor() {
      this.head = null;
    }
    
    append(value) {
      let node = new Node();
      node.value = value;
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
  }
  
  // 🔹 Création de la liste
  let list = new LinkedList();
  
  // 🔹 Test 1 : Ajouter un élément dans une liste vide
  list.append(10);
  console.log(list.head.value === 10); // true
  console.log(list.head.next === null); // true
  
  // 🔹 Test 2 : Ajouter plusieurs éléments
  list.append(20);
  list.append(30);
  console.log(list.head.value === 10); // true
  console.log(list.head.next.value === 20); // true
  console.log(list.head.next.next.value === 30); // true
  console.log(list.head.next.next.next === null); // true
  
  // 🔹 Test 3 : Vérifier que `next` pointe bien vers le bon élément
  let temp = list.head;
  while (temp.next !== null) {
    temp = temp.next;
  }
  console.log(temp.value === 30); // true (dernier élément)
  