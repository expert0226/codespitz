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
    setVisitor(visitor) {
        this.visitor = visitor;
    }

    render({ task, list }) {
        // const v = this.visitor.folder(task);
        this.visitor.folder(task);
        // this.subTask(this.visitor.parent(v, task), list);
        this.visitor.parent(task);
        this.subTask(list);
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

// const Visitor = class {
//     folder(task) { throw "override"; }
//     parent(v, task) { throw "override"; }
//     task(v, task) { throw "override"; }
// };

Renderer.Visitor = class {
    constructor() { this.prop = Object.create(null); }
    folder(task) { throw "override"; }
    parent(v, task) { throw "override"; }
    task(v, task) { throw "override"; }
};

// const DomVisitor = class extends Visitor {
//     constructor(parent) {
//         super();
//         this._p = parent;
//     }
//
//     folder({ _title: title }) {
//         const parent = document.querySelector(this._p);
//         parent.innerHTML = "";
//         parent.appendChild(el("h1", { innerHTML: title }));
//         return parent;
//     }
//
//     parent(v, _) {
//         return v.appendChild(el("ul"))
//     }
//
//     task(v, { _title: title }) {
//         const li = v.appendChild(el("li"));
//         li.appendChild(el("div", { innerHTML: title }));
//         return li;
//     }
// };

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
    }

    task(task) {
        const li = el("li");
        li.appendChild(el("div", { innerHTML: task._title }));
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

    const todo = new Renderer();

    todo.setVisitor(new DomVisitor("#a"));
    todo.render(folder.list("title"));
    //
    // todo.setVisitor(new ConsoleVisitor());
    // todo.render(folder.list("title"));
}