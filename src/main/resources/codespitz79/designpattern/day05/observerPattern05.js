const Task = class {
    constructor(title, date) {
        this._title = title;
        this._date = date;
        this._isComplte = false;
        this._list = [];
    }

    isComplete() { return this._isComplete; }
    toggle() { this._isComplete = !this._isComplete; }

    add(title, date = null) { this._list.push(new Task(title, date)); }
    remove(task) {
        const list = this._list;
        if(list.includes(task)) list.splice(list.indexOf(task), 1);
    }

    byTitle(useGroupSort = true) { return this.sortBy("title", useGroupSort); }
    byDate(useGroupSort = true) { return this.sortBy("date", useGroupSort); }

    sortBy(sort, useGroupSort = true) {
        const list = this._list;
        const comparator = (a, b) => a['_' + sort] > b['_' + sort] ? 1 : -1;
        const mapper = task => task.sortBy(sort, useGroupSort);
        return {
            task: this,
            list: !useGroupSort ? list.sort(comparator).map(mapper) : [
                ...list.filter(v => !v.isComplete()).sort(comparator).map(mapper),
                ...list.filter(v => v.isComplete()).sort(comparator).map(mapper)
            ]
        }
    }
};

const el = (tag, attr = {}) => Object.entries(attr).reduce((el, v) => {
    typeof el[v[0]] == "function" ? el[v[0]](v[1]) : el[v[0]] = v[1];
    return el;
}, document.createElement(tag));

const Renderer = class {
    setVisitor(visitor) {
        this.visitor = visitor;
        visitor.setObserver(this);
    }

    observe(type) { type == "reRender" && this.reRender(); }

    reRender() {
        this.oldList && this.render(this.oldList);
    }

    render(list) {
        this.oldList = list;
        this.visitor.folder(list.task);
        this.visitor.parent(list.task);
        this.subTask(list.list);
    }

    subTask(list) {
        list.forEach(({ task, list }) => {
            // const v = this.visitor.task(parent, task);
            this.visitor.task(task);
            // this.subTask(this.visitor.parent(v, this), list);
            if(list.length) {
                this.visitor.parent(task);
                this.subTask(list);
            }
        })
    }
};

Renderer.Visitor = class {
    constructor() {
        this.prop = Object.create(null);
        this._taskDecoratior = TaskDecorator.base;
    }

    observe(msg) { this.notify(msg); }

    setObserver(observer) { this.observer = observer; }
    notify(msg) { this.observer && this.observer.observe(msg); }

    taskDecorator(...taskDecorators) {
        taskDecorators.forEach(taskDecorator => this._taskDecoratior = taskDecorator.set(this._taskDecoratior));
    }

    taskRender(task) {
        this._taskDecoratior.setObserver(this);
        return this._taskDecoratior.task(this.prop.parentTask, task);
    }

    folder(task) { throw "override"; }
    parent(v, task) { throw "override"; }
    task(v, task) { throw "override"; }
};

const DomVisitor = class extends Renderer.Visitor {
    constructor(parent) {
        super();
        this._p = parent;
    }

    folder({ _title: title }) {
        const parent = document.querySelector(this._p);
        parent.innerHTML = "";
        parent.appendChild(el("h1", { innerHTML: title }));
        this.prop.parent = parent;
    }

    parent(task) {
        const ul = el("ul");
        this.prop.parent.appendChild(ul);
        this.prop.parent = ul;
        this.prop.parentTask = task;
    }

    task(task) {
        const li = el("li", { innerHTML: this.taskRender(task)});
        // li.appendChild(el("div", { innerHTML: task._title }));
        this.prop.parent.appendChild(li);
        this.prop.parent = li;
    }
};

const ConsoleVisitor = class extends Renderer.Visitor {
    folder({ _title: title }) {
        console.log("---------------");
        console.log("folder: ", title);
        return '';
    }

    parent(v, task) {
        return v;
    }

    task(v, { _title: title }) {
        console.log(v, title);
        return v + '--';
    }
};

// Decorator
const TaskDecorator = class {
    setObserver(observer) {
        this.observer = observer;
    }

    notify(msg) {
        this.observer && this.observer.observe(msg);
    }

    set(prevTaskDecorator) { this._prevTaskDecorator = prevTaskDecorator; return this; }

    task(parent, task) {
        this.result = this._prevTaskDecorator ? this._prevTaskDecorator.task(parent, task) : task._title;
        return this._task(parent, task);
    }

    _task(parent, task) { throw "override!" }
};

// End Point
TaskDecorator.base = new (class extends TaskDecorator {
    _task(parent, task) { return this.result; }
});

const PriorityDecorator = class extends TaskDecorator {
    _task(parent, task) {
        return this.result.replace(
            /(urgent|high|normal|low)/gi, `<span class='$1'>$1</span>`
        )
    }
};

const MemberDecorator = class extends TaskDecorator {
    constructor(...members) {
        super();
        this._reg = new RegExp(`(${members.join('|')})`, "g");
    }

    _task(task, parent) {
        return this.result.replace(
            this._reg, '<a href="member/$1">$1</a>'
        )
    }
};

const RemoveDecorator = class extends TaskDecorator {
    constructor(render) {
        super();
    //     this._render = render;
    }

    _task(parent, task) {
        const id = RemoveDecorator.id++;
        RemoveDecorator[id] = _ => {
            delete RemoveDecorator[id];
            parent.remove(task);
            // this._render();
            this.notify("reRender");
        };

        return `<a onclick="RemoveDecorator[${id}]()">[x]</a> ${this.result}`;
    }
};

RemoveDecorator.id = 0;

// User Story
//{
    const folder = new Task("s3-4");

    folder.add("2강 교안 작성");
    folder.add("3강 교안 작성");

    const { list } = folder.sortBy("title");

    list[1].task.add("urgent ppt 정리");
    list[1].task.add("코드 normal 정리");

    const { list: sublist } = list[1].task.sortBy("title");

    sublist[1].task.add("슬라이드 hika 마스터 hika 정리 high");
    sublist[1].task.add("low 디자인 개선");
    sublist[1].task._isComplete = true;

    const domVisitor = new DomVisitor("#a");

    const removeTaskDocorator = new RemoveDecorator();
    removeTaskDocorator.setObserver(domVisitor);

    domVisitor.taskDecorator(
        removeTaskDocorator,
        new MemberDecorator("hika", "hika"),
        new PriorityDecorator()
    );

    const todo = new Renderer();
    todo.setVisitor(domVisitor);
    todo.render(folder.sortBy('title'));
//}