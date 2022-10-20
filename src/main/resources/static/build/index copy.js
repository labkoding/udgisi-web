var AppConfig = {
    graphqlPath: '/ryvjrfzawzj7u58jyjep942vq3e59jj468vrg49w53qtxcnjnmrv257qzxba'
};

function App() {
    var auth = JSON.parse(localStorage.getItem("auth"));
    if (!auth || !auth.access_token) window.location.href = "/login.html";
    return React.createElement(
        React.Fragment,
        null,
        React.createElement(
            "div",
            null,
            React.createElement(
                "h1",
                null,
                "hi ",
                auth.user.full_name
            )
        )
    );
}

ReactDOM.render(React.createElement(App, null), document.querySelector('#index_content'));