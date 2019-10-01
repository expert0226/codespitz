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
        const f = (a, b) => a['_' + sort] > b['_' + sort] ? 1 : -1;
        return {
            task: this,
            list: !stateGroup ? list.sort(f) : [
                ...list.filter(v => !v.isComplete()).sort(f),
                ...list.filter(v => v.isComplete()).sort(f)
            ]
        }
    }
};

// User Story
{
    const list1 = new Task("비사이드");

    list1.add("지라 클라우드 접속");
    list1.add("지라 설치");

    const list2 = new Task("s3-4");
    list2.add("2강 답안 작성");
    list2.add("3강 교안 작성");

    const { list } = list2.byDate();

    list[1].add("코드 정리");
    list[1].add("다이어그램 정리");

    console.log(list);
    console.log(list2);
}