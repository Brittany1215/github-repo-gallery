// The div where profile info will appear
const profileInfo = document.querySelector(".overview");
// Github username
const username = "Brittany1215";
// Unordered list to display the repos list
const repoList = document.querySelector(".repo-list");

const gitHubData = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
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
    displayRepoInfo(repoData);
};

const displayRepoInfo = function(repos) {
    for (const repo of repos) {
       const repoItem = document.createElement("li");
       repoItem.classList.add("repo");
       repoItem.innerHTML = `<h3>${repo.name}</h3>`;
       repoList.append(repoItem);
    };
};




