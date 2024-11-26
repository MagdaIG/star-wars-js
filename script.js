document.addEventListener("DOMContentLoaded", () => {
    const characterContainer = document.getElementById("character-container");
    const ranges = document.querySelectorAll(".range");

    // URL de las imágenes de los personajes
    const characterImages = {
        1: "https://starwars-visualguide.com/assets/img/characters/1.jpg", // Luke Skywalker
        2: "https://starwars-visualguide.com/assets/img/characters/2.jpg", // C-3PO
        3: "https://starwars-visualguide.com/assets/img/characters/3.jpg", // R2-D2
        4: "https://starwars-visualguide.com/assets/img/characters/4.jpg", // Darth Vader
        5: "https://starwars-visualguide.com/assets/img/characters/5.jpg", // Leia Organa
        6: "https://starwars-visualguide.com/assets/img/characters/6.jpg", // Obi-Wan Kenobi
        7: "https://starwars-visualguide.com/assets/img/characters/7.jpg", // Han Solo
        8: "https://starwars-visualguide.com/assets/img/characters/8.jpg", // Chewbacca
        9: "https://starwars-visualguide.com/assets/img/characters/9.jpg", // Lando Calrissian
        10: "https://starwars-visualguide.com/assets/img/characters/10.jpg", // Boba Fett
        11: "https://starwars-visualguide.com/assets/img/characters/11.jpg", // Nien Nunb
        12: "https://starwars-visualguide.com/assets/img/characters/12.jpg", // Emperor Palpatine
        13: "https://starwars-visualguide.com/assets/img/characters/13.jpg", // Darth Maul
        14: "https://starwars-visualguide.com/assets/img/characters/14.jpg", // Qui-Gon Jinn
        15: "https://starwars-visualguide.com/assets/img/characters/15.jpg", // Jar Jar Binks
        16: "https://starwars-visualguide.com/assets/img/characters/16.jpg", // Mace Windu
        17: "https://starwars-visualguide.com/assets/img/characters/17.jpg" // Yoda
    };

    // Fetch data de SWAPI
    async function fetchCharacters(start, end) {
        characterContainer.innerHTML = "<p>Cargando...</p>";
        const characters = [];

        for (let i = start; i <= end; i++) {
            try {
                const response = await fetch(`https://swapi.dev/api/people/${i}/`);
                if (!response.ok) continue;
                const data = await response.json();
                characters.push(data);
            } catch (error) {
                console.error(`Error al obtener el personaje ${i}:`, error);
            }
        }

        renderCharacters(characters);
    }

    // Renderizar personajes
    function renderCharacters(characters) {
        characterContainer.innerHTML = ""; // Limpiar contenido previo

        characters.forEach((character, index) => {
            const block = document.createElement("div");
            block.className = "character-block";
            block.innerHTML = `
                <img src="${characterImages[character.url.split("/")[5]]}" alt="${character.name}">
                <div class="character-name">${character.name}</div>
                <div class="character-details">Estatura: ${character.height} cm</div>
                <div class="character-details">Peso: ${character.mass} kg</div>
            `;
            characterContainer.appendChild(block);
        });
    }

    // Event listeners para rangos
    ranges.forEach((range) => {
        range.addEventListener("mouseenter", () => {
            const [start, end] = range.dataset.range.split("-").map(Number);
            fetchCharacters(start, end);
        });
    });

});

document.addEventListener('click', function() {
    const music = document.getElementById('background-music');
    music.play().catch(error => {
        console.error('Error al reproducir música:', error);
    });
}, { once: true }); // La música se iniciará en el primer clic, solo una vez