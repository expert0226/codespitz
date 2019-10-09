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

    byTitle(useGroupSort = true) { return this.list("title", useGroupSort); }
    byDate(useGroupSort = true) { return this.list("date", useGroupSort); }

    list(sort, useGroupSort = true) {
        const list = this._list;
        const comparator = (a, b) => a['_' + sort] > b['_' + sort] ? 1 : -1;
        const mapper = task => task.list(sort, useGroupSort);
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
    render({ task, list }) {
        const v = this._folder(task);
        this.subTask(this._parent(v, task), list);
    }

    subTask(parent, list) {
        list.forEach(({ task, list }) => {
            const v = this._task(parent, task);
            this.subTask(this._parent(v, this), list);
        })
    }

    _folder(task) { throw "override"; }
    _parent(v, task) { throw "override"; }
    _task(v, task) { throw "override"; }
};

const DomRenderer_old = class {
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

const DomRenderer = class extends Renderer {
    constructor(parent) {
        super();
        this._p = parent;
    }

    _folder({ _title: title }) {
        const parent = document.querySelector(this._p);
        parent.innerHTML = "";
        parent.appendChild(el("h1", { innerHTML: title }));
        return parent;
    }

    _parent(v, _) {
        return v.appendChild(el("ul"))
    }

    _task(v, { _title: title }) {
        const li = v.appendChild(el("li"));
        li.appendChild(el("div", { innerHTML: title }))
        return li;
    }
};

const ConsoleRenderer_old = class {
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

const ConsoleRenderer = class extends Renderer {
  _folder({ _title: title }) {
      console.log("---------------");
      console.log("folder: ", title);
      return '';
  }

  _parent(v, task) {
      return v;
  }

  _task(v, { _title: title }) {
      console.log(v, title);
      return v + '--';
  }
};

// User Story
{
    const folder = new Task("s3-4");

    folder.add("2강 교안 작성");
    folder.add("3강 교안 작성");

    const { list } = folder.list("title");

    list[1].task.add("ppt 정리");
    list[1].task.add("코드 정리");

    const { list: sublist } = list[1].task.list("title");

    sublist[1].task.add("슬라이드 마스터 정리");
    sublist[1].task.add("디자인 개선");
    sublist[1].task._isComplete = true;

    const todo = new DomRenderer("#a");

    todo.render(folder.list("title"));
    // console.log(folder.list("title"));

    const consoleRenderer = new ConsoleRenderer();

    consoleRenderer.render(folder.list("title"));
}