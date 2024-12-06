const CLIENT_ID = "1314538715741294592";
const REDIRECT_URI = "https://download-ruby-five.vercel.app";

document.getElementById("login-button").addEventListener("click", () => {
  const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=identify`;
  window.location.href = authUrl;
});

if (window.location.hash) {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  const accessToken = params.get("access_token");

  if (accessToken) {
    fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => response.json())
      .then(data => {
        document.getElementById("login-button").style.display = "none";
        document.getElementById("user-info").style.display = "block";
        document.getElementById("username").textContent = `Hello, ${data.username}#${data.discriminator}`;
      })
      .catch(error => console.error("Error fetching user info:", error));
  }
}
