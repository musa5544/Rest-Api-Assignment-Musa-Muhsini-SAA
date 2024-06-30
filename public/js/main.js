console.log('urban dictionary welcome');

// Function for searching Urban Dictionary API from website https://rapidapi.com/community/api/urban-dictionary 
// const fetch = require('node-fetch');
//const url = 'https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=wat';
//const options = {
 // method: 'GET',
 // headers: {
    //'x-rapidapi-key': '24ba702105msh5e516543afbf5d7p16218ajsnb892f4d84145',
    //'x-rapidapi-host': 'mashape-community-urban-dictionary.p.rapidapi.com'
  //}
//};

//try {
	//const response = await fetch(url, options);
	//const result = await response.text();
	//console.log(result);
//} catch (error) {
	//console.error(error);
//}

async function searchTerm() {
    const term = document.getElementById('term').value;
    const containerResult = document.getElementById('data-container');

    // Logs all the searches like a history 
    console.log(`searched term: ${term}`);

    // Clear any previous results
    containerResult.innerHTML = '';

      // API endpoint from website node.js
    const url = `https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${term}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '24ba702105msh5e516543afbf5d7p16218ajsnb892f4d84145',
            'x-rapidapi-host': 'mashape-community-urban-dictionary.p.rapidapi.com'
        }
    };

    try {
        // Fetches the data from api 
        const response = await fetch(url, options);
        const data = await response.json();

        // Logs the API response for me 
        console.log('API response received:', data);

        // Check the DOM 
        if (data.list && data.list.length > 0) {
            // Display each definition
            data.list.forEach((item, index) => {
                const definition = item.definition;
                const example = item.example ? `<p><em>Example:</em> ${item.example}</p>` : '';
                containerResult.innerHTML += `
                    <div class="definition">
                        <p><strong>${index + 1}. ${term}:</strong> ${definition}</p>
                        ${example}
                    </div>
                `;
            });
        } else {
             // Show a message if no definitions are found
            containerResult.innerHTML = `<p>No definitions found for "${term}".</p>`;
        }
    } catch (error) {
        // Log any errors
        console.error('Error fetching the definition:', error);
        containerResult.innerHTML = `<p>There was an error fetching the definition. Please try again.</p>`;
    }
}