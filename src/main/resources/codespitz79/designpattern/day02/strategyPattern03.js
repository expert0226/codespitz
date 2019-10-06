class Github {
    constructor(userId, repoName) {
        this._githubUriTemplate = `https://api.github.com/repos/${userId}/${repoName}/contents/`;
    }

    load(path) {
        const callback = `callback${Github._callbackId++}`;
        // Strategy Pattern 인 경우
        // 실행 시점에 this._loaded 가 가장 최근 것에 매핑되는 상황 발생
        // imageLoader / MdLoader 연속 호출 시에
        // iamgeLoader 가 MdLoader 의 _loaded 를 실행하는 버그 발생
        const parser = this._parser;
        Github[callback] = ({ data: { content }}) => {
            delete Github[callback];
            document.head.removeChild(callbackScript);
            // this._parser(content);
            parser(content);
        };
        const callbackScript = document.createElement("script");
        callbackScript.src = `${this._githubUriTemplate + path}?callback=Github.${callback}`;
        document.head.appendChild(callbackScript);
    }

    set parser(parser) { this._parser = parser; }
}

Github._callbackId = 0;

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

const imgParser = content => getHtmlTagUsingHtmlTagId("#a").src = 'data:text/plain;base64,' + content;
const mdParser = content => getHtmlTagUsingHtmlTagId("#b").innerHTML = parseMD(content);

const subPath = "src/main/resources/codespitz79/designpattern/";

{
    const github = new Github('expert0226', 'codespitz');

    github.parser = imgParser;
    github.load(`${subPath}mvc.jpg`);

    github.parser = mdParser;
    github.load(`${subPath}ReadMe.md`);
}