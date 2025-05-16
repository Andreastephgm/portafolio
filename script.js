const githubUsername = "Andreastephgm";
const projectsContainer = document.getElementById("github-projects");

// Lista de proyectos con su imagen asociada
const selectedProjects = [
  {
    name: 'gameStream',
    image: "./images/game-stream.webp"
  },
  {
    name: 'Pokemon-',
    image: './images/pikachu.jpg'
  },
  {
    name: 'location-service',
    image: './images/gps.jpg'
  },
  {
    name: 'Contact-Cards',
    image: './images/diadema.avif'
  }
];

async function fetchGitHubRepo(repoName) {
  const response = await fetch(`https://api.github.com/repos/${githubUsername}/${repoName}`);
  if (!response.ok) {
    console.error(`No se pudo obtener ${repoName}`);
    return null;
  }
  return await response.json();
}

function createProjectCard(project, imageUrl) {
  const card = document.createElement("div");
  card.classList.add("carousel-item");

  card.innerHTML = `
    <img src="${imageUrl}" alt="${project.name}" class="project-image" />
    <h3>${project.name}</h3>
    <p>${project.description || "Sin descripción disponible"}</p>
    <a href="${project.html_url}" target="_blank">Ver en GitHub</a>
  `;

  return card;
}

async function loadProjects() {
  for (const repo of selectedProjects) {
    const project = await fetchGitHubRepo(repo.name);
    if (project) {
      const card = createProjectCard(project, repo.image);
      projectsContainer.appendChild(card);
    }
  }
}

loadProjects();








