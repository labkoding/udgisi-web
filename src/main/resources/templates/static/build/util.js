var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

if (typeof __ENV__ == 'undefined') __ENV__ = 'development';
var backendBaseUrl = __ENV__ == 'production' ? '' : 'http://localhost:8288';
var AppConfig = {
  baseUrl: backendBaseUrl,
  graphqlPath: '/ryvjrfzawzj7u58jyjep942vq3e59jj468vrg49w53qtxcnjnmrv257qzxba',
  graphqlBaseUrl: backendBaseUrl + '/fmpkcxgwv4zuecddsnk65htcrvnt9ae4jc3h58b4',
  authHeader: 'Authorization',
  authTokenType: 'Bearer',
  publicToken: 'publicToken',
  sessionToken: 'st',
  loginFlag: 'il',
  idleTimeFlag: 'it',
  idleTimeIncHours: 0,
  idleTimeIncMinutes: 30,
  idleTimeIncSeconds: 0,
  sessionData: 'ssst',
  hmacKey: 'QsXtEtYmuPdBUFvtS4DSsmm52v6MaMvWf7Er7Eth'
};
var sha256 = CryptoJS.SHA256;
var AES = CryptoJS.AES;
var hmacSha256 = CryptoJS.HmacSHA256;
var EncUtf8 = CryptoJS.enc.Utf8;
// var hmacSha256 = require('crypto-js/hmac-sha256')
// var sha256 = require('crypto-js/sha256')
// var EncUtf8 = require('crypto-js/enc-utf8')

var ContextOne = React.createContext();
var initialState = {
  offset: 0,
  version: 0,
  suratJalanChecked: [],
  suratJalanList: [],
  suratjalanDetail: {},
  setInvoiceDetail: {},
  storeSelected: '',
  storeList: []
};
var reducer = function reducer(state, action) {
  switch (action.type) {
    case 'loadData':
      return Object.assign({}, state, action.payload, { version: state.version + 1 });
    case 'setSuratjalanList':
      return Object.assign({}, state, { suratJalanList: action.payload, version: state.version + 1 });
    case 'setSuratjalanDetail':
      return Object.assign({}, state, { suratjalanDetail: action.payload, version: state.version + 1 });
    case 'setInvoiceDetail':
      return Object.assign({}, state, { invoiceDetail: action.payload, version: state.version + 1 });
    case 'setStoreList':
      return Object.assign({}, state, { storeList: action.payload, version: state.version + 1 });
    case 'setStoreSelected':
      return Object.assign({}, state, { storeSelected: action.payload, version: state.version + 1 });
    case 'suratJalanChecked':
      return Object.assign({}, state, { suratJalanChecked: action.payload, version: state.version + 1 });
  }
};
function ContextOneProvider(props) {
  var _React$useReducer = React.useReducer(reducer, initialState),
      _React$useReducer2 = _slicedToArray(_React$useReducer, 2),
      state = _React$useReducer2[0],
      dispatch = _React$useReducer2[1];

  var value = { state: state, dispatch: dispatch };
  React.useEffect(function () {
    if (state.version > 0) {
      var jsonValue = JSON.stringify(state);
      localStorage.setItem('DATABASE', jsonValue);
    }
  }, [state.version]);
  React.useEffect(function () {
    value = localStorage.getItem('DATABASE');
    // .then((value) => {
    var jsonValue = value != null ? JSON.parse(value) : initialState;
    dispatch({ type: 'loadData', payload: jsonValue });
    // });
  }, []);
  return React.createElement(
    ContextOne.Provider,
    { value: value },
    props.children
  );
}
var ContextOneConsumer = ContextOne.Consumer;

