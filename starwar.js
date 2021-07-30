let character_div = document.getElementById("character");

var timerId;

async function charNames() {
    let query = document.getElementById("query").value;

    if (query.length <= 2) {
        return false;
    }

    let res = await fetch(`https://swapi.dev/api/people/?search=${query}`);

    let data = await res.json();
    //  console.log(data);
    let { results } = data;
    console.log(results);
    return results;
}

function throttleFunction() {
    if (timerId) {
        return false;
    }

    timerId = setTimeout(() => {
        main();
        timerId = undefined;
    }, 500);
}

function appendNames(d) {
    character_div.innerHTML = null;
    d.forEach(({ name, gender, birth_year }) => {
        console.log(name, gender);

        var totalDiv = document.createElement("div");

        let nameDiv = document.createElement("div");

        let genderDiv = document.createElement("div");

        let birthDiv = document.createElement("div");

        let name_p = document.createElement("p");

        let gender_p = document.createElement("p");
        // name_p.innerText = null;

        // gender_p.innerText = null;

        totalDiv.innerText = null;
        //  div.setAttribute("id", "info");
        // name_p.innerHTML = `< p onclick = "info()" > < /p>`;

        totalDiv.addEventListener("click", info);
        name_p.innerText = name;

        gender_p.innerText = capitalize(gender);
        birthDiv.innerText = birth_year;

        name_p.style.marginBottom = "0%";

        name_p.style.marginTop = "1%";
        name_p.setAttribute("id", "charName");
        nameDiv.append(name_p, birthDiv);

        genderDiv.append(gender_p);
        totalDiv.append(nameDiv, genderDiv);
        character_div.append(totalDiv);
    });

    function info() {
        let name = document.getElementById("charName");

        console.log(name.innerHTML);

        //  window.location.href = "info.html";
    }
}

async function main() {
    let results = await charNames();
    appendNames(results);
}

function capitalize(str) {
    let lower = str.toLowerCase();
    return str.charAt(0).toUpperCase() + lower.slice(1);
}