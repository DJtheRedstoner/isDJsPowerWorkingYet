// const apiHost = "http://127.0.0.1:8787/";
const apiHost = "https://poweroutage.djtheredstoner.workers.dev/"

const secondMS = 1000;
const minuteMS = secondMS * 60;
const hourMS = minuteMS * 60;
const dayMS = hourMS * 24;

(async () => {
    const data = await fetch(apiHost).then(it => it.json());

    console.log(data);

    const poweroff = data.start;
    const poweron = data.end;

    const element = document.createElement("h1");
    if (poweron) {
        element.className = "yes";
        element.innerText = "Yes!";
    } else {
        element.className = "no";
        element.innerText = "No!";
    }
    document.querySelector(".main").insertAdjacentElement("afterbegin", element);

    if (data.comment) {
        const comment = document.createElement("p");
        comment.className = "comment";
        comment.innerHTML = data.comment;

        document.querySelector(".time").insertAdjacentElement("afterend", comment);
    }

    setInterval(() => {
        const diff = (poweron ?? Date.now()) - poweroff;
    
        const days = Math.floor(diff / dayMS);
        const hours = Math.floor((diff % dayMS) / hourMS);
        const minutes = Math.floor((diff % hourMS) / minuteMS);
        const seconds = Math.floor((diff % minuteMS) / secondMS);
    
        document.querySelector(".time").innerHTML = `Time without power: ${days} Days, ${hours} Hours, ${minutes} Minutes, ${seconds} Seconds`;
    }, 10);
})();
