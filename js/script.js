//div is where your profile information will appear.
const overview = document.querySelector(".overview");
//GitHub username
const username = "anabfuentes";
//selects the unordered list that displays the repos list
const repoList = document.querySelector(".repo-list");

const profileInfo = async function () {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    
    //console.log(data);
    displayProfileInfo(data);
};

profileInfo();


const displayProfileInfo = function (data) {
    let userInfoDiv = document.createElement("div");
    userInfoDiv.classList.add("user-info");
    userInfoDiv.innerHTML = `
    <figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div>`;
  overview.append(userInfoDiv);
  getRepos();
};


const getRepos = async function () {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?type=owner&sort=updated&direction=desc&per_page=100`);
    const repoData = await fetchRepos.json();
    repoInfo(repoData);

};  

getRepos();

const repoInfo = function (repos) {
    for (const repo of repos) {
        let repoLi = document.createElement("li");
        repoLi.classList.add(".repo");
        repoLi.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoLi);
    }
};

