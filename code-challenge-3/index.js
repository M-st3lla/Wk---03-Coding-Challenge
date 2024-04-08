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

        // Loop through each film and create HTML elements to display their titles
        data.films.forEach(film => {
            const filmItem = document.createElement('li');
            filmItem.classList.add('film', 'item');
            
            // Set the text content of the list item element to the film title
            filmItem.textContent = film.title;

            // Append movie title to films list
            filmsList.appendChild(filmItem);
        });

        // Extract details of the first movie
        const firstMovie = data.films[0];
        
        document.getElementById('title').textContent = firstMovie.title;
        document.getElementById('runtime').textContent = `${firstMovie.runtime} minutes`;
        document.getElementById('showtime').textContent = firstMovie.showtime;

        // Calculate the number of available tickets
        const availableTickets = firstMovie.capacity - firstMovie.tickets_sold;
        document.getElementById('ticket-num').textContent = availableTickets;

        // Display movie description
        document.getElementById('film-info').textContent = firstMovie.description;

        // Display movie poster
        document.getElementById('poster').src = firstMovie.poster;
        document.getElementById('poster').alt = firstMovie.title;
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
    });
