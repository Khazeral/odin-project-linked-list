class HashMap {
    constructor(initialCapacity = 16, loadFactor = 0.75) {
      this.capacity = initialCapacity;
      this.loadFactor = loadFactor;
      this.size = 0;
      this.buckets = new Array(this.capacity).fill(null).map(() => []);
    }
  
    hash(key) {
      let hashCode = 0;
      const primeNumber = 31;
      for (let i = 0; i < key.length; i++) {
        hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
      }
      return hashCode;
    }
  
    resize() {
      if (this.size / this.capacity >= this.loadFactor) {
        const oldBuckets = this.buckets;
        this.capacity *= 2;
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
        this.size = 0;
  
        for (const bucket of oldBuckets) {
          for (const [key, value] of bucket) {
            this.set(key, value);
          }
        }
      }
    }
  
    set(key, value) {
      let index = this.hash(key);
      let bucket = this.buckets[index];
  
      for (let pair of bucket) {
        if (pair[0] === key) {
          pair[1] = value; // Mise à jour si la clé existe déjà
          return;
        }
      }
  
      bucket.push([key, value]);
      this.size++;
      this.resize();
    }
  
    get(key) {
      let index = this.hash(key);
      let bucket = this.buckets[index];
  
      for (let [k, v] of bucket) {
        if (k === key) return v;
      }
  
      return null;
    }
  
    has(key) {
      let index = this.hash(key);
      let bucket = this.buckets[index];
  
      for (let [k, _] of bucket) {
        if (k === key) return true;
      }
  
      return false;
    }
  
    remove(key) {
      let index = this.hash(key);
      let bucket = this.buckets[index];
  
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          bucket.splice(i, 1);
          this.size--;
          return true;
        }
      }
  
      return false;
    }
  
    length() {
      return this.size;
    }
  
    clear() {
      this.buckets = new Array(this.capacity).fill(null).map(() => []);
      this.size = 0;
    }
  
    keys() {
      let allKeys = [];
      for (let bucket of this.buckets) {
        for (let [key, _] of bucket) {
          allKeys.push(key);
        }
      }
      return allKeys;
    }
  
    values() {
      let allValues = [];
      for (let bucket of this.buckets) {
        for (let [_, value] of bucket) {
          allValues.push(value);
        }
      }
      return allValues;
    }
  
    entries() {
      let result = [];
      for (let bucket of this.buckets) {
        for (let pair of bucket) {
          result.push(pair);
        }
      }
      return result;
    }
  }
  

// Création de la table de hachage avec un facteur de charge de 0.75
const test = new HashMap();

// Ajout des éléments initiaux
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

// Vérification de la longueur après insertion
console.assert(test.length() === 12, "Erreur : la longueur après insertion des éléments devrait être 12");

// Écrasement des valeurs existantes
test.set('apple', 'green');
test.set('banana', 'dark yellow');

// Vérification que les valeurs ont bien été mises à jour
console.assert(test.get('apple') === 'green', "Erreur : la valeur de 'apple' devrait être 'green'");
console.assert(test.get('banana') === 'dark yellow', "Erreur : la valeur de 'banana' devrait être 'dark yellow'");

// Vérification que la longueur n'a pas changé après écrasement
console.assert(test.length() === 12, "Erreur : la longueur ne doit pas changer après écrasement");

// Ajout d'un élément supplémentaire pour dépasser le load factor et déclencher l'expansion
test.set('moon', 'silver');

// Vérification de l'agrandissement de la capacité (elle devrait être doublée)
console.assert(test.capacity === 32, "Erreur : la capacité devrait être doublée à 32");

// Vérification que les anciennes valeurs existent toujours après expansion
console.assert(test.get('apple') === 'green', "Erreur : 'apple' devrait toujours exister après expansion");
console.assert(test.get('moon') === 'silver', "Erreur : 'moon' devrait être 'silver'");

// Suppression d'un élément existant
console.assert(test.remove('apple') === true, "Erreur : 'apple' devrait être supprimé");
console.assert(test.get('apple') === null, "Erreur : 'apple' ne devrait plus être présent");

// Suppression d'un élément inexistant
console.assert(test.remove('unknown') === false, "Erreur : la suppression d'une clé inexistante devrait retourner false");

// Vérification de la méthode has()
console.assert(test.has('banana') === true, "Erreur : 'banana' devrait exister");
console.assert(test.has('apple') === false, "Erreur : 'apple' ne devrait plus exister");

// Vérification des méthodes keys(), values(), et entries()
console.assert(Array.isArray(test.keys()), "Erreur : keys() devrait retourner un tableau");
console.assert(Array.isArray(test.values()), "Erreur : values() devrait retourner un tableau");
console.assert(Array.isArray(test.entries()), "Erreur : entries() devrait retourner un tableau");

// Vérification du clear()
test.clear();
console.assert(test.length() === 0, "Erreur : après clear(), la longueur devrait être 0");
console.assert(test.keys().length === 0, "Erreur : après clear(), keys() devrait être vide");
console.assert(test.values().length === 0, "Erreur : après clear(), values() devrait être vide");

console.log("✅ Tous les tests sont passés avec succès !");
