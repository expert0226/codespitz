class Github {
    constructor(id, repo) {
        this._base = `https://api.github.com/repos/${id}/${repo}/contents/`;
    }

    load(path) {
        const id = `callback${Github._id++}`;
        Github[id] = ({ data: { content }}) => {
            delete Github[id];
            document.head.removeChild(s);
            this._loaded(content);
        };
        const s = document.createElement("script");
        s.src = `${this._base + path}?callback=Github.${id}`;
        document.head.appendChild(s);
    }

    _loaded(v) { throw "override!"; }
}

Github._id = 0;

class ImageLoader extends Github {
    constructor(id, repo, target) {
        super(id, repo);
        this._target = target;
    }
    _loaded(v) {
        this._target.src = 'data:text/plain;base64,' + v;
    }
}

class MdLoader extends Github {
    constructor(id, repo, target) {
        super(id, repo);
        this._target = target;
    }
    _loaded(v) {
        this._target.innerHTML = this._parseMD(v);
    }
    _parseMD(v) {
        return d64(v).split("\n").map(v => {
            let i = 3;
            while (i--) {
                if(v.startsWith("#".repeat(i + 1))) return `<h$[i+1}>${v.substr(i + 1)}</h${i + 1}>`;
            }
            return v;
        }).join("<br>");
    }
}

const d64 = v => decodeURIComponent(
    atob(v).split("").map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join("")
);

const s75img = new ImageLoader('expert0226', 'codespitz', document.querySelector('#a'));
s75img.load("src/main/resources/codespitz79/designpattern/mvc.jpg");

const s75md = new MdLoader("expert0226", "codespitz", document.querySelector("#b"));
s75md.load("src/main/resources/codespitz79/designpattern/ReadMe.md");