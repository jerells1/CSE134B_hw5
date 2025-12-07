const projectTemplate = document.createElement("template");

projectTemplate.innerHTML = `
<style>
    :host {
        display: block;
        border-radius: 10px;
        border-style: solid;
        width: 20%;
    }
    h1 {
        color: black;
    }
</style>
<h2 id="title">
</h2>
<picture id="proj-pic">
    <source />
    <img/>
</picture>
<p id="description"></p>
<a id="read-more"></a>
`

class ProjectCard extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({mode: "open"})
        shadow.append(projectTemplate.content.cloneNode(true))

        //Create references to elements in shadow DOM
        this._titleEl = this.shadowRoot.querySelector("#title");
        this._picEl  = this.shadowRoot.querySelector("img");
        this._sourceEl = this.shadowRoot.querySelector("source");
        this._descriptionEl = this.shadowRoot.querySelector("#description")
        this._readMoreEl = this.shadowRoot.querySelector("#read-more");
    }

    connectedCallback() {
        console.log("element is added");
        this.updateDOM();
    }

    set title(value) {
        this._title = value;
        this.updateDOM();
    }

    get title() {
        return this._title;
    }

    set pic(url) {
        this._picURL = url;
        this.updateDOM();
    }

    get pic() {
        return this._picURL;
    }

    set altText(altText) {
        this._altText = altText;
        this.updateDOM();
    }

    set description(value) {
        this._description = value;
        this.updateDOM();
    }

    get description() {
        return this._description;
    }

    set readMore(value) {
        this._readMore = value;
        this.updateDOM();
    }

    get readMore() {
        return this._readMore;
    }

    updateDOM() {
        if(this._title){this._titleEl.textContent = this._title};
        if(this._description){this._descriptionEl.textContent = this._description};
        if(this._picEl){this._picEl.src = this._picURL};
        if(this._readMore) {this._readMoreEl.textContent = this._readMore};
        if(this._altText) {this._picEl.alt = this._altText};
    }
}

function createCard(options) {
    const defaults = {
        title: "untitled",
        description: "No description",
        picURL: '',
        sourceURL: '',
        readMoreURL: '',
        altText: 'image'
    }

    const val = {...defaults,...options};

    const card = document.createElement("project-card");
    for(const value in val) {
        card[value] = val[value]
        console.log(val[value]);
    }
    return card;
}

const host = document.getElementById("projects");
customElements.define("project-card",ProjectCard);

let test = createCard();
host.appendChild(test);