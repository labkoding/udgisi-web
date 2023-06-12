function submitKwitansi(_ref) {
  var idInvoice = _ref.idInvoice;

  // window.location.href = "/inpreview.html?id=";
  // alert(storeId)
  var kwitansi_id = '';
  var kwitansi_number = '';
  var invoice_ids = JSON.stringify(idInvoice);
  var accessToken = labkodingMain().getAccessToken();

  var graphqlstr = 'upsertTbKwitansi(request:{id: "' + kwitansi_id + '", nomor_kwitansi:"' + kwitansi_number + '",invoice_ids:' + invoice_ids + '}){  status,error,detail_data{id,nomor_kwitansi,created_dt,updated_dt,created_by,updated_by} }';
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
      if (data.data.upsertTbKwitansi.status === 200) {
        window.location.href = '/kwpreview.html?id=' + data.data.upsertTbKwitansi.detail_data.id;
      } else alert(data.data.upsertTbKwitansi.error);
    }
  });
}

function DaftaInoviceItem(_ref2) {
  var row = _ref2.row,
      handleOnClickCheckbox = _ref2.handleOnClickCheckbox,
      invoiceChecked = _ref2.invoiceChecked;

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
          { href: "/invoice.html?id=" + row.id },
          row.label
        )
      ),
      React.createElement(
        'div',
        { className: 'checkbox_right' },
        React.createElement('i', { className: 'fas fa-check' }),
        React.createElement('input', { type: 'checkbox', className: 'checkbox', checked: invoiceChecked.indexOf(row.id) !== -1, onChange: function onChange() {}, onClick: function onClick(e) {
            return handleOnClickCheckbox(e, row.id);
          } }),
        React.createElement('i', { className: 'fas fa-times' })
      )
    )
  );
}
function InvoiceCheckbox() {
  labkodingMain().restriction();

  var _React$useContext = React.useContext(ContextOne),
      state = _React$useContext.state,
      dispatch = _React$useContext.dispatch;

  var handleOnClickCheckbox = function handleOnClickCheckbox(e, id) {
    if (e.target.checked) state.invoiceChecked.push(id);else state.invoiceChecked.splice(state.invoiceChecked.indexOf(id), 1);
    dispatch({ type: 'invoiceChecked', payload: state.invoiceChecked });
  };
  return React.createElement(
    React.Fragment,
    null,
    state.invoiceList.map(function (r, i) {
      return React.createElement(DaftaInoviceItem, { key: i, row: r, handleOnClickCheckbox: handleOnClickCheckbox, invoiceChecked: state.invoiceChecked });
    }),
    React.createElement(
      'div',
      { className: 'next' },
      React.createElement(
        'button',
        { onClick: function onClick() {
            return submitKwitansi({ idInvoice: state.invoiceChecked });
          } },
        'Next'
      )
    )
  );
}
// ReactDOM.render(<ContextOneProvider><App /></ContextOneProvider>, document.querySelector('#daftar_suratjalan'))