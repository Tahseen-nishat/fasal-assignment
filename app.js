document.addEventListener("DOMContentLoaded", () => {
    let search_inp = document.querySelector("#name");
    let search_btn = document.querySelector("#search");
    let card = document.querySelector(".card");
    let navbar = document.querySelector(".navbar");

    let showSignup = document.querySelector("#showSignup");
    let showLogin = document.querySelector("#showLogin");
    let loginForm = document.querySelector("#loginForm");
    let signupForm = document.querySelector("#signupForm");
    let loginSubmit = document.querySelector("#loginSubmit");
    let signupSubmit = document.querySelector("#signupSubmit");

    showSignup.addEventListener("click", () => {
        loginForm.classList.add("hidden");
        signupForm.classList.remove("hidden");
    });

    showLogin.addEventListener("click", () => {
        signupForm.classList.add("hidden");
        loginForm.classList.remove("hidden");
    });

    loginSubmit.addEventListener("click", async () => {
        let username = document.querySelector("#loginUsername").value;
        let password = document.querySelector("#loginPassword").value;
        if (username && password) {
            // Simulate login process (You should replace this with real authentication)
            alert(`Logged in as ${username}`);
            loginForm.classList.add("hidden");
            navbar.classList.remove("hidden");
            card.classList.remove("hidden");
        } else {
            alert("Please enter username and password");
        }
    });

    signupSubmit.addEventListener("click", async () => {
        let username = document.querySelector("#signupUsername").value;
        let password = document.querySelector("#signupPassword").value;
        if (username && password) {
            // Simulate signup process (You should replace this with real authentication)
            alert(`Signed up as ${username}`);
            signupForm.classList.add("hidden");
            loginForm.classList.remove("hidden");
        } else {
            alert("Please enter username and password");
        }
    });

    search_btn.addEventListener("click", async () => {
        let movie_name = search_inp.value;
        if (movie_name !== "") {
            try {
                let api = `https://www.omdbapi.com/?apikey=9418ed5b&t=${movie_name}`;
                let responce = await fetch(api);
                let data = await responce.json();
                console.log(data);
                card.innerHTML = "";
                search_inp.value = "";
                let div = document.createElement("div");
                div.classList.add("moviecard");
                div.innerHTML = `
                <img src=${data.Poster} alt="">
                <div class="disc">
                    <h1>${data.Title}</h1>
                    <p id="head">Rating : ${data.Ratings[0].Value}</p>
                    <p id="genere">${data.Genre}</p>
                    <p>Released Date: ${data.Released}</p>
                    <p>Actors: ${data.Actors}</p>
                    <p>Duration: ${data.Runtime}</p>
                    <p>Plot: ${data.Plot}</p>
                </div>
                `;
                card.append(div);
            } catch (error) {
                card.innerHTML = `
                <img src="error.jpg" height=650vmax width=100%>
                `;
            }
        } else {
            card.innerHTML = `
            <img src="emptyimg.jpg" height=650vmax width=100%>
            `;
        }
    });
});
