class Component {
    constructor(title, q1, q2, q3, q4, id) {
        this.check = false;
        this.title = title;
        this.a1 = q1;
        this.a2 = q2;
        this.a3 = q3;
        this.a4 = q4;
        this.id = id + 1;
    }

    #randomize(value) {
        const questions = [this.a1, this.a2, this.a3, this.a4];
        console.log(value);
        if (value) questions.shuffle();
        return `
            <li data-value='${questions[0].correcta}'>${questions[0].enunciado}</li>
            <li data-value='${questions[1].correcta}'>${questions[1].enunciado}</li>
            <li data-value='${questions[2].correcta}'>${questions[2].enunciado}</li>
            <li data-value='${questions[3].correcta}'>${questions[3].enunciado}</li>
        `;
    }

    getComponent(randomizeValue) {
        return `<div class='card' id='${this.id}'>
                              <h1>${this.title}</h1>
                                  <ul id='ul-${this.id}'>
                                    ${this.#randomize(randomizeValue)}
                                  </ul>
                              </div>`;
    }

    #checkAnswere(li) {
        if (li.getAttribute("data-value") === "true") {
            li.style.textDecoration = "underline";
            li.style.backgroundColor = "#3dfc89";
            if (!this.check) {
                document.getElementById("c-score").innerHTML =
                    parseInt(document.getElementById("c-score").innerHTML) + 1;
            }
        }

        if (li.getAttribute("data-value") === "false") {
            li.style.textDecoration = "line-through";
            if (!this.check) {
                document.getElementById("i-score").innerHTML =
                    parseInt(document.getElementById("i-score").innerHTML) + 1;
            }
        }

        this.check = true;
    }

    setCorrectTrigger() {
      const liArray = Array.from(
        document.getElementById(`ul-${this.id}`).children
      );

      liArray.forEach((e) => {
        e.addEventListener("click", this.#checkAnswere.bind(this, e));
      });
    }
}