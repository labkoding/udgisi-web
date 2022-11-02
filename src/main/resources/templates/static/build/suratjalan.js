function submitSuratjalan() {
  var suratjalan_quantity = document.getElementById('suratjalan_quantity').value;
  console.log('suratjalan_quantity:', suratjalan_quantity);
  var suratjalan_price = document.getElementById('suratjalan_price').value;
  console.log('suratjalan_price:', suratjalan_price);
  var store = document.getElementById('store').value;
  console.log('store:', store);
  var suratjalan_id = document.getElementById('suratjalan_id').value;
  console.log('suratjalan_id:', suratjalan_id);
  var suratjalan_number = document.getElementById('suratjalan_number').value;
  console.log('suratjalan_number:', suratjalan_number);
  var accessToken = labkodingMain().getAccessToken();

  if (!suratjalan_number) {
    suratjalan_number = new Date().getTime();
  }

  var graphqlstr = 'upsertTbSuratjalan(request:{id: "' + suratjalan_id + '", nomor_surat:"' + suratjalan_number + '",store_id:"' + store + '",quantity:' + suratjalan_quantity + ',price:"' + suratjalan_price + '"}){  status,error,detail_data{id,nomor_surat,store_id,quantity,price,created_dt,updated_dt,created_by,updated_by,version} }';
  var query = JSON.stringify({ query: "mutation{ " + graphqlstr + " }" });
  console.log('query=>', query);

  fetch(AppConfig.graphqlBaseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'AccessToken': accessToken,
      'hmac': labkodingMain().generateHmac(query)
    },
    body: query
  }).then(function (r) {
    return r.json();
  }).then(function (data) {
    var error = (data.errors || []).map(function (r) {
      return r.message;
    }).join(', ');
    if (error) alert(error);else {
      if (data.data.upsertTbSuratjalan.status === 200) {
        window.location.href = '/sjpreview.html?id=' + data.data.upsertTbSuratjalan.detail_data.id;
      } else alert(data.data.upsertTbSuratjalan.error);
    }
  });
}

function SuratjalanMain() {
  var _React$useContext = React.useContext(ContextOne),
      state = _React$useContext.state,
      dispatch = _React$useContext.dispatch;
  // init data
  // get detail surat jalan


  React.useEffect(function () {
    var params = new URL(document.location).searchParams;
    var id = params.get("id");
    labkodingMain().fetchOneSuratjalanById(id, function () {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      dispatch({ type: 'setSuratjalanDetail', payload: data });
      dispatch({ type: 'setStoreSelected', payload: data.store_id });
      // set value input text
      // const val = data || {}
      document.getElementById('suratjalan_quantity').value = data.quantity || '';
      document.getElementById('suratjalan_price').value = data.price || '';
      document.getElementById('suratjalan_id').value = data.id || '';
      document.getElementById('suratjalan_number').value = data.nomor_surat || '';
    });
  }, []);
  var handleOnChangeComboboxStore = function handleOnChangeComboboxStore(value) {
    dispatch({ type: 'setStoreSelected', payload: value });
  };
  return React.createElement(
    ContextOneProvider,
    null,
    ReactDOM.createPortal(React.createElement(StoreCombobox, { currentId: state.storeSelected, handleOnChange: handleOnChangeComboboxStore }), document.querySelector('#combobox_store'))
  );
}

ReactDOM.render(React.createElement(
  ContextOneProvider,
  null,
  React.createElement(SuratjalanMain, null)
), document.querySelector('#root'));
// ReactDOM.render(<App/>, document.querySelector('#suratjalan_content'));