class Github {
    constructor(id, repo) {
        this._base = `https://api.github.com/repos/${id}/${repo}/contents/`;
    }

    load(path) {
        const id = `callback${Github._id++}`;
        const parser = this._parser;
        Github[id] = ({ data: { content }}) => {
            delete Github[id];
            document.head.removeChild(s);
            // Strategy Pattern 인 경우
            // 실행 시점에 this._loaded 가 가장 최근 것에 매핑되는 상황 발생
            // imageLoader / MdLoader 연속 호출 시에
            // iamgeLoader 가 MdLoader 의 _loaded 를 실행하는 버그 발생
            // this._parser(content);
            parser(content);
        };
        const s = document.createElement("script");
        s.src = `${this._base + path}?callback=Github.${id}`;
        document.head.appendChild(s);
    }

    set parser(v) { this._parser = v; }
}

Github._id = 0;

const d64 = v => decodeURIComponent(
    atob(v).split("").map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join("")
);

function parseMD(v) {
    return d64(v).split("\n").map(v => {
        let i = 3;
        while (i--) {
            if(v.startsWith("#".repeat(i + 1))) return `<h$[i+1}>${v.substr(i + 1)}</h${i + 1}>`;
        }
        return v;
    }).join("<br>");
}

const el = v => document.querySelector(v);

const github = new Github('expert0226', 'codespitz');

const img = v => el("#a").src = 'data:text/plain;base64,' + v;
github.parser = img;
github.load("src/main/resources/codespitz79/designpattern/mvc.jpg");

const md = v => el("#b").innerHTML = parseMD(v);
github.parser = md;
github.load("src/main/resources/codespitz79/designpattern/ReadMe.md");