let app = {
    displayBonus: false,

    init: function () {
        app.listenEvents();
    },

    listenEvents: function () {
        let playBonusButton = document.querySelector('.play__button');
        playBonusButton.addEventListener('click', app.handleClickOnBonus);
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

}

document.addEventListener('DOMContentLoaded', app.init);