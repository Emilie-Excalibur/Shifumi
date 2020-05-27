let app = {
    count: 0,
    win: 0,
    defeat: 0,
    tie: 0,
    displayBonus: false,

    init: function () {
        app.listenEvents();
    },

    listenEvents: function () {
        let signs = document.querySelectorAll('.icon');

        signs.forEach(function (sign) {
            sign.addEventListener('click', app.handleClick);
        });

        let playAgainButton = document.querySelector('.button__replay');
        playAgainButton.addEventListener('click', app.playAgain);

        let playBonusButton = document.querySelector('.play__button');
        playBonusButton.addEventListener('click', app.handleClickOnBonus);
    },

    handleClick: function (event) {
        // Récupère la liste des classe de la cible de l'évènement
        let clickedElementClasses = event.currentTarget.classList;

        // Cache le conteneur des signes du début de jeu
        document.querySelector('.sign__container').style.display = "none";
        // Affiche le conteneur des signes choisis après avoir commencé le jeu
        document.querySelector('.sign__select').style.display = "flex";

        // Choisi un signe aléatoirement pour l'ordinateur
        let computerChoice = app.computerRandomChoice();

        // Affiche le signe choisi par l'utilisateur
        app.displayChoice(clickedElementClasses[1], 'user');
        // Affiche le résultat 
        app.displayResult(clickedElementClasses[1], computerChoice);
        // Affiche le signe aléatoire de l'ordinateur
        app.displayChoice(computerChoice, 'computer');

    },

    displayChoice: function (imgSrc, player) {
        // Récupère le conteneur de l'icone du signe et définit la couleur de sa bordure
        let choiceIconContainer = document.querySelector('#' + player + '__choice');
        app.setBorderColor(imgSrc, choiceIconContainer);

        // Récupère l'img et définit la src de l'image, son title
        let choiceIcon = document.querySelector('#' + player + '__choice > img');
        choiceIcon.src = 'assets/images/icon-' + imgSrc + '.svg';
        choiceIcon.setAttribute('title', imgSrc);
    },

    displayResult: function (choice1, choice2) {
        // Récupère l'élément <p> à l'intérieur de result
        let message = document.querySelector('.result__message');
        // Définit le message de résultat
        let messageResult = app.setResult(choice1, choice2);
        // Ajoute le contenu à l'élément <p>
        message.textContent = messageResult;
    },

    playAgain: function () {
        document.querySelector('.sign__container').style.display = "block";
        document.querySelector('.sign__select').style.display = "none";
    },

    handleClickOnBonus: function (event) {
        if (!app.displayBonus) {
            app.displayBonus = true;
        } else {
            app.displayBonus = false;
        }

        let button = event.currentTarget;

        if (app.displayBonus) {
            app.displayBonusContent(button, 'Version normale');
        } else {
            app.displayNormalContent(button, 'Version bonus');
        }
    },
    displayNormalContent: function(target, buttonText) {
        // Change le texte du bouton
        target.textContent = buttonText;
        // Change le logo
        let logo = document.querySelector('.logo');
        logo.src = 'assets/images/logo.svg';

        // Change les règles
        let rules = document.querySelector('.modal-body > img');
        rules.src = 'assets/images/image-rules.svg';

        // Modifie le diagram
        let diagram = document.querySelector('.sign__diagram > img');
        diagram.src = 'assets/images/bg-triangle.svg';

        // Retire des classes aux icones déja existantes
        document.querySelector('.paper').classList.remove('paper__bonus');
        document.querySelector('.rock').classList.remove('rock__bonus');
        document.querySelector('.scissors').classList.remove('scissors__bonus');

        // Retire les div bonus Spock et Lezard
        let spockDiv = document.querySelector('.spock');
        let lizardDiv = document.querySelector('.lizard');
        document.querySelector('.sign__container').removeChild(spockDiv);
        document.querySelector('.sign__container').removeChild(lizardDiv);
    },

    displayBonusContent: function (target, buttonText) {
        // Change le texte du bouton
        target.textContent = buttonText;
        // Change le logo
        let logo = document.querySelector('.logo');
        logo.src = 'assets/images/logo-bonus.svg';

        // Change les règles
        let rules = document.querySelector('.modal-body > img');
        rules.src = 'assets/images/image-rules-bonus.svg';

        // Modifie le diagram
        let diagram = document.querySelector('.sign__diagram > img');
        diagram.src = 'assets/images/bg-pentagon.svg';

        // Ajoute des classes aux icones déja existantes
        document.querySelector('.paper').classList.add('paper__bonus');
        document.querySelector('.rock').classList.add('rock__bonus');
        document.querySelector('.scissors').classList.add('scissors__bonus');

        // Crée une icone spock, définit ses classes, son image et l'insère dans le conteneur qui vient d'être crée
        let spockDiv = document.createElement('div');
        spockDiv.classList.add('icon', 'spock');
        let spockIcon = document.createElement('img');
        spockIcon.src = 'assets/images/icon-spock.svg';
        spockDiv.appendChild(spockIcon);

        // Crée une icone lizard, définit ses classes, son image et l'insère dans le conteneur qui vient d'être crée
        let lizardDiv = document.createElement('div');
        lizardDiv.classList.add('icon', 'lizard');
        let lizardIcon = document.createElement('img');
        lizardIcon.src = 'assets/images/icon-lizard.svg';
        lizardDiv.appendChild(lizardIcon);

        spockDiv.addEventListener('click', app.handleClick);
        lizardDiv.addEventListener('click', app.handleClick);

        // Insère les nouveaux icones dans le conteneur parent
        let signContainer = document.querySelector('.sign__container');
        signContainer.appendChild(spockDiv);
        signContainer.appendChild(lizardDiv);
    },


    computerRandomChoice: function () {
        let computerChoice = Math.random();

        let paper = document.querySelector('.paper');

        if (paper.classList.contains('paper__bonus')) {
            if (computerChoice < 0.155) {
                computerChoice = "rock";
            } else if (computerChoice <= 0.34) {
                computerChoice = "paper";
            } else if (computerChoice <= 0.57) {
                computerChoice = "scissors";
            } else if (computerChoice < 0.86) {
                computerChoice = "lizard";
            } else {
                computerChoice = "spock";
            }
        } else {
            if (computerChoice < 0.345) {
                computerChoice = "rock";
            } else if (computerChoice <= 0.671) {
                computerChoice = "paper";
            } else {
                computerChoice = "scissors";
            }
        }

        return computerChoice;
    },

    setBorderColor: function (signName, imgDOM) {
        let paper = document.querySelector('.paper');

        if (paper.classList.contains('paper__bonus')) {
            if (signName === 'paper') {
                imgDOM.style.border = "20px solid #0063e6";
            } else if (signName === 'rock') {
                imgDOM.style.border = "20px solid #c41a1a";
            } else if (signName === 'scissors') {
                imgDOM.style.border = "20px solid #f5ce42";
            } else if (signName === 'lizard') {
                imgDOM.style.border = "20px solid #b3229f";
            } else if (signName === 'spock') {
                imgDOM.style.border = "20px solid #2ebf21";
            }
        } else {
            if (signName === 'paper') {
                imgDOM.style.border = "20px solid #0063e6";
            } else if (signName === 'rock') {
                imgDOM.style.border = "20px solid #c41a1a";
            } else if (signName === 'scissors') {
                imgDOM.style.border = "20px solid #f5ce42";
            }
        }
    },

    setResult: function (userChoice, computerChoice) {
        if (userChoice === computerChoice) {
            message = 'Egalité !';
            app.tie++;
        } else if (userChoice === "rock") {
            if (computerChoice === "paper") {
                message = 'Perdu ! Le papier recouvre la pierre';
                app.count--;
                app.defeat++;
            } else if (computerChoice === "scissors") {
                message = 'Gagné ! La pierre écrase les ciseaux';
                app.count++;
                app.win++;
            } else if (computerChoice === "lizard") {
                message = 'Gagné ! La pierre écrase le lézard';
                app.count++;
                app.win++;
            } else {
                message = 'Perdu ! Spock vaporise la pierre';
                app.count--;
                app.defeat++;
            }
        } else if (userChoice === "paper") {
            if (computerChoice === "rock") {
                message = 'Gagné ! Le papier recouvre la pierre';
                app.count++;
                app.win++;
            } else if (computerChoice === "scissors") {
                message = "Perdu ! Les ciseaux coupent le papier";
                app.count--;
                app.defeat++;
            } else if (computerChoice === "lizard") {
                message = 'Perdu ! Le lézard mange le papier';
                app.count--;
                app.defeat++;
            } else {
                message = 'Gagné ! Le papier anéanti Spock';
                app.count++;
                app.win++;
            }
        } else if (userChoice === "scissors") {
            if (computerChoice === "rock") {
                message = 'Perdu ! La pierre écrase les ciseaux';
                app.count--;
                app.defeat++;
            } else if (computerChoice === "paper") {
                message = 'Gagné ! Les ciseaux coupent le papier';
                app.count++;
                app.win++;
            } else if (computerChoice === "lizard") {
                message = 'Gagné ! Les ciseaux décapitent le lézard';
                app.count++;
                app.win++;
            } else {
                message = 'Perdu ! Spock détruit les ciseaux';
                app.count--;
                app.defeat++;
            }
        } else if (userChoice === "lizard") {
            if (computerChoice === "rock") {
                message = 'Perdu ! La pierre écrase le lézard';
                app.count--;
                app.defeat++;
            } else if (computerChoice === "paper") {
                message = 'Gagné ! Le lézard mange le papier';
                app.count++;
                app.win++;
            } else if (computerChoice === "scissors") {
                message = 'Perdu ! Les ciseaux décapitent le lézard';
                app.count--;
                app.defeat++;
            } else {
                message = 'Gagné ! Le lézard empoisonne Spock';
                app.count++;
                app.win++;
            }
        } else if (userChoice === "spock") {
            if (computerChoice === "rock") {
                message = 'Gagné ! Spock vaporise la pierre';
                app.count++;
                app.win++;
            } else if (computerChoice === "paper") {
                message = 'Perdu ! Le papier anéanti Spock';
                app.count--;
                app.defeat++;
            } else if (computerChoice === "scissors") {
                message = 'Gagné ! Spock détruit les ciseaux';
                app.count++;
                app.win++;
            } else {
                message = 'Perdu ! Le lézard empoisonne Spock';
                app.count--;
                app.defeat++;
            }
        }

        app.displayScore();

        return message;
    },

    displayScore: function () {
        let win = document.querySelector('#win');
        let defeat = document.querySelector('#defeat');
        let tie = document.querySelector('#tie');
        let score = document.querySelector('#score_title');
        let count = document.querySelector('.score p:last-child');

        win.textContent = 'Victoires : ' + app.win;
        defeat.textContent = 'Défaites : ' + app.defeat;
        tie.textContent = 'Egalités : ' + app.tie;
        score.textContent = 'Score actuel : ' + app.count;
        count.textContent = app.count;
    }

}

document.addEventListener('DOMContentLoaded', app.init);