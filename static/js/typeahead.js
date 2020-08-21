const search = document.getElementById('search');
const matchList = document.getElementById('match-list');
let symptoms;

// Search diseases.json and filter it

const getSymptoms = async () => {
    const res = await fetch('static/data/symptoms.json');
    // symptoms is list of objects
    /*
        symptoms = [{ id: 1,
            name: 'symptom-name'
        }, ... ]
     */
    symptoms = await res.json();
};

const searchSymptoms = searchText => {

//    get matches to current text input
    let matches = symptoms.filter(symptom => {
        const symptomsRegex = new RegExp(`^${searchText}`, 'gi');
        return symptom.name.match(symptomsRegex);
    });

    if (searchText.length === 0) {
        matches = [];
        matchList.innerHTML = "";
    }

    outputHtml(matches);
};

const outputHtml = matches => {
    if (matches.length > 0) {
        const html = matches.map(match => `
           <button class="card card-body pb-2 autocomplete-check" id="symptom${match.id}" onclick="putSymptom(${match.id})">
               <h4>${match.name}</h4>
           </button>
        `).join('');
        matchList.innerHTML = html;
    }
};

const putSymptom = elementId => {
    let symptom = document.getElementById('symptom'+elementId).innerText;
    search.value = symptom;
};

window.addEventListener('DOMContentLoaded', getSymptoms);
search.addEventListener('input', () => searchSymptoms(search.value));