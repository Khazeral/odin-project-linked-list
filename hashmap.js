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

  checking() {
    if (this.length() / this.bucket.length >= this.loadfactor) {
      let oldArray = [...this.bucket];
      let addedAray = new Array(this.capacity).fill(null);
      let NewArray = oldArray.concat(addedAray);
      this.bucket = NewArray;
      this.capacity = 2 * this.capacity;
    }
  }

  set(key, value) {
    let hashCode = this.hash(key);
    this.buckets[hashCode] = value;
    this.keyValue[hashCode] = key;
    this.checking();
  }

  get(key){
    let hashCode = this.hash(key)
    return this.buckets[hashCode] ?? null
  }

  //prend une clé comme argument et renvoie trueou falseselon que la clé est ou non dans la table de hachage.
  has(key){

  }

  //Prend une clé comme argument. Si la clé donnée est présente dans la table de hachage, l'entrée contenant cette clé doit être supprimée et 
  // renvoyée true. Si la clé n'est pas présente dans la table de hachage, la fonction doit renvoyer false.
  remove(key){

  }

  //renvoie le nombre de clés stockées dans la carte de hachage.
  length(){

  }

  //supprime toutes les entrées de la table de hachage.
  clear(){

  }

  //renvoie un tableau contenant toutes les clés à l'intérieur de la carte de hachage.
  keys(){

  }

  //renvoie un tableau contenant toutes les valeurs.
  values(){

  }

  //Renvoie un tableau contenant chaque key, valuepaire. Exemple :[[firstKey, firstValue], [secondKey, secondValue]]
  entries(){

  }
}
