document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "df7f9445ad92a7e739b1487f9870452f";
    const apiHost = "v3.football.api-sports.io";
    const url = `https://${apiHost}/fixtures?live=all`;

    const requestOptions = {
        method: 'GET',
        headers: {
            "x-rapidapi-key": apiKey,
            "x-rapidapi-host": apiHost
        },
        redirect: 'follow'
    };

    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Verifica la estructura de los datos
            const matchesContainer = document.getElementById("live-matches");

            if (data.response && data.response.length > 0) {
                data.response.forEach(match => {
                    const matchElement = document.createElement("div");
                    matchElement.className = "item";

                    matchElement.innerHTML = `
                        <img src="${match.league.logo}" alt="${match.league.name}">
                        <div>
                            <div class="team-info">
                                <img src="${match.teams.home.logo}" alt="${match.teams.home.name}">
                                <span>${match.teams.home.name}</span>
                            </div>
                            <div class="team-info">
                                <img src="${match.teams.away.logo}" alt="${match.teams.away.name}">
                                <span>${match.teams.away.name}</span>
                            </div>
                            <div class="score">
                                ${match.goals.home} - ${match.goals.away}
                            </div>
                        </div>
                        <div>
                            <div>Date: ${new Date(match.fixture.date).toLocaleDateString()}</div>
                            <div>Time: ${new Date(match.fixture.date).toLocaleTimeString()}</div>
                            <div>Status: ${match.fixture.status.long}</div>
                        </div>
                    `;

                    matchesContainer.appendChild(matchElement);
                });
            } else {
                matchesContainer.innerHTML = "<p>No hay partidos en vivo en este momento.</p>";
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById("live-matches").innerHTML = "<p>Error al cargar los partidos en vivo.</p>";
        });
});