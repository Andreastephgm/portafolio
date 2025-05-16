const githubUsername = "Andreastephgm";
const projectsContainer = document.getElementById("github-projects");
let scrollPosition = 0;
const track = document.querySelector(".carousel-track");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const selectedProjects = [
  {
    name: 'todo-s',
    image: './images/photo.jpg'
  },
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
    name: 'Animeflix',
    image: './images/animeflix.webp'
  },
  {
    name: 'gestion_academica',
    image: './images/photo.jpg'
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

function scrollSlider(direction) {
  const itemWidth = document.querySelector(".carousel-item").offsetWidth + 16; 
  const visibleWidth = document.querySelector(".carousel-container").offsetWidth;
  const totalWidth = track.scrollWidth;

  if (direction === "next") {
    scrollPosition = Math.min(scrollPosition + itemWidth, totalWidth - visibleWidth);
  } else {
    scrollPosition = Math.max(scrollPosition - itemWidth, 0);
  }

  track.style.transform = `translateX(-${scrollPosition}px)`;
}

prevBtn.addEventListener("click", () => scrollSlider("prev"));
nextBtn.addEventListener("click", () => scrollSlider("next"));

function createProjectCard(project, imageUrl) {
  const card = document.createElement("div");
  card.classList.add("carousel-item");

  card.innerHTML = `
    <img src="${imageUrl}" alt="${project.name}" class="project-image" />
    <h3>${project.name}</h3>
    <a href="${project.html_url}" target="_blank">Ver en GitHub</a><br>
    <a href="https://andreastephgm.github.io/${project.name}" target="_blank">Ver Proyecto</a>
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








