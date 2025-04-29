const githubUsername = "Andreastephgm";
const projectsContainer = document.getElementById("github-projects");

const selectedProjects = ['gameStream', 'Pokemon-', 'location-service', 'Contact-Center', 'Animeflix'];

fetch(`https://api.github.com/users/${githubUsername}/repos`)
  .then(response => response.json())
  .then(repos => {
    repos.forEach(repo => {
      if (!repo.fork && selectedProjects.includes(repo.name)) {
        const projectElement = document.createElement("div");
        projectElement.classList.add("carousel-item");

        let projectImage = "./images/default.jpg";  

        if (repo.name === "gameStream") {
          projectImage = "./images/game-stream.webp";
        } else if (repo.name === "Pokemon-") {
          projectImage = "./images/pikachu.jpg";
        } else if (repo.name === "location-service") {
          projectImage = "./images/gps.jpg";
        } else if (repo.name === "Contact-Center") {
          projectImage = "./images/diadema.avif";
        } else if (repo.name === "Animeflix") {
          projectImage = "./images/animeflix.webp";
        }
        projectElement.innerHTML = `
          <img src="${projectImage}" alt="${repo.name}">
          <h3>${repo.name}</h3>
          <p>${repo.description || "Sin descripción disponible."}</p>
          <a href="${repo.html_url}" target="_blank">Ver en GitHub</a>
        `;

        projectsContainer.appendChild(projectElement);
      }
    });
  })
  .catch(error => {
    projectsContainer.innerHTML = "<p>No se pudieron cargar los proyectos.</p>";
    console.error(error);
  });





