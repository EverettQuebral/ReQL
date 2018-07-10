let hash = function(x){
    return x * x;
}
class HashTable {
    constructor(){
        this.list = [];
    }

    get(x){
        return this.list[hash(x)]
    }

    set(x, y){
        this.list[hash(x)] = y;
    }
}


const x = new HashTable();
x.set(1, 1);
x.set(2, 1);

console.log(x.get(1));