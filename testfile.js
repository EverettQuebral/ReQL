class A {
    constructor(a, b, c, d,){
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
    }

    print(){
        return this.a + this.b + this.c + this.d;
    }
}


const B = new A(1, 2, 3, 4);
B.print();