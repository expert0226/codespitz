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

    byTitle(stateGroup = true) { return this.list("title", stateGroup); }
    byDate(stateGroup = true) { return this.list("date", stateGroup); }

    list(sort, stateGroup = true) {
        const list = this._list;
        const comparator = (a, b) => a['_' + sort] > b['_' + sort] ? 1 : -1;
        const mapper = task => task.list(sort, stateGroup);
        return {
            task: this,
            list: !stateGroup ? list.sort(comparator).map(mapper) : [
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

const DomRenderer = class {
    constructor(parent) {
        this._parent = parent;
    }

    render(data) {
        const { task: { _title: title }, list } = data;
        const parent = document.querySelector(this._parent);
        parent.innerHTML = "";
        parent.appendChild(el("h1", { innerHTML: title }));
        parent.appendChild(this._render(el("ul"), list));
    }

    _render(parent, list) {
        list.forEach(({ task, list }) => {
            const checkbox = el("input", { type: "checkbox", checked: task.isComplete() });
            const div = el("div", { innerHTML: task._title });
            div.appendChild(checkbox);

            const li = parent.appendChild(el("li"));
            li.appendChild(div);
            if(list.length) li.appendChild(this._render(el("ul"), list));
        });
        return parent;
    }
};

// User Story
{
    const folder = new Task("s3-4");

    folder.add("2강 교안 작성");
    folder.add("3강강 교안 작성");

    const { list } = folder.list("title");

    list[1].task.add("ppt 정리");
    list[1].task.add("코드 정리");

    const { list: sublist } = list[1].task.list("title");

    sublist[1].task.add("슬라이드 마스터 정리");
    sublist[1].task.add("디자인 개선");
    sublist[1].task._isComplete = true;

    const todo = new DomRenderer("#a");

    todo.render(folder.list("title"));
    console.log(folder.list("title"))
}