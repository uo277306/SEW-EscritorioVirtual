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
    }

    shuffleElements() {
        for (let i = elements.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [elements[i], elements[j]] = [elements[j], elements[i]];
        }
    }

    unflipCards() {
        this.lockBoard = true;
        setTimeout(() => {
            // voltea las cartas que estén bocarriba
            // TODO
            resetBoard();
        }, 1000);
    }

    resetBoard() {
        this.hasFlippedCard = false;
        this.lockBoard = false;
        this.firstCard = null;
        this.secondCard = null;
    }

    checkForMatch() {
        this.firstCard.element === this.secondCard.element ? disableCards() : this.unflipCards();
    }

    disableCards() {
        // TODO FIX
        const button = document.querySelector("button");
        button.setAttribute("data-state", "revealed");

        this.resetBoard();
    }
}