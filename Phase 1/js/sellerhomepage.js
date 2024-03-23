document.addEventListener("DOMContentLoaded", function () {
    const gamesWrapper = document.querySelector(".games-wrapper");

    // Fetch JSON data
    fetch("data/sellergames.json")
        .then((response) => response.json())
        .then((data) => {
            renderGames(data); // Initially render all games

            // Add event listeners to category buttons
            const categoryButtons = document.querySelectorAll(".categories button");
            categoryButtons.forEach((button) => {
                button.addEventListener("click", () => {
                    const category = button.dataset.category;
                    const filteredGames = data.filter((game) => category === "All" || game.categories.includes(category));
                    renderGames(filteredGames);
                });
            });

            // Event listener for search button
            const searchInput = document.getElementById("search-box");
            const searchButton = document.getElementById("search-button");
            searchButton.addEventListener("click", function () {
                console.log("Search button clicked!");
                const searchTerm = searchInput.value.trim().toLowerCase();
                const filteredGames = data.filter((game) => game.name.toLowerCase().includes(searchTerm));
                console.log("Filtered games:", filteredGames);
                renderGames(filteredGames);
            });
        })
        .catch((error) => console.error("Error fetching data:", error));

    function renderGames(games) {
        gamesWrapper.innerHTML = ""; // Clear previous games
        
        games.forEach((game) => {
            const gameCard = document.createElement("div");
            gameCard.classList.add("games");
            gameCard.setAttribute("data-category", game.categories.join(' '));
        
            // Create game card HTML structure (similar to your existing cards)
            gameCard.innerHTML = `
                <div class="mywrapper">
                    <div class="image-container">
                        <img src="${game.image}" alt="${game.name}" class="banner-image" />
                        <span class="price">$${game.price}</span> <!-- Add price display here -->
                    </div>
                    <h1>${game.name}</h1>
                    <p>${game.description}</p>
                    <div class="quantity-wrapper">
                        <label for="quantity-${game.id}">Remaining Quantity:</label>
                        <span>${game.quantity}</span>
                    </div>
                </div>
                <div class="button-wrapper">
                    <button class="btn outline">DETAILS</button>
                </div>
            `;
        
            gamesWrapper.appendChild(gameCard);
        });
    }

   
    
    const mybtnnn = document.querySelectorAll("sell-new-game-button");
    mybtnnn.forEach((button) => {
        button.addEventListener("click", () => {
            window.location.href = "seller.html";
        });
    });
    
});