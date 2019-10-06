class Github {
    constructor(userId, repoName) {
        this._githubUriTemplate = `https://api.github.com/repos/${userId}/${repoName}/contents/`;
    }

    load(path) {
        const callback = `callback${Github._callbackId++}`;
        const { parser, args } = this._command;
        Github[callback] = ({ data: { content }}) => {
            delete Github[callback];
            document.head.removeChild(callbackScript);
            parser(content, ...args);
        };
        const callbackScript = document.createElement("script");
        callbackScript.src = `${this._githubUriTemplate + path}?callback=Github.${callback}`;
        document.head.appendChild(callbackScript);
    }

    set command(command) {
        this._command = command;
    }
}

Github._callbackId = 0;

class Command {
    constructor(parser, ...args) {
        this._parser = parser;
        this._args = args;
    }

    get parser() { return this._parser; }
    get args() { return this._args; }
}

class Loader {
    constructor(githubId, githubRepoName) {
        this._github = new Github(githubId, githubRepoName);
        this._router = new Map;
    }

    add(ext, command) {
        ext.toLowerCase().split(",").forEach(v => this._router.set(v, command));
    }

    load(path) {
        const ext = path.split(".").pop().toLowerCase();
        if (!this._router.has(ext)) return;
        this._github.command = this._router.get(ext);
        this._github.load(path);
    }
}

const d64 = content => decodeURIComponent(
    atob(content).split("").map(char => "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2)).join("")
);

function parseMD(content) {
    return d64(content).split("\n").map(lineContent => {
        let i = 3;
        while (i--) {
            if(lineContent.startsWith("#".repeat(i + 1))) return `<h$[i+1}>${lineContent.substr(i + 1)}</h${i + 1}>`;
        }
        return lineContent;
    }).join("<br>");
}

const getHtmlTagUsingHtmlTagId = htmlTagId => document.querySelector(htmlTagId);

const imgParser = (content, htmlImageTag) => htmlImageTag.src = 'data:text/plain;base64,' + content;
const mdParser = (content, htmlTag) => htmlTag.innerHTML = parseMD(content);

const subPath = "src/main/resources/codespitz79/designpattern/";

{
    const loader = new Loader('expert0226', 'codespitz');

    const imgCommand = new Command(imgParser, getHtmlTagUsingHtmlTagId("#a"));
    loader.add("jpg,png", imgCommand);
    loader.load(`${subPath}mvc.jpg`);

    const mdCommand = new Command(mdParser, getHtmlTagUsingHtmlTagId("#b"));
    loader.add("md", mdCommand);
    loader.load(`${subPath}ReadMe.md`);
}