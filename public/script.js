const url = 'http://localhost:3000/user/';
const signupURL = "../snippets/signupPage.html";
const getUserInfoFromInputLogin= () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    return {username, password};
};

const getUserInfoFromServer = async (e) => {
    e.preventDefault();  //CORS politics!
    try {
        const userInput = getUserInfoFromInputLogin();
        const urlGetUser = url + userInput.username;
        const response = await fetch(urlGetUser);
        if(response.ok) {
            const data = await response.json();
            if(data.length === 0) {
                console.log("User doesn't exist. Please, sing up!");
            } else if (userInput.username === data[0].username && 
                        userInput.password === data[0].password) {
                            window.location.href = "http://localhost:3001/home.html";
            }
        }
               
    } catch(error) {
        console.log(error);
    }
}

const getSignUpForm = async () => {
    
    const formsDiv = document.querySelector(".forms");
    try {
        const response = await fetch(signupURL);
        if(response.ok) {
            const htmlContent = await response.text();
            formsDiv.innerHTML = htmlContent;
        }
    } catch (error) {
        console.log(error);
    }
}


const signButton = document.getElementById("sign-btn");
signButton.addEventListener('click', getSignUpForm);
const getUserInfoFromInputSignUp = () => {
    const firstName = document.getElementById("firstname").value;
    const lastName = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    return {firstName, lastName, email, username, password};
}

const createUser = async (e) => {
    e.preventDefault();
    try {
        const userInput = getUserInfoFromInputSignUp();
        const response = await fetch('http://localhost:3000/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInput)
        });

        if(response.ok) {
            alert("User has been created!");
        }
        
    } catch (error) {
        console.log(error);
    }

};

