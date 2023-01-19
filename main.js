Object.defineProperty(Document.prototype, "appendComponentToDOM", {
    value: function (component) {
        const wrapper = this.getElementById("card-wrapper");
        wrapper.insertAdjacentHTML("beforeend", component);
    },
});

Object.defineProperty(Document.prototype, "play", {
    value: function (data, checkBoxValue, iniRange, endRange) {
        let cardStack = Object.entries(data).slice(iniRange, endRange);
        if (checkBoxValue) cardStack.shuffle();
        let id = 0;
        for (const card of cardStack) {
            let component = new Component(card[1].pregunta, card[1].q1, card[1].q2, card[1].q3, card[1].q4, id);
            this.appendComponentToDOM(component.getComponent());
            component.setCorrectTrigger();
            id++;
        }
    },
});

Object.defineProperty(Document.prototype, "prepareData", {
    value: function () {
        // Get the raw data from the DOM and remove all the double quotes
        const raw_data = this.getElementById('raw-data').innerText.replace(/"/g, '');

        // Split the data by ';' and ',' and store it in a 2D array
        const splitted_data = raw_data.split(';').map((e) => e.split(','));

        // Remove spaces at the beginning and end of each element
        for (let i = 0; i < splitted_data.length; i++) {
            for (let j = 0; j < splitted_data[i].length; j++) {
                splitted_data[i][j] = splitted_data[i][j].trim();
            }
        }

        // delete the first element in splitted_data array
        splitted_data.shift();

        // delete the last element in splitted_data array
        splitted_data.pop();

        // Construct the global main data object
        const data = {};
        for (let i = 0; i < splitted_data.length; i++) {
            data[i] = {
                'tema': splitted_data[i][0],
                'pregunta': splitted_data[i][1],
            }

            for (let j = 2; j < splitted_data[i].length - 1; j++) {
                data[i][`q${j - 1}`] = {
                    'enunciado': splitted_data[i][j],
                    'correcta': splitted_data[i][splitted_data[i].length - 1] == splitted_data[i][j] ? true : false
                }
            }
        }

        return data;
    },
});

Object.defineProperty(Array.prototype, "shuffle", {
    value: function () {
        for (let i = this.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this[i], this[j]] = [this[j], this[i]];
        }
    },
});

const setChanges = function (data) {
    let checkBoxValue = this.getElementById('randomize-checkbox').checked;
    let iniRange = parseInt(this.getElementById('ini-value').value);
    let endRange = parseInt(this.getElementById('end-value').value);

    if (iniRange < 0 || endRange > 71 || iniRange > endRange) {
        alert('Modo sexo solo [0, 71]');
        return;
    } else if (iniRange == endRange) {
        alert('Modo sexo solo [0, 71] y no [0, 0]');
        return;
    }
    
    this.getElementById('card-wrapper').innerHTML = '';
    this.play(data, checkBoxValue, iniRange, endRange);
    this.getElementById('c-score').innerHTML = 0;
    this.getElementById('i-score').innerHTML = 0;
};

document.addEventListener("DOMContentLoaded", function () {
    let data = this.prepareData();

    // convert data to an array
    data = Object.values(data);

    this.play(data, 0, 0, 71);
    this.getElementById('btn-set-changes').addEventListener('click', setChanges.bind(this, data));
});