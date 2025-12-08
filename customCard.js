const projectTemplate = document.createElement("template");

projectTemplate.innerHTML = `
<style>
    :host {
        display: flex;
        flex-direction: column;
        border-radius: 10px;
        width: 20vw;
        height: 35vh;
        max-width: 400px;
        max-height: 50vw;
        justify-content: center;
        align-items: center;
        font-family:'system-ui','sans-serif';
        background-color: #1B3C53;
        border-style: none;
        color: white;
        vertical-align: middle;
        margin: 5px;
    }
    h2 {
        font-size: 2em;
        text-align: center;
    }
    picture {
        display: block;
        width: 100%;
        max-height: 50%;
        overflow: hidden;
        text-align: center;
        margin: 0;
        background-color: #234C6A;
    }
    img, source {
        max-width: 100%;
        margin: auto;
        object-fit: contain;
        border-radius: 10px
    }

    p {
        padding: 5px;
        margin: 0;
        height: auto;
        width: auto;
        display: inline-block;
        flex: 1;
        min-width: 0;
    }

    #read-more {
        color: #4FC3F7;
        cursor: pointer;
        text-decoration: underline;
        margin-top: 0;
        display: inline-block;
        width: auto;
        white-space: nowrap;
        padding-right: 5px;
    }
    
    #read-more:hover {
        color: #81D4FA;
    }

    #bottom-text {
        display: flex;
        align-items: center;
        gap: 8px;
        wiidth: 100%;
        margin-top: 10px;
    }
</style>
<h2 id="title">
</h2>
<picture id="proj-pic">
    <source />
    <img/>
</picture>
<div id="bottom-text">
    <p id="description"></p>
    <a href="javascript:void(0)" id="read-more">Read More</a>
</div>

`

const localProjects = [
 {
    title: "Next Gen Sequencing",
    description: "Responsible for processing data for downstream analysis. Preprocessed raw reads into FastQ files, performed filtering and trimming of samples, mapped samples to reference genome, and generated QC reports.",
    sourceURL: "assets/aviti.jpg",
    picURL: "assets/picture4_0.jpg",
    altText: "Image of Aviti sequencer"
 },
 {
    title: "Bioinformatics scripting",
    description: "Developed scripts for automating common tasks for linux environments that reduced manual input times by half.",
    sourceURL: "assets/coding-background-9izlympnd0ovmpli.jpg",
    picURL: "assets/download.jpeg",
    altText: "image of code"
 },
 {
    title: "Laboratory Technician",
    description: "Handled specimens coming into the lab. Inventorying new projects, preparing samples for processing, clipping samples to be digested, and storing completed projects in the warehouse.",
    sourceURL: "assets/labtech.jpg",
    picURL: "assets/labtech2.jpg",
    altText: "Image of a scientist"
 }
]

const remoteURL = 'https://api.jsonbin.io/v3/b/69366ead43b1c97be9df0994';



if(!localStorage.getItem("projectData")) {
    localStorage.setItem("projectsData",JSON.stringify(localProjects));
}

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
        this._readMoreEl.addEventListener('click',this.readInit.bind(this));

        this._isExpanded = false;
        this._fullDescription = '';
        this._visibleDescription = '';
        this._maxLength = 50;
    }

    readInit(event) {
        event.preventDefault();
        this.handleReadMoreClick();
    } 

    handleReadMoreClick() {
        console.log("working");
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

    set sourceURL(url) {
        this._sourceURL = url;
        this.updateDOM();
    }

    get sourceURL() {
        return this._sourceURL;
    }

    set picURL(url) {
        this._picURL = url;
        this.updateDOM();
    }

    get picURL() {
        return this._picURL;
    }

    set altText(altText) {
        this._altText = altText;
        this.updateDOM();
    }

    set description(value) {
        this._fullDescription = value;

        if(value.length > this._maxLength) {
            this._visibleDescription = value.substring(0,this._maxLength) + "...";
            this._description = this._visibleDescription;
            this._readMoreEl.style.display = "inline-block";
        }
        else {
            this._visibleDescription = '';
            this._description = value;
            this._readMoreEl.style.display = 'none';
        }

        this.updateDOM();
    }

    get description() {
        return this._fulllDescription;
    }

    set readMore(value) {
        this._readMore = value;
        this.updateDOM();
    }

    get readMore() {
        return this._readMore;
    }
    
    handleReadMoreClick() {
        console.log("working");
        this._isExpanded = !this._isExpanded;
        
        if (this._isExpanded) {
            this._descriptionEl.textContent = this._fullDescription;
            this._readMoreEl.textContent = 'Read Less';
            this.style.height = 'auto';
            this.style.maxHeight = 'none';
        } else {
            this._descriptionEl.textContent = this._visibleDescription;
            this._readMoreEl.textContent = 'Read More';
            this.style.height = '35vh';
            this.style.maxHeight = '50vw';
        }
    }

    updateDOM() {
        if(this._title){this._titleEl.textContent = this._title};
        if(this._description){this._descriptionEl.textContent = this._description};
        if(this._picEl){this._picEl.src = this._picURL};
        if(this._sourceURL){this._sourceEl.srcset = this._sourceURL};
        if(this._readMore) {this._readMoreEl.textContent = this._readMore};
        if(this._altText) {this._picEl.alt = this._altText};

    }
}

function createCard(options) {
    const defaults = {
        title: "untitled",
        description: "No description But his is a tekldsajlkfdsajfklsadjfd;skl fjsdkl;",
        picURL: 'assets/download.jpeg',
        sourceURL: '/assets/aviti.jpg',
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

customElements.define("project-card",ProjectCard);

document.addEventListener('DOMContentLoaded',init);

function init() {
    const localBtn = document.getElementById("localbtn");
    const remoteBtn = document.getElementById("remotebtn");
    const projectsContainer = document.getElementById("projects");
    let loadedLocal = false;
    let loadedRemote = false;

    localBtn.addEventListener("click",function() {
        console.log("Loading Local");
        loadFromLocal();
    });

    remoteBtn.addEventListener("click",function() {
        console.log("Loading Remote");
        loadFromRemote();
    });

    function loadFromLocal() {
        try {
            const proj = localStorage.getItem("projectsData");
            if(proj && !loadedLocal) {
                const projects = JSON.parse(proj);
                displayProjects(projects);
                loadedLocal = true;
                console.log("Showing projects from local");
            }
            else {
                console.log("Data empty or already loaded");
                if(loadedLocal) {
                    projectsContainer.innerHTML = '';
                    loadedLocal = false;
                }
            }
        }
        catch(error) {
            console.error("Error loading data from localStorage: ",error);
        }
    }

    async function loadFromRemote() {
        console.log("Loading from remote");
        try {
            const response = await fetch(remoteURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(!response.ok) {
                throw new Error('Error loading remote data: ', response.status);
            }

            const result = await response.json();
            const projects = result.record;

            displayProjects(projects);
        }
        catch(error) {
            console.log("Error loadiing from remote server", error);
        }
    }


    function displayProjects(projects) {
        for(const item of projects) {
            const card = createCard(item);
            projectsContainer.appendChild(card);
        }
    }

}
