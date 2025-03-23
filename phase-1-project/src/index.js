document.addEventListener("DOMContentLoaded", () => {
  fetchMovies();

  function fetchMovies() {
    fetch("http://localhost:3000/films")
      .then((response) => response.json())
      .then((movies) => {
        const filmsList = document.getElementById("films");
        movies.forEach((movie) => {
          const li = document.createElement("li");
          li.className = "film item";
          li.innerText = movie.title;
          li.addEventListener("click", () => displayMovieDetails(movie));
          filmsList.appendChild(li);
        });
        displayMovieDetails(movies[0]); 
      });
  }

  function displayMovieDetails(movie) {
    document.getElementById("poster").src = movie.poster; 
    document.getElementById("title").innerText = movie.title;
    document.getElementById(
      "runtime"
    ).innerText = `Runtime: ${movie.runtime} minutes`;
    document.getElementById(
      "showtime"
    ).innerText = `Showtime: ${movie.showtime}`;

    const availableTickets = movie.capacity - movie.tickets_sold;
    document.getElementById(
      "available-tickets"
    ).innerText = `Available Tickets: ${availableTickets}`;

    const buyTicketButton = document.getElementById("buy-ticket");
    buyTicketButton.disabled = availableTickets <= 0;

    buyTicketButton.onclick = () => {
      if (availableTickets > 0) {
        purchaseTicket(movie);
      } else {
        alert("Sold Out!");
      }
    };

    if (availableTickets <= 0) {
      buyTicketButton.innerText = "Sold Out";
      buyTicketButton.disabled = true;
      document
        .querySelector(`li:contains(${movie.title})`)
        .classList.add("sold-out");
    } else {
      buyTicketButton.innerText = "Buy Ticket";
      const soldOutItems = document.querySelectorAll(".sold-out");
      soldOutItems.forEach((item) => item.classList.remove("sold-out"));
    }
  }

  function purchaseTicket(movie) {
    const newTicketsSold = movie.tickets_sold + 1;

    fetch(`http://localhost:3000/films/${movie.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tickets_sold: newTicketsSold }),
    })
      .then((response) => response.json())
      .then((updatedMovie) => displayMovieDetails(updatedMovie));
  }
});
