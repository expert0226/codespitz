class DataSupplier {
    constructor(uri) {
        this._uri = uri;
    }

    async getInfo() {
        if (typeof this._uri == "string") {
            const response = await fetch(this._uri);
            return await response.json();
        } else
            return this._uri;
    }
}

class Renderer {
    constructor(htmlTagId) {
        if (typeof htmlTagId != "string" || !htmlTagId) throw "invalid param";
        this._htmlTagId = htmlTagId;
    }

    async render(dataSupplier) {
        if(!(dataSupplier instanceof DataSupplier)) throw "invalid data type";
        this._info = await dataSupplier.getInfo()
        this._render();
    }

    async _render() {
        const { title, header, items } = this._info;
        if(typeof title != "string" || !title) throw "invalid title";
        if(!Array.isArray(header) || !header.length) throw "invalid header";
        if(!Array.isArray(items) || !items.length) throw "invalid header";

        // 부모, 데이터 체크
        const htmlTag = document.querySelector(this._htmlTagId);
        if(!htmlTag) throw "invalid parent element";

        if(!items || !items.length) {
            htmlTag.innerHTML = "no data";
            return;
        } else htmlTag.innerHTML = "";

        const [ table, caption, thead ] = "table,caption,thead".split(",").map(v => document.createElement(v));

        caption.innerHTML = title;

        // table 생성
        // title 을 caption 으로
        table.appendChild(caption);
        header.forEach (thData =>
            thead.appendChild(document.createElement("th")).innerHTML = thData
        );
        table.appendChild(thead);

        // items 를 각각 tr 로
        items.forEach(trData =>
            table.appendChild(
                trData.reduce((tr, tdData) => {
                    tr.appendChild(document.createElement("td")).innerHTML = tdData;
                    return tr;
                }, document.createElement("tr"))
            )
        );

        // 부모에 table 삽입
        htmlTag.appendChild(table)
    }
}

const dataSupplier = new DataSupplier("75_1.json");
let renderer;

renderer = new Renderer("#data");
renderer.render(dataSupplier);