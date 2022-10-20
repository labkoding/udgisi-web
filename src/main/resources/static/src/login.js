const backendBaseUrl = 'http://localhost:8288'

function processingLoginResponse(data){
    console.log('data==>', data);
    var AppConfig = labkodingMain().AppConfig;
    var accessToken = data.data.login.access_token;
    var errMsg = data.data.login.error;
    if(accessToken){
        // save localstorage
        // var encrypted = labkodingMain().sha256('testing').toString();
        const merchantIdd = '1588133343427HsZOX';
        var token = accessToken;
        console.log('successs login')
        var session = {}
        var miliseconds = labkodingMain().miliseconds;
        session[AppConfig.idleTimeFlag] = parseInt(new Date().getTime() + miliseconds(AppConfig.idleTimeIncHours, AppConfig.idleTimeIncMinutes, AppConfig.idleTimeIncSeconds))
        session[AppConfig.sessionToken] = token
        session[AppConfig.loginFlag] = true
        labkodingMain().setSession(session, function(){
            console.log('callback setSession')
            window.localStorage.setItem('auth', JSON.stringify({ user: data.data.login.user, user_privileges: data.data.login.user_privileges, role: data.data.login.role, user_merchants: data.data.login.user_merchants }));  
            // set interval
            setInterval(function () {
                var isLoggedIn = labkodingMain().isLoggedIn()
                console.log('interval isLOggedIn=', isLoggedIn)
                if (isLoggedIn) window.location.href = "/index.html";
            }, 1000);
            
        })
        // labkodingMain().setSession({ [AppConfig.idleTimeFlag]: parseInt(new Date().getTime() + miliseconds(AppConfig.idleTimeIncHours, AppConfig.idleTimeIncMinutes, AppConfig.idleTimeIncSeconds)), [AppConfig.loginFlag]: true, merchant_id: merchantIdd, [AppConfig.sessionToken]: token })
        // localStorage.setItem("auth", JSON.stringify(data.data.login));
    } else {
        alert(errMsg)
    }
}

function submitLogin(){
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let graphqlstr = "login(username:\""+username+"\", password:\""+password+"\"){ access_token status error user{full_name, username, email, user_id} user_privileges role user_merchants{id, merchant_name, merchant_code, is_default, plan} }"
    const query = JSON.stringify({query: "{ " + graphqlstr + " }"})

    fetch(AppConfig.graphqlBaseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'hmac': labkodingMain().generateHmac(query),
        },
        body: query
      })
        .then(r => r.json())
        .then(data => processingLoginResponse(data));
}

function App() {
    // localStorage.removeItem(labkodingMain().AppConfig.sessionData);
    // var encrypted = labkodingMain().sha256('testing').toString();
    return (
        <React.Fragment>
            <div>
                {/* <h1>GraphQL Playground</h1> */}
            </div>
        </React.Fragment>
    )
}

ReactDOM.render(<App/>, document.querySelector('#login_content'));