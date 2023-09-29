const form = document.getElementById("form");
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const input = form.elements["search"].value;
  if (!input) {
    return alert("Please enter username");
  }
  const details = await getUserDetails(input);
  const getContent = `
    <div class="avatar" id="avatar">
        <img src="${details.avatar_url}" alt="">
    </div>
    <div class="properties" id="properties">
        <span style="font-size: 24px; font-weight: 700">${details.name}</span>
        <span>${details.bio}</span>
           <ul class="follow">
            <li><span style="font-weight:bold; font-size:14px">Followers: </span><span>${details.followers}</span></li>
            <li><span style="font-weight:bold; font-size:14px">Following: </span><span>${details.following}</span></li>
            <li><span style="font-weight:bold; font-size:14px">Repos: </span><span>${details.public_repos}</span></li>
            <li><span style="font-weight:bold; font-size:14px">Twitter: </span><span>${details.twitter_username}</span></li>
            <li><span style="font-weight:bold; font-size:14px">Location: </span><span>${details.location}</span></li>
            </ul>
    </div>
    `;
  let createContent = document.getElementById("content");
  createContent.className = "content";
  createContent.innerHTML = getContent;
});

async function getUserDetails(username) {
  try {
    const user = await fetch(`https://api.github.com/users/${username}`);
    return user.json();
  } catch (error) {
    return null;
  }
}
