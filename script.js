const githubUsername = "Andreastephgm";
const projectsContainer = document.getElementById("github-projects");
let currentProjectIndex = 0;
const projects = [];

const selectedProjects = ['gameStream', 'Pokemon-', 'location-service', 'Contact-Center', 'Animeflix'];

fetch(`https://api.github.com/users/${githubUsername}/repos`)
  .then(response => response.json())
  .then(repos => {
    repos.forEach(repo => {
      if (!repo.fork && selectedProjects.includes(repo.name)) {
        projects.push(repo);
      }
    });

    showProject(currentProjectIndex);

    document.getElementById("nextButton").addEventListener("click", () => {
      if (currentProjectIndex < projects.length - 1) {
        currentProjectIndex++;
        showProject(currentProjectIndex);
      }
    });

    document.getElementById("prevButton").addEventListener("click", () => {
      if (currentProjectIndex > 0) {
        currentProjectIndex--;
        showProject(currentProjectIndex);
      }
    });
  })
  .catch(error => {
    projectsContainer.innerHTML = "<p>No se pudieron cargar los proyectos.</p>";
    console.error(error);
  });

function showProject(index) {
  const repo = projects[index];
  let projectImage = "";

  if (repo.name === "gameStream") {
    projectImage = "./images/game-stream.webp"; 
  } else if (repo.name === "Pokemon-") {
    projectImage = "./images/pikachu.jpg"; 
  } else if (repo.name === "location-service") {
    projectImage = "./images/gps.jpg"; 
  } else if (repo.name === "Contact-Center") {
    projectImage = "./images/diadema.avif"; 
  }else if (repo.name === "Animeflix") {
    projectImage = "./images/animeflix.webp"; 
  }

  projectsContainer.innerHTML = `
    <div class="carousel-item">
      <div class="carousel-content">
        <h3>${repo.name}</h3>
        <img src="${projectImage}" alt="${repo.name} image" class="project-image">
        <p>${repo.description || "Sin descripción disponible."}</p>
        <a href="${repo.html_url}" target="_blank">Ver en GitHub</a>
      </div>
    </div>
  `;
}




