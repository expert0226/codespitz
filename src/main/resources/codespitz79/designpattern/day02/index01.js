// 1. 대체 가능성
// 2. 내적 일관성(동질성)
class Parent {
    warp() { this.action(); }
    action() { console.log("Parent"); }
}
class Child extends Parent {
    action() { console.log("Child"); }
}

const a = new Child();
console.log(a instanceof Parent);
a.action();
a.warp();