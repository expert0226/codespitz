class Github {
    constructor(id, repo) {
        this._base = `https://api.github.com/repos/${id}/${repo}/contents/`;
    }

    load(path) {
        const id = `callback${Github._id++}`;
        Github[id] = ({data: {content}}) => {
            delete Github[id];
            document.head.removeChild(s);
            this._parser[0](content, ...this._parser[1]);
        };
        const s = document.createElement("script");
        s.src = `${this._base + path}?callback=Github.${id}`;
        document.head.appendChild(s);
    }

    setParser(f, ...arg) {
        this._parser = [f, arg];
    }
}

Github._id = 0;

const d64 = v => decodeURIComponent(
    atob(v).split("").map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join("")
);

function parseMD(v) {
    return d64(v).split("\n").map(v => {
        let i = 3;
        while (i--) {
            if (v.startsWith("#".repeat(i + 1))) return `<h$[i+1}>${v.substr(i + 1)}</h${i + 1}>`;
        }
        return v;
    }).join("<br>");
}

class Loader {
    constructor(id, repo) {
        this._git = new Github(id, repo);
        this._router = new Map;
    }

    add(ext, f, ...arg) {
        ext.split(",").forEach(v => this._router.set(v, [f, ...arg]));
    }

    load(v) {
        const ext = v.split(".").pop();
        if (!this._router.has(ext)) return;
        this._git.setParser(...this._router.get(ext));
        this._git.load(v);
    }
}

const el = v => document.querySelector(v);

const loader = new Loader('feng-fu', 'demo');
const img = (v, el) => el.src = 'data:text/plain;base64,' + v;
loader.add("jpg,png", img, el("#a"));
loader.load("source/3.png");

const loader2 = new Loader('expert0226', 'codespitz');
const md = (v, el) => el.innerHTML = parseMD(v);
loader2.add("md", md, el("#b"));
loader2.load("src/main/resources/codespitz79.designpattern/ReadMe.md");