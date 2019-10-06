class Github {
    constructor(userId, repoName) {
        this._githubUriTemplate = `https://api.github.com/repos/${userId}/${repoName}/contents/`;
    }

    load(path) {
        const callback = `callback${Github._callbackId++}`;
        Github[callback] = ({ data: { content }}) => {
            delete Github[callback];
            document.head.removeChild(callbackScript);
            this._loaded(content);
        };
        const callbackScript = document.createElement("script");
        callbackScript.src = `${this._githubUriTemplate + path}?callback=Github.${callback}`;
        document.head.appendChild(callbackScript);
    }

    _loaded(content) { throw "override!"; }
}

Github._callbackId = 0;

class ImageLoader extends Github {
    constructor(githubId, githubRepoName, jsonpScript) {
        super(githubId, githubRepoName);
        this._jsonpScript = jsonpScript;
    }
    _loaded(content) {
        this._jsonpScript.src = 'data:text/plain;base64,' + content;
    }
}

class MdLoader extends Github {
    constructor(githubId, githubRepoName, jsonpScript) {
        super(githubId, githubRepoName);
        this._jsonpScript = jsonpScript;
    }
    _loaded(content) {
        this._jsonpScript.innerHTML = this._parseMD(content);
    }
    _parseMD(content) {
        return d64(content).split("\n").map(lineContent => {
            let i = 3;
            while (i--) {
                if(lineContent.startsWith("#".repeat(i + 1))) return `<h$[i+1}>${lineContent.substr(i + 1)}</h${i + 1}>`;
            }
            return lineContent;
        }).join("<br>");
    }
}

const d64 = content => decodeURIComponent(
    atob(content).split("").map(char => "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2)).join("")
);

const subPath = "src/main/resources/codespitz79/designpattern/";

{
    const s75img = new ImageLoader('expert0226', 'codespitz', document.querySelector('#a'));
    s75img.load(`${subPath}mvc.jpg`);

    const s75md = new MdLoader("expert0226", "codespitz", document.querySelector("#b"));
    s75md.load(`${subPath}ReadMe.md`);
}