function submitInvoice(_ref) {
  var idSuratjalan = _ref.idSuratjalan,
      storeId = _ref.storeId;

  // window.location.href = "/inpreview.html?id=";
  // alert(storeId)
  var invoice_id = '';
  var invoice_number = '';
  var suratjalan_ids = JSON.stringify(idSuratjalan);
  var accessToken = labkodingMain().getAccessToken();

  var graphqlstr = 'upsertTbInvoice(request:{id: "' + invoice_id + '", nomor_invoice:"' + invoice_number + '",store_id:"' + storeId + '",suratjalan_ids:' + suratjalan_ids + '}){  status,error,detail_data{id,nomor_invoice,store_id,version,created_dt,updated_dt,created_by,updated_by} }';
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
      if (data.data.upsertTbInvoice.status === 200) {
        window.location.href = '/inpreview.html?id=' + data.data.upsertTbInvoice.detail_data.id;
      } else alert(data.data.upsertTbInvoice.error);
    }
  });
}

function DaftarSuratJalanItem(_ref2) {
  var row = _ref2.row,
      handleOnClickCheckbox = _ref2.handleOnClickCheckbox,
      suratJalanChecked = _ref2.suratJalanChecked;

  // console.log('DaftarSuratJalanItem invoked ', suratJalanChecked)
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      'div',
      { className: 'checkbox_wrap' },
      React.createElement(
        'div',
        { className: 'checkbox_left' },
        React.createElement(
          'a',
          { href: "/suratjalan.html?id=" + row.id },
          row.label
        )
      ),
      React.createElement(
        'div',
        { className: 'checkbox_right' },
        React.createElement('i', { className: 'fas fa-check' }),
        React.createElement('input', { type: 'checkbox', className: 'checkbox', checked: suratJalanChecked.indexOf(row.id) !== -1, onChange: function onChange() {}, onClick: function onClick(e) {
            return handleOnClickCheckbox(e, row.id);
          } }),
        React.createElement('i', { className: 'fas fa-times' })
      )
    )
  );
}
function SuratjalanCheckbox(_ref3) {
  var storeId = _ref3.storeId;

  labkodingMain().restriction();

  var _React$useContext = React.useContext(ContextOne),
      state = _React$useContext.state,
      dispatch = _React$useContext.dispatch;

  React.useEffect(function () {
    // labkodingMain().fetchAllSuratjalanByStoreId(function (listData) {
    //   dispatch({ type: 'setSuratjalanList', payload: listData })
    // }, storeId)
  }, []);
  var handleOnClickCheckbox = function handleOnClickCheckbox(e, id) {
    // console.log("Clicked, new value = ",  e.target.checked);
    if (e.target.checked) state.suratJalanChecked.push(id);else state.suratJalanChecked.splice(state.suratJalanChecked.indexOf(id), 1);
    dispatch({ type: 'suratJalanChecked', payload: state.suratJalanChecked });
  };
  return React.createElement(
    React.Fragment,
    null,
    state.suratJalanList.map(function (r, i) {
      return React.createElement(DaftarSuratJalanItem, { key: i, row: r, handleOnClickCheckbox: handleOnClickCheckbox, suratJalanChecked: state.suratJalanChecked });
    }),
    React.createElement(
      'div',
      { className: 'next' },
      React.createElement(
        'button',
        { onClick: function onClick() {
            return submitInvoice({ idSuratjalan: state.suratJalanChecked, storeId: storeId });
          } },
        'Next'
      )
    )
  );
}
// ReactDOM.render(<ContextOneProvider><App /></ContextOneProvider>, document.querySelector('#daftar_suratjalan'))