function miliseconds(hrs, min, sec) {
  return (hrs * 60 * 60 + min * 60 + sec) * 1000;
}
function setSession(newSession, cb) {
  var encryptedCurrentSession = window.localStorage.getItem(AppConfig.sessionData);
  var currentSessionJson = {};
  if (encryptedCurrentSession) {
    // decrypt
    var bytes = AES.decrypt(encryptedCurrentSession, 'prismalink2019');
    var decryptedData = bytes.toString(EncUtf8);
    currentSessionJson = JSON.parse(decryptedData);
  }
  currentSessionJson = Object.assign({}, currentSessionJson, newSession);
  // console.log('currentSessionJson1==>', currentSessionJson)
  var ciphertext = AES.encrypt(JSON.stringify(currentSessionJson), 'prismalink2019');
  var encryptedData = ciphertext.toString();
  window.localStorage.setItem(AppConfig.sessionData, encryptedData);
  if (cb) cb();
}
function getSession(parameter) {
  var encryptedCurrentSession = window.localStorage.getItem(AppConfig.sessionData);
  var currentSessionJson = {};
  if (encryptedCurrentSession) {
    // decrypt
    var bytes = AES.decrypt(encryptedCurrentSession, 'prismalink2019');
    var decryptedData = bytes.toString(EncUtf8);
    currentSessionJson = JSON.parse(decryptedData);
  }
  if (parameter) {
    var sessionValue = currentSessionJson[parameter] || '';
    return sessionValue;
  }
  return currentSessionJson;
}
function getAccessToken(accessTokenState) {
  var sessionToken = getSession(AppConfig.sessionToken);
  accessTokenState = accessTokenState || sessionToken;
  return accessTokenState;
}
function isLoggedIn(isLoggedInState) {
  var loginFlag = getSession(AppConfig.loginFlag);
  if (loginFlag === 'true' || loginFlag === 'false') {} else {
    var at = getAccessToken();
    if (at) return true;
  }
  isLoggedInState = loginFlag || false;
  if (isLoggedInState === 'true' || isLoggedInState === true) isLoggedInState = true;else isLoggedInState = false;
  return isLoggedInState;
}
function logout() {
  localStorage.removeItem('DATABASE');
  console.log('remove database');
  localStorage.removeItem(labkodingMain().AppConfig.sessionData);
  localStorage.removeItem('auth');
  window.location.href = "/login.html";
}
function generateHmac(msg) {
  return hmacSha256(msg, AppConfig.hmacKey).toString();
}
function restriction() {
  var isLoggedIn = labkodingMain().isLoggedIn();
  if (!isLoggedIn) window.location.href = "/login.html";
}
function fetchAllStore(cb) {
  var accessToken = labkodingMain().getAccessToken();
  var graphqlstr = 'getAllTbStore(request:{page_index: 0, page_size: 1000}){status,error,list_data{id,store_name,created_dt,updated_dt,created_by,updated_by,version},count,page_count}';
  var query = JSON.stringify({ query: '{ ' + graphqlstr + ' }' });
  fetch(AppConfig.graphqlBaseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      AccessToken: accessToken,
      hmac: labkodingMain().generateHmac(query)
    },
    body: query
  }).then(function (r) {
    return r.json();
  }).then(function (data) {
    var listOptions = data.data.getAllTbStore.list_data.map(function (r) {
      return { id: r.id, label: r.store_name };
    });
    cb(listOptions);
  });
}
function fetchAllSuratjalanByStoreId(cb, storeId) {
  var accessToken = labkodingMain().getAccessToken();
  var graphqlstr = 'getAllTbSuratjalan(request:{page_index: 0, page_size: 1000, filter:{store_id:"' + storeId + '"}}){status,error,list_data{id,nomor_surat,store_id,quantity,price,created_dt,updated_dt,created_by,updated_by,version},count,page_count}';
  var query = JSON.stringify({ query: '{ ' + graphqlstr + ' }' });
  fetch(AppConfig.graphqlBaseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      AccessToken: accessToken,
      hmac: labkodingMain().generateHmac(query)
    },
    body: query
  }).then(function (r) {
    return r.json();
  }).then(function (data) {
    var listOptions = data.data.getAllTbSuratjalan.list_data.map(function (r) {
      return { id: r.id, label: r.nomor_surat };
    });
    cb(listOptions);
    // dispatch({type: 'setSuratjalanList', payload: listOptions})
  });
}
function fetchOneSuratjalanById(id, cb) {
  var accessToken = labkodingMain().getAccessToken();
  var graphqlstr = 'getAllTbSuratjalan(request:{page_index: 0, page_size: 1000, filter:{id:"' + id + '"}}){status,error,list_data{id,nomor_surat,store_id,quantity,price,created_dt,updated_dt,created_by,updated_by,version},count,page_count}';
  var query = JSON.stringify({ query: '{ ' + graphqlstr + ' }' });
  fetch(AppConfig.graphqlBaseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      AccessToken: accessToken,
      hmac: labkodingMain().generateHmac(query)
    },
    body: query
  }).then(function (r) {
    return r.json();
  }).then(function (data) {
    var listOptions = data.data.getAllTbSuratjalan.list_data;
    cb(listOptions[0]);
    // dispatch({type: 'setSuratjalanList', payload: listOptions})
  });
}
function fetchOneInvoiceById(id, cb) {
  var accessToken = labkodingMain().getAccessToken();
  var graphqlstr = 'getAllTbSuratjalan(request:{page_index: 0, page_size: 1000, filter:{id:"' + id + '"}}){status,error,list_data{id,nomor_surat,store_id,quantity,price,created_dt,updated_dt,created_by,updated_by,version},count,page_count}';
  var query = JSON.stringify({ query: '{ ' + graphqlstr + ' }' });
  fetch(AppConfig.graphqlBaseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      AccessToken: accessToken,
      hmac: labkodingMain().generateHmac(query)
    },
    body: query
  }).then(function (r) {
    return r.json();
  }).then(function (data) {
    var listOptions = data.data.getAllTbSuratjalan.list_data;
    cb(listOptions[0]);
    // dispatch({type: 'setSuratjalanList', payload: listOptions})
  });
}
function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}
function labkodingMain(test) {
  // console.log('test===>', sha256(test).toString())
  return {
    includeHTML: includeHTML,
    fetchOneSuratjalanById: fetchOneSuratjalanById,
    fetchOneInvoiceById: fetchOneInvoiceById,
    fetchAllSuratjalanByStoreId: fetchAllSuratjalanByStoreId,
    fetchAllStore: fetchAllStore,
    ContextOneProvider: ContextOneProvider,
    restriction: restriction,
    generateHmac: generateHmac,
    logout: logout,
    isLoggedIn: isLoggedIn,
    getAccessToken: getAccessToken,
    getSession: getSession,
    setSession: setSession,
    miliseconds: miliseconds,
    AppConfig: AppConfig,
    sha256: sha256
    // sha256: sha256(test).toString()
  };
}