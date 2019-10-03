const Table = (_ => {
    const Private = Symbol();

    return class {
        constructor(htmlTagId) {
            if (typeof htmlTagId != "string" || !htmlTagId) throw "invalid param";
            this[Private] = { htmlTagId };
        }

        async load(url) {
            const response = await fetch(url);
            if (!response.ok) throw "invalid response";
            const { title, header, items } = await response.json();
            if (!items.length) throw "no items";
            Object.assign(this[Private], { title, header, items });
            this.render();
        }

        render() {
            const { htmlTagId, title, header, items } = this[Private];

            // 부모, 데이터 체크
            const htmlTag = document.querySelector(htmlTagId);
            if(!htmlTag) throw "invalid parent element";
            if(!items || !items.length) {
                htmlTag.innerHTML = "no data";
                return;
            } else htmlTag.innerHTML = "";

            // table 생성
            const table = document.createElement("table");
            // title 을 caption 으로
            const caption = document.createElement("caption");
            caption.innerHTML = title;
            table.appendChild(caption);

            // header 를 thead 로
            table.appendChild(
                header.reduce((thead, headThData) => {
                    const th = document.createElement("th");
                    th.innerHTML = headThData;
                    thead.appendChild(th);
                    return thead;
                }, document.createElement("thead"))
            );

            // items 를 tr 로

            // items.map(
            //     item => item.reduce((tr, data) => {
            //         const td = document.createElement("td");
            //         td.innerHTML = data;
            //         tr.appendChild(td);
            //         return tr;
            //     }, document.createElement("tr"))
            // ).forEach(tr => table.appendChild(tr));

            // items.reduce((table, item) => {
            //     table.appendChild(
            //         item.reduce((tr, data) => {
            //            const td = document.createElement("td");
            //            td.innerHTML = data;
            //            tr.appendChild(td);
            //            return tr;
            //         }, document.createElement("tr"))
            //     );
            //     return table;
            // }, table);

            // items.map(
            //     item => {
            //         const tr = document.createElement("tr");
            //         item.map(
            //             data => {
            //                 const td = document.createElement("td");
            //                 td.innerHTML = data;
            //                 tr.appendChild(td);
            //             }
            //         );
            //         table.appendChild(tr);
            //     }
            // );

            items.forEach(trData => {
                const tr = document.createElement("tr");
                trData.forEach(tdData => {
                    const td = document.createElement("td");
                    td.innerHTML = tdData;
                    tr.appendChild(td);
                });
                table.appendChild(tr);
            });

            // 부모에 table 삽입
            htmlTag.appendChild(table)
        }
    };
})();

const table = new Table("#data");
table.load("75_1.json");