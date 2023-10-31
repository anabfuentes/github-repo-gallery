//div is where your profile information will appear.
const overview = document.querySelector(".overview");
//GitHub username
const username = "anabfuentes";
//selects the unordered list that displays the repos list
const repoList = document.querySelector(".repo-list");
//selects section where all repo information appears
const reposContainer = document.querySelector(".repos");
//selects where the repo data will appear
const repoData = document.querySelector(".repo-data");
//selects "back to repo gallery" button
const backButton = document.querySelector(".view-repos");
//selects the input with "search by name" placeholder
const filterInput = document.querySelector(".filter-repos");



const profileInfo = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    
    //console.log(data);
    displayProfileInfo(data);
};

profileInfo();


const displayProfileInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
    <figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div>`;
  overview.append(div);
  getRepos();
};


const getRepos = async function () {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?type=owner&sort=updated&direction=desc&per_page=100`);
    const repoData = await fetchRepos.json();
    showInfo(repoData);

};  

const showInfo = function (repos) {
    filterInput.classList.remove("hide");
    for (const repo of repos) {
        const repoLi = document.createElement("li");
        repoLi.classList.add("repo");
        repoLi.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoLi);
    }
};

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});

const getRepoInfo = async function (repoName) {
    const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchInfo.json();
    console.log(repoInfo);
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    
    const languages = [];
for (const language in languageData) {
    languages.push(language);

}
    showRepoInfo(repoInfo, languages);
};

const showRepoInfo = function (repoInfo, languages) {
  repoData.innerHTML = "";
  repoData.classList.remove("hide");
  reposContainer.classList.add("hide");
  const div = document.createElement("div");
  div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
  `;
  repoData.append(div);
  backButton.classList.remove("hide");
};

backButton.addEventListener("click", function () {
    reposContainer.classList.remove("hide");
    repoData.classList.add("hide");
    backButton.classList.add("hide");

})

filterInput.addEventListener("input", function (e) {
    const search = filterInput.value;
    const repos = document.querySelectorAll("repo");

})