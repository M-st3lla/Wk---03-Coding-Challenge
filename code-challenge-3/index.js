fetch('db.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const filmsList = document.getElementById('filmsList');
        filmsList.innerHTML = ''; // Clear existing movie list

        // Loop through each film and create HTML elements to display their titles and delete buttons
        data.films.forEach(film => {
            // Create container div for each movie and its delete button
            const movieContainer = document.createElement('div');
            movieContainer.classList.add('movie-container');

            // Create movie button
            const filmButton = document.createElement('button');
            filmButton.classList.add('film', 'item'); // Add classes for styling
            filmButton.textContent = film.title; // Set the text content of the button to the film title

            // Add an event listener to handle click events on the movie button
            filmButton.addEventListener('click', () => {
                // Update movie details when the button is clicked
                updateMovieDetails(film);
            });

            // Create delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-button');

            // Add event listener to handle click events on the delete button
            deleteButton.addEventListener('click', () => {
                // Ask user for confirmation before deleting the movie
                    // Remove the movie from the list
                    filmsList.removeChild(movieContainer);
                    // Here you can implement the code to delete the movie from your data source (e.g., database)
            });

            // Append the movie button and delete button to the movie container
            movieContainer.appendChild(filmButton);
            movieContainer.appendChild(deleteButton);

            // Append the movie container to the films list
            filmsList.appendChild(movieContainer);
        });

        // Function to update movie details
        function updateMovieDetails(movie) {
            document.getElementById('title').textContent = movie.title;
            document.getElementById('runtime').textContent = `${movie.runtime} minutes`;
            document.getElementById('showtime').textContent = movie.showtime;

            // Calculate the number of available tickets
            let availableTickets = movie.capacity - movie.tickets_sold;
            document.getElementById('ticket-num').textContent = availableTickets;

            // Display movie description
            document.getElementById('film-info').textContent = movie.description;

            // Display movie poster
            document.getElementById('poster').src = movie.poster;
            document.getElementById('poster').alt = movie.title;

            // Add event listener to buy ticket button
            const buyTicketButton = document.getElementById('buy-ticket');
            buyTicketButton.addEventListener('click', () => {
                if (availableTickets > 0) {
                    // Reduce available tickets by 1
                    movie.tickets_sold++;
                    availableTickets--;

                    // Update available tickets in the DOM
                    document.getElementById('ticket-num').textContent = availableTickets;

                    // Check if tickets are sold out
                    if (availableTickets === 0) {
                        // Disable buy ticket button and show sold out message
                        buyTicketButton.disabled = true;
                        buyTicketButton.textContent = 'Sold Out';
                    }
                }
            });
        }

        // Display details of the first movie when the page loads
        updateMovieDetails(data.films[0]);
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
    });


