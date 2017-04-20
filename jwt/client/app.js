var secretContent = document.getElementById('secret-content')
var loginForm = document.getElementById('login-form')
var usernameInput = document.getElementById('username')
var loginButton = document.getElementById('login')
var logoutButton = document.getElementById('logout')
var greeting = document.getElementById('greeting')

loginButton.addEventListener('click', handleLoginClick)
logoutButton.addEventListener('click', handleLogoutClick)

secretContent.style.display = 'none'

if (getUser()) {
  showContent(getUser().username)
}

function handleLoginClick() {
  var username = usernameInput.value
  var loginRequest = new XMLHttpRequest()
  loginRequest.open('POST', 'http://localhost:8888/login', true)
  loginRequest.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  var data = {
    username: username
  }
  loginRequest.onload = function() {
    var jwt = loginRequest.responseText
    localStorage.token = jwt
    var name = getUser().username
    showContent(name)
  }
  loginRequest.onerror = function() {
    console.log('Oh no!');
  }
  loginRequest.send(JSON.stringify(data));
}

function handleLogoutClick() {
  localStorage.token = ''
  hideContent()
}

function showContent(name) {
  loginForm.style.display = 'none';
  secretContent.style.display = 'block';
  greeting.textContent = name
}

function hideContent() {
  loginForm.style.display = 'block';
  secretContent.style.display = 'none';
  greeting.textContent = ''
  usernameInput.value = ''
}

function getUser() {
  if (localStorage.token) {
    var decodedToken = JSON.parse(atob(localStorage.token.split('.')[1]))
    if (decodedToken) return decodedToken
  }
}
