class Github {
    constructor(id, repo) {
        this._base = `https://api.github.com/repos/${id}/${repo}/contents/`;
    }

    load(path) {
        const id = `callback${Github._id++}`;
        Github[id] = ({ data: { content }}) => {
            delete Github[id];
            document.head.removeChild(s);
            this._parser[0](content, ...this._parser[1]);
        };
        const s = document.createElement("script");
        s.src = `${this._base + path}?callback=Github.${id}`;
        document.head.appendChild(s);
    }

    setParser(f, ...arg) { this._parser = [f, arg]; }
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

const github = new Github('feng-fu', 'demo');

const img = (v, el) => el.src = 'data:text/plain;base64,' + v;
github.setParser(img, el("#a"));
github.load('source/3.png');

const github2 = new Github('expert0226', 'oopinspring');

const md = (v, el) => el.innerHTML = parseMD(v);
github2.setParser(md, el("#b"));
github2.load("README.md");