function App() {
    var auth = JSON.parse(localStorage.getItem("auth"));
    // if(!auth || !auth.access_token) window.location.href = "/login.html";
    var accessToken = labkodingMain().getAccessToken();
    var isLoggedIn = labkodingMain().isLoggedIn();
    // console.log('isLoggedIn===>', isLoggedIn)
    // console.log('accessToken===>', accessToken)
    if (!isLoggedIn) window.location.href = "/login.html";
    return React.createElement(React.Fragment, null);
}

ReactDOM.render(React.createElement(App, null), document.querySelector('#index_content'));