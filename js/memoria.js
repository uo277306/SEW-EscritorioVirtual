class Memoria {
    elements = [
        {
            "element": "HTML5",
            "source": "https://upload.wikimedia.org/wikipedia/commons/3/38/HTML5_Badge.svg"
        },
        {
            "element": "HTML5",
            "source": "https://upload.wikimedia.org/wikipedia/commons/3/38/HTML5_Badge.svg"
        },
        {
            "element": "CSS3",
            "source": "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg"
        },
        {
            "element": "CSS3",
            "source": "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg"
        },
        {
            "element": "JS",
            "source": "https://upload.wikimedia.org/wikipedia/commons/b/ba/Javascript_badge.svg"
        },
        {
            "element": "JS",
            "source": "https://upload.wikimedia.org/wikipedia/commons/b/ba/Javascript_badge.svg"
        },
        {
            "element": "PHP",
            "source": "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg"
        },
        {
            "element": "PHP",
            "source": "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg"
        },
        {
            "element": "SVG",
            "source": "https://upload.wikimedia.org/wikipedia/commons/4/4f/SVG_Logo.svg"
        },
        {
            "element": "SVG",
            "source": "https://upload.wikimedia.org/wikipedia/commons/4/4f/SVG_Logo.svg"
        },
        {
            "element": "W3C",
            "source": "https://upload.wikimedia.org/wikipedia/commons/5/5e/W3C_icon.svg"
        },
        {
            "element": "W3C",
            "source": "https://upload.wikimedia.org/wikipedia/commons/5/5e/W3C_icon.svg"
        }
    ];

    constructor() {
        this.resetBoard();
        this.shuffleElements();
        this.createElements();
        this.addEventListeners();
    }

    shuffleElements() {
        for (let i = this.elements.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [this.elements[i], this.elements[j]] = [this.elements[j], this.elements[i]];
        }
    }

    unflipCards() {
        this.lockBoard = true;
        setTimeout(() => {
            delete this.firstCard.dataset.state;
            delete this.secondCard.dataset.state;

            this.resetBoard();
        }, 1000);
    }

    resetBoard() {
        this.hasFlippedCard = false;
        this.lockBoard = false;
        this.firstCard = null;
        this.secondCard = null;
    }

    checkForMatch() {
        this.firstCard.dataset.element === this.secondCard.dataset.element ? this.disableCards() : this.unflipCards();
    }

    disableCards() {
        this.firstCard.dataset.state = "revealed";
        this.secondCard.dataset.state = "revealed";

        this.resetBoard();
    }

    createElements() {
        const section = document.getElementsByTagName("section")[0];
        this.elements.forEach(element => {
            const article = document.createElement("article");
            article.dataset.element = element.element;

            const articleTitle = document.createElement("h3");
            articleTitle.textContent = "Tarjeta de memoria";
            article.appendChild(articleTitle);

            const articleImg = document.createElement("img");
            articleImg.src = element.source;
            articleImg.alt = element.element;
            article.appendChild(articleImg);

            section.appendChild(article);
        });
    }

    addEventListeners() {
        const articles = document.getElementsByTagName("article");
        for (let i = 0; i < articles.length; i++) {
            const article = articles[i];
            article.onclick = this.flipCard.bind(article, this);
        }
    }

    flipCard(game) {
        if (this.dataset.state === "revealed"
            || game.lockBoard
            || this === game.firstCard) {
            return;
        }

        this.dataset.state = "flip";

        if (!game.hasFlippedCard) {
            game.hasFlippedCard = true;
            game.firstCard = this;
        } else {
            game.flippedCard = false;
            game.secondCard = this;
            game.checkForMatch();
        }
    }
}
