const Sort = class {
    static title = (a, b) => a.sortTitle(b);
    static date = (a, b) => a.sortDate(b);

    sortTitle(task) { throw "override"; }
    sortDate(task) { throw "override"; }
};

const Task = class extends Sort {
    static get(title, date = null) { return new Task(title, date); }

    constructor(title, date) {
        super();
        if(!title) throw "invalid title";
        this._title = title;
        this._date = date;
        this._isComplete = false;
    }

    isComplete() { return this._isComplete; }
    toggle() { this._isComplete = !this._isComplete; }
    sortTitle(task) { return this._title > task._title ? 1 : -1; }
    sortDate(task) { return this._date > task._date ? 1 : -1; }
};

const TaskList = class {
    constructor(title) {
        if(!title) throw "invalid title";
        this._title = title;
        this._list = [];
    }

    add(title, date) { this._list.push(Task.get(title, date)); }
    remove(task) {
        const list = this._list;
        if(list.includes(task)) list.splice(list.indexOf(task), 1);
    }

    byTitle(stateGroup = true) { return this._getList(Sort.title, stateGroup); }
    byDate(stateGroup = true) { return this._getList(Sort.date, stateGroup); }
    _getList(sort, stateGroup) {
        const list = this._list;
        return !stateGroup ? list.sort(sort) : [
            ...list.filter(v => !v.isComplete()).sort(sort),
            ...list.filter(v => v.isComplete()).sort(sort)
        ]
    }
};

// User Story
{
    const list1 = new TaskList("비사이드");

    list1.add("지라 설치");
    list1.add("지라 클라우드 접속");

    const list2 = new TaskList("s3-4");
    list2.add("2강 답안 작성", "2019-09-01");
    list2.add("3강 교안 작성", "2019-10-01");

    console.log(list1.byTitle());
    console.log(list2.byDate());
}

{
    const list1 = new TaskList("비사이드");

    list1.add("지라 클라우드 접속");
    list1.add("지라 설치");

    const list2 = new TaskList("s3-4");
    list2.add("2강 답안 작성", "2019-11-30");
    list2.add("3강 교안 작성", "2019-10-31");

    console.log(list1.byTitle());
    console.log(list2.byDate());
}