document.addEventListener('DOMContentLoaded', () => {
    // Variables pour le chronomètre
    const startBtn = document.getElementById("start");
    const stopBtn = document.getElementById("stop");
    const resetBtn = document.getElementById("reset");
    const inputHours = document.getElementById("input-hours");
    const inputMinutes = document.getElementById("input-minutes");
    const inputSeconds = document.getElementById("input-seconds");
    const musicSelect = document.getElementById("music");
    const popup = document.getElementById("popup");
    const closePopup = document.getElementById("closePopup");

    // Son de clic du bouton
    const boutonClickSon = new Audio('audio/zapsplat_multimedia_button_click_bright_002_92099.mp3');

    // Variables pour le chronomètre
    let audio;
    let heures = 0;
    let minutes = 0;
    let secondes = 0;
    let timeout;
    let estArrete = true;

    // Gestion des boutons
    const jouerSonEtDemarrer = () => {
        boutonClickSon.play();
        demarrer();
    };

    const jouerSonEtArreter = () => {
        boutonClickSon.play();
        arreter();
    };

    const jouerSonEtReset = () => {
        boutonClickSon.play();
        reset();
    };

    // Ajouter les événements de clic pour les boutons
    startBtn.addEventListener("click", jouerSonEtDemarrer);
    stopBtn.addEventListener("click", jouerSonEtArreter);
    resetBtn.addEventListener("click", jouerSonEtReset);

    // Fermer la popup lorsque l'utilisateur clique sur la croix
    closePopup.addEventListener("click", () => {
        popup.classList.add("hidden");
    });

    // Fermer la popup si l'utilisateur clique en dehors du contenu de la popup
    window.addEventListener("click", (event) => {
        if (event.target === popup) {
            popup.classList.add("hidden");
        }
    });

    // Fonction pour démarrer le chronomètre
    const demarrer = () => {
        if (estArrete) {
            estArrete = false;

            // Récupérer les valeurs entrées par l'utilisateur
            heures = parseInt(inputHours.value) || 0;
            minutes = parseInt(inputMinutes.value) || 0;
            secondes = parseInt(inputSeconds.value) || 0;

            defilerTemps();
        }
    };

    // Fonction pour arrêter le chronomètre
    const arreter = () => {
        if (!estArrete) {
            estArrete = true;
            clearTimeout(timeout);

            // Arrêter la musique si elle est en cours de lecture
            if (audio) {
                audio.pause();
                audio.currentTime = 0; // Réinitialiser la lecture
            }
        }
    };

    // Fonction pour réinitialiser le chronomètre
    const reset = () => {
        arreter();
        heures = 0;
        minutes = 0;
        secondes = 0;

        inputHours.value = "";
        inputMinutes.value = "";
        inputSeconds.value = "";
        popup.classList.add("hidden"); // Cacher la popup si réinitialisation
    };

    // Fonction pour faire défiler le temps
    const defilerTemps = () => {
        if (estArrete) return;

        if (secondes === 0 && minutes === 0 && heures === 0) {
            jouerMusique();
            popup.classList.remove("hidden"); // Afficher la popup
            return;
        }

        if (secondes === 0) {
            if (minutes === 0) {
                if (heures > 0) {
                    heures--;
                    minutes = 59;
                    secondes = 59;
                }
            } else {
                minutes--;
                secondes = 59;
            }
        } else {
            secondes--;
        }

        miseAJourAffichage();

        timeout = setTimeout(defilerTemps, 1000);
    };

    // Fonction pour mettre à jour l'affichage des valeurs dans les champs d'entrée
    const miseAJourAffichage = () => {
        inputHours.value = heures.toString().padStart(2, "0");
        inputMinutes.value = minutes.toString().padStart(2, "0");
        inputSeconds.value = secondes.toString().padStart(2, "0");
    };

    // Fonction pour jouer la musique sélectionnée
    const jouerMusique = () => {
        const selectedMusic = musicSelect.value;
        audio = new Audio(selectedMusic);
        audio.play().catch(error => {
            console.error("Erreur lors de la lecture de la musique :", error);
        });
    };

    // Gestion du changement de thème
    const themeIcon = document.getElementById('toggleTheme');
    
    themeIcon.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
});
