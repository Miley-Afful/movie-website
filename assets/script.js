// Replace 'YOUR_TMDB_API_KEY' with your actual API key from TMDB
const apiKey = '7457b8a7ccb39e183fa7cb9ac792ad3a';

function searchMovies() {
    const query = document.getElementById('movie-input').value.trim();
    
    if (query === "") {
        document.getElementById('movie-results').innerHTML = "<p>Please enter a movie name to search.</p>";
        return;
    }

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;
    
    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);  // Log the response for debugging
        
        if (data.results && data.results.length > 0) {
            displayMovies(data.results);
        } else {
            document.getElementById('movie-results').innerHTML = `<p>No results found for "${query}".</p>`;
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        document.getElementById('movie-results').innerHTML = `<p>An error occurred while fetching data. Please try again later.</p>`;
    });
}

function displayMovies(movies) {
    let output = '<ul>';
    movies.forEach(movie => {
        const posterPath = movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'placeholder.jpg';
        output += `
            <li>
                <h3>${movie.title} (${new Date(movie.release_date).getFullYear()})</h3>
                <img src="${posterPath}" alt="${movie.title}" style="width: 100px;">
                <p>Rating: ${movie.vote_average} / 10</p>
            </li>
        `;
    });
    output += '</ul>';
    document.getElementById('movie-results').innerHTML = output;
}

