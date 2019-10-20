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

const ConsoleRenderer = class {
    render(data) {
        const { task: { _title: title }, list } = data;
        console.log("---------------");
        console.log("folder: ", title);
        this._render("", list);
    }

    _render(indent, list) {
        list.forEach(({ task: { _title: title }, list}) => {
            console.log(indent + title );
            this._render(indent + '--', list);
        })
    }
};

// User Story
{
    const folder = new Task("s3-4");

    folder.add("2강 교안 작성");
    folder.add("3강 교안 작성");

    const { list } = folder.sortBy("title");

    list[1].task.add("ppt 정리");
    list[1].task.add("코드 정리");

    const { list: sublist } = list[1].task.sortBy("title");

    sublist[1].task.add("슬라이드 마스터 정리");
    sublist[1].task.add("디자인 개선");
    sublist[1].task._isComplete = true;

    const todo = new DomRenderer("#a");

    todo.render(folder.sortBy("title"));
    // console.log(folder.list("title"));

    const consoleRenderer = new ConsoleRenderer();

    consoleRenderer.render(folder.sortBy("title"));
}