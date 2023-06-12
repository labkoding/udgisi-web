var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var ContextOne = React.createContext();
var initialState = {
  offset: 0,
  version: 0,
  songs: [],
  favorites: [],
  suratJalanList: [],
  storeList: [],
  searchString: ''
};

var reducer = function reducer(state, action) {
  switch (action.type) {
    case 'loadData':
      return Object.assign({}, state, action.payload, { version: state.version + 1 });
    case 'setSearchString':
      return Object.assign({}, state, { searchString: action.payload, version: state.version + 1 });
    case 'setSuratjalanList':
      return Object.assign({}, state, { suratJalanList: action.payload, version: state.version + 1 });
    case 'setStoreList':
      return Object.assign({}, state, { storeList: action.payload, version: state.version + 1 });
    case 'setOffset':
      return Object.assign({}, state, { offset: action.payload });
    case 'setSongs':
      return Object.assign({}, state, { songs: action.payload, version: state.version + 1 });
    case 'addToFavorites':
      var result = [].concat(_toConsumableArray(state.favorites), _toConsumableArray(action.payload));
      return Object.assign({}, state, { favorites: result, version: state.version + 1 });
    case 'removeFromFavorites':
      return Object.assign({}, state, { favorites: action.payload, version: state.version + 1 });
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

function fetchAllSuratjalanByStoreId(cb, storeId) {
  // let { state, dispatch } = React.useContext(ContextOne);

  var accessToken = labkodingMain().getAccessToken();
  // let store = document.getElementById('store').value;
  console.log('storeIdstoreId=>', storeId);
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
function onChangeStore(value, cb) {
  fetchAllSuratjalanByStoreId(function (listData) {}, value);
}
// component
function DaftarSuratJalanItem(_ref) {
  var row = _ref.row;

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      'div',
      { 'class': 'checkbox_wrap' },
      React.createElement(
        'div',
        { 'class': 'checkbox_left' },
        row.label
      ),
      React.createElement(
        'div',
        { 'class': 'checkbox_right' },
        React.createElement('i', { 'class': 'fas fa-check' }),
        React.createElement('input', { type: 'checkbox', 'class': 'checkbox' }),
        React.createElement('i', { 'class': 'fas fa-times' })
      )
    )
  );
}
// component
function DaftarSuratJalan() {
  var _React$useContext = React.useContext(ContextOne),
      state = _React$useContext.state,
      dispatch = _React$useContext.dispatch;

  labkodingMain().restriction();
  console.log('satuuu=>', state.version);

  var _React$useState = React.useState(state.suratJalanList),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      listSuratjalan = _React$useState2[0],
      setListSuratjalan = _React$useState2[1];

  React.useEffect(function () {
    // setInterval(function () {
    //     let store = document.getElementById('store').value;
    //     console.log('store====>', store)
    // }, 1000);
    // fetchAllSuratjalanByStoreId(function(listData){
    //     setListSuratjalan(listData)
    // })
  }, []);
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      'p',
      null,
      React.createElement(
        'span',
        null,
        state.version
      ),
      React.createElement('br', null)
    )
  );
}
function fetchAllStore(cb) {
  var _React$useContext2 = React.useContext(ContextOne),
      state = _React$useContext2.state,
      dispatch = _React$useContext2.dispatch;

  var accessToken = labkodingMain().getAccessToken();
  var graphqlstr = 'getAllTbStore(request:{page_index: 0, page_size: 1000}){status,error,list_data{id,store_name,created_dt,updated_dt,created_by,updated_by,version},count,page_count}';
  var query = JSON.stringify({ query: '{ ' + graphqlstr + ' }' });
  // fetch(AppConfig.graphqlBaseUrl, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Accept: 'application/json',
  //     AccessToken: accessToken,
  //     hmac: labkodingMain().generateHmac(query)
  //   },
  //   body: query
  // }).then(r => r.json())
  //   .then(data => {
  //     const listOptions = data.data.getAllTbStore.list_data.map(r => {
  //       return { id: r.id, label: r.store_name }
  //     })
  //     cb(listOptions)
  //   })
}
// component
function StoreOptions() {
  labkodingMain().restriction();

  var _React$useContext3 = React.useContext(ContextOne),
      state = _React$useContext3.state,
      dispatch = _React$useContext3.dispatch;
  // let { currentStore, setCurrentStore} = React.useState('');


  React.useEffect(function () {
    fetchAllStore(function (listData) {
      console.log('listData=>', listData);
      //     dispatch({ type: 'setStoreList', payload: listData })
    });
    //   // setCurrentStore(listData[0].id)
  }, []);
  // React.useEffect(() => {
  //   console.log('currentStore=>', currentStore)
  // }, [currentStore]);
  var handleOnChangeComboboxStore = function handleOnChangeComboboxStore(e) {
    console.log('handleOnChangeComboboxStore');
    fetchAllSuratjalanByStoreId(function (listData) {
      console.log('listData=>', listData);
      dispatch({ type: 'setSuratjalanList', payload: listData });
    }, e.target.value);
  };
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      'select',
      { name: 'store', id: 'store', onChange: handleOnChangeComboboxStore },
      state.storeList.map(function (r, i) {
        return React.createElement(
          'option',
          { key: i, value: r.id },
          r.label
        );
      })
    )
  );
}

// ReactDOM.render(<ContextOneProvider><DaftarSuratJalan /></ContextOneProvider>, document.querySelector('#daftar_suratjalan'))
ReactDOM.render(React.createElement(
  ContextOneProvider,
  null,
  React.createElement(StoreOptions, null)
), document.querySelector('#combobox_store'));