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


// let myGetRequest = new Request('http://localhost:3000/films');
// // Get all IDs in the HTML for DOM manipulation
// let title = document.getElementById('title');
// let runtime = document.getElementById('runtime');
// let filmInfo = document.getElementById('film-info');
// let showtime = document.getElementById('showtime');
// let ticketNum = document.getElementById('ticket-num');
// let buyTicket = document.getElementById('buy-ticket');
// let poster = document.getElementById('poster');
// let films = document.getElementById('films');
// let subtitle = document.getElementById('subtitle');
// let showing = document.getElementById('showing');
// let body = document.getElementsByTagName('body')[0]; // Get the first body element


// // On full load, the first movie should be displayed as default
// window.onload = () => {
//     // fetch details from the server
//     fetch(myGetRequest)
//         //JSONIFY the response
//         .then((response) => response.json())
//         //.then to handle async and promise from the server
//         .then((data) => {
//             // first movie should start from the first data in the array
//             const firstMovie = data[0];
//             // get the number of remaining tickets to sell from subtracting capacity - tickets_sold
//             let remainingTickets = firstMovie.capacity - firstMovie.tickets_sold;
//             // manipulate the HTML from the JavaScript side by targeting the IDs

//             title.innerHTML = ${firstMovie.title};
//             runtime.innerHTML = ${firstMovie.runtime};
//             filmInfo.innerHTML = ${firstMovie.description};
//             showtime.innerHTML = ${firstMovie.showtime};
//             ticketNum.innerHTML = ${remainingTickets};
//             buyTicket.innerHTML = 'Buy ticket';
//             poster.src = ${firstMovie.poster};
//             // eventlistener for clicking the buy ticket button
//             buyTicket.addEventListener('click', () => {
//                 // check if the remaining tickets are more than 0, then start subtracting
//                 if (remainingTickets > 0) {
//                     // -- to deduct
//                     remainingTickets--;
//                     // display dynamically on the html,
//                     ticketNum.innerHTML = ${remainingTickets};
//                 } else if (remainingTickets === 0) {
//                     // once tickets remaining are 0, show a sold out on the button and disable buying more tickets
//                     ticketNum.innerHTML = ${remainingTickets};
//                     buyTicket.innerHTML = Sold out!;
//                 }
//             });
//             // remove the first movie so as to proceed adding the rest
//             films.innerHTML = '';
//             // forEach to add the movies one by  one, just like a for loop
//             data.forEach((movie, index) => {
//                 // create a list to display all the movies
//                 let li = document.createElement('li');
//                 // dynamically show the movie titles
//                 li.innerHTML = <b>${movie.title}</b>;
//                 // append the new list to the films ID on the HTML
//                 films.appendChild(li);
//                 // add a button to delete each movie
//                 let deleteButton = document.createElement('button');
//                 deleteButton.innerHTML = 'Delete';
//                 // add class using JS
//                 deleteButton.classList.add('ui', 'button');
//                 deleteButton.style.marginLeft = '3px';
//                 li.appendChild(deleteButton);
//                 li.addEventListener('mouseover', () => {
//                     li.style.color = 'blue';
//                 });
//                 li.addEventListener('mouseout', () => {
//                     li.style.color = 'purple';
//                 });
//                 // delete button for each movie
//                 //only delete when user confirms/selects okay
//                 deleteButton.addEventListener('click', () => {
//                     if (window.confirm('Are you sure you want to delete this movie?')) {
//                         data.splice(index, 1);
//                         films.removeChild(li);
//                     }
//                 });
//                 li.addEventListener('click', () => {
//                     remainingTickets = movie.capacity - movie.tickets_sold;
//                     title.innerHTML = ${movie.title};
//                     runtime.innerHTML = ${movie.runtime};
//                     filmInfo.innerHTML = ${movie.description};
//                     showtime.innerHTML = ${movie.showtime};
//                     ticketNum.innerHTML = ${remainingTickets};
//                     buyTicket.innerHTML = 'Buy ticket';
//                     poster.src = ${movie.poster};
//                 });
//             });
//         });
// };