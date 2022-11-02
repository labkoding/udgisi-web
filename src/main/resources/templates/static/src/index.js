function App() {
    let auth = JSON.parse(localStorage.getItem("auth"));
    // if(!auth || !auth.access_token) window.location.href = "/login.html";
    var accessToken = labkodingMain().getAccessToken()
    var isLoggedIn = labkodingMain().isLoggedIn()
    // console.log('isLoggedIn===>', isLoggedIn)
    // console.log('accessToken===>', accessToken)
    if(!isLoggedIn) window.location.href = "/login.html";
    return (
        <React.Fragment>
            {/* <div>
                <h1>hi {auth.user.full_name}</h1>
            </div> */}
        </React.Fragment>
    )
}

ReactDOM.render(<App/>, document.querySelector('#index_content'));