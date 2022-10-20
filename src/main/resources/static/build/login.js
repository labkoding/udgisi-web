var backendBaseUrl = 'http://localhost:8288';

function processingLoginResponse(data) {
    console.log('data==>', data);
    var AppConfig = labkodingMain().AppConfig;
    var accessToken = data.data.login.access_token;
    var errMsg = data.data.login.error;
    if (accessToken) {
        // save localstorage
        // var encrypted = labkodingMain().sha256('testing').toString();
        var merchantIdd = '1588133343427HsZOX';
        var token = accessToken;
        console.log('successs login');
        var session = {};
        var miliseconds = labkodingMain().miliseconds;
        session[AppConfig.idleTimeFlag] = parseInt(new Date().getTime() + miliseconds(AppConfig.idleTimeIncHours, AppConfig.idleTimeIncMinutes, AppConfig.idleTimeIncSeconds));
        session[AppConfig.sessionToken] = token;
        session[AppConfig.loginFlag] = true;
        labkodingMain().setSession(session, function () {
            console.log('callback setSession');
            window.localStorage.setItem('auth', JSON.stringify({ user: data.data.login.user, user_privileges: data.data.login.user_privileges, role: data.data.login.role, user_merchants: data.data.login.user_merchants }));
            // set interval
            setInterval(function () {
                var isLoggedIn = labkodingMain().isLoggedIn();
                console.log('interval isLOggedIn=', isLoggedIn);
                if (isLoggedIn) window.location.href = "/index.html";
            }, 1000);
        });
        // labkodingMain().setSession({ [AppConfig.idleTimeFlag]: parseInt(new Date().getTime() + miliseconds(AppConfig.idleTimeIncHours, AppConfig.idleTimeIncMinutes, AppConfig.idleTimeIncSeconds)), [AppConfig.loginFlag]: true, merchant_id: merchantIdd, [AppConfig.sessionToken]: token })
        // localStorage.setItem("auth", JSON.stringify(data.data.login));
    } else {
        alert(errMsg);
    }
}

function submitLogin() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var graphqlstr = "login(username:\"" + username + "\", password:\"" + password + "\"){ access_token status error user{full_name, username, email, user_id} user_privileges role user_merchants{id, merchant_name, merchant_code, is_default, plan} }";
    var query = JSON.stringify({ query: "{ " + graphqlstr + " }" });

    fetch(AppConfig.graphqlBaseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'hmac': labkodingMain().generateHmac(query)
        },
        body: query
    }).then(function (r) {
        return r.json();
    }).then(function (data) {
        return processingLoginResponse(data);
    });
}

function App() {
    // localStorage.removeItem(labkodingMain().AppConfig.sessionData);
    // var encrypted = labkodingMain().sha256('testing').toString();
    return React.createElement(
        React.Fragment,
        null,
        React.createElement('div', null)
    );
}

ReactDOM.render(React.createElement(App, null), document.querySelector('#login_content'));