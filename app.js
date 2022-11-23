const APIURL = 'https://api.github.com/users/';

const form = document.getElementById('form');
const main = document.getElementById('main');
const search = document.getElementById('search');

async function getUser(username) {
    const response = await fetch(APIURL + username);
    const respData = await response.json();

    createUserCard(respData);

    getRepos(username);
}

async function getRepos(username) {
    const response = await fetch(APIURL + username + "/repos");
    const respData = await response.json();

    addReposToCard(respData);
}

function createUserCard(user) {
    const card = document.createElement('div');
    card.classList.add('card');

    const cardHTML = `
        <div class="card">
            <div>
                <img class="avatar" src="${user.avatar_url}" alt="${user.name}"/>
            </div>
            <div class="user-info">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>

                <ul class="info">
                    <li>${user.followers}<strong>Followers</strong></li>
                    <li>${user.following}<strong>Following</strong></li>
                    <li>${user.public_repos}<strong>Repos</strong></li>
                    <a href="${user.html_url}" target="_blank">Click to join Github</a>
                </ul>
                <div id="repos"></div>
            </div>
        </div>
    `;

    main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
    const reposEl = document.getElementById('repos');
    console.log(repos);

    //.sort() by stars which projects have in github
    repos.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 10).forEach((repo) => {
        const repoEl = document.createElement('a');
        repoEl.classList.add('repo');

        repoEl.href = repo.html_url;
        repoEl.target = '_blank';
        repoEl.innerText = repo.name;

        reposEl.appendChild(repoEl);
    });
}

form.addEventListener('submit', e => {
    e.preventDefault();

    const user = search.value;

    if(user) {
        getUser(user);

        search.value = '';
    }
});