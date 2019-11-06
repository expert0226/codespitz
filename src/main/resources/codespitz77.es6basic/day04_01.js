let MyIterator = {
    [Symbol.iterator]() {
        return this;
    },
    data: [{ a: [1, 2, 3, 4], b: '-' }, [5, 6, 7], 8, 9],
    next() {
        let v;

        while(v = this.data.shift()) {
            switch (true) {
                case Array.isArray(v):
                    this.data.unshift(...v);
                    console.log(this.data);
                    break;
                case v && typeof v == 'object':
                    for(const k in v) this.data.unshift(v[k]);
                    console.log(this.data);
                    break;
                default:
                    return { value: v, done: false };
            }
        }

        return { done: true }
    }
};

for (let i of MyIterator) {
    console.log(i);
}

console.log();
console.log("loop 2");
console.log();

let MyIterator2 = {
    [Symbol.iterator]() {
        return this;
    },
    data: [{ a: 7, b: '-' }, [5, 6, 7], 8, 9],
    next() {
        let v;

        while(v = this.data.shift()) {
            switch (true) {
                case Array.isArray(v):
                    this.data.unshift(...v);
                    console.log(this.data);
                    break;
                case v && typeof v == 'object':
                    for(const k in v) this.data.unshift(v[k]);
                    console.log(this.data);
                    break;
                default:
                    return { value: v, done: false };
            }
        }

        return { done: true }
    }
};

for (let i of MyIterator2) {
    console.log(i);
}

console.log();
console.log("loop 3");
console.log();

let MyIterator3 = {
    [Symbol.iterator]() {
        return this;
    },
    data: [{ a: [1, 2, 3, 4], b: '-' }, [5, 6, 7], 8, 9],
    next() {
        let v;

        while(v = this.data.shift()) {
            if(!(v instanceof Object)) return { value: v };
            if(!Array.isArray(v)) v = Object.values(v);
            this.data.unshift(...v);
        }

        return { done: true }
    }
};

for (let i of MyIterator3) {
    console.log(i);
}

console.log();
console.log("loop 4");
console.log();

const Compx = class {
    constructor(data) { this.data = data; }
    [Symbol.iterator]() {
        const data = JSON.parse('[' + JSON.stringify(this.data) + ']');
        return {
            next() {
                let v;

                while (v = data.shift()) {
                    if (!(v instanceof Object)) return {value: v};
                    if (!Array.isArray(v)) v = Object.values(v);
                    data.unshift(...v);
                }

                return {done: true}
            }
        };
    }
};

const a = new Compx([{ a: [1, 2, 3, 4], b: '-' }, [5, 6, 7], 8, 9]);

console.log(...a);
console.log(...a);