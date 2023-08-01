// The div where profile info will appear
const profileInfo = document.querySelector(".overview");
// Github username
const username = "Brittany1215";
// Unordered list to display the repos list
const repoList = document.querySelector(".repo-list");
// repo info appears
const allReposContainer = document.querySelector(".repos");
// individual repo data
const repoData = document.querySelector(".repo-data");
// back to repo button
const repoButton = document.querySelector(".view-repos");
// "Search by name" placeholder
const filterInput = document.querySelector(".filter-repos");

const gitHubData = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    // console.log(data);
    displayUserInfo(data); 
}; 

gitHubData();

const displayUserInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML =  `
    <figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div>
  `;
  profileInfo.append(div);
  gitHubRepo();
};

const gitHubRepo = async function () {
    const fetchRepos = await fetch
    (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();
    displayRepos(repoData);
};

const displayRepos = function(repos) {
    filterInput.classList.remove("hide");
    for (const repo of repos) {
       const repoItem = document.createElement("li");
       repoItem.classList.add("repo");
       repoItem.innerHTML = `<h3>${repo.name}</h3>`;
       repoList.append(repoItem);
    };
};

repoList.addEventListener("click", function (e){
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});

const getRepoInfo = async function(repoName) {
    const fetchRepo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchRepo.json();
    console.log(repoInfo);
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    console.log(languageData);
    const languages = [];
        for (const language in languageData) {
            languages.push(language);
        }
        // console.log(languages);
        displayRepoInfo(repoInfo,languages);
};

const displayRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    allReposContainer.classList.add("hide");
    const div = document.createElement("div");
    div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`
    repoData.append(div);
    repoButton.classList.remove("hide"); 
};

repoButton.addEventListener("click", function() {
    allReposContainer.classList.remove("hide");
    repoData.classList.add("hide");
    repoButton.classList.add("hide");
});

filterInput.addEventListener("input", function (e){
    const userInput = e.target.value;
    const repos = document.querySelectorAll(".repo");
    const lowerCaseSearch = userInput.toLowerCase();
    for (const repo of repos) {
        const lowerCaseRepo = repo.innerText.toLowerCase();
        if (lowerCaseRepo.includes(lowerCaseSearch)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});



