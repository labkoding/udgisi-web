function DaftarSuratJalanItem(_ref) {
  var row = _ref.row;

  var handleOnClickCheckbox = function handleOnClickCheckbox(e) {
    console.log("Clicked, new value = ", e.target.checked);
  };
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
        React.createElement('input', { type: 'checkbox', className: 'checkbox', onClick: handleOnClickCheckbox }),
        React.createElement('i', { className: 'fas fa-times' })
      )
    )
  );
}
function InvoiceSuratJalan() {
  labkodingMain().restriction();

  var _React$useContext = React.useContext(ContextOne),
      state = _React$useContext.state,
      dispatch = _React$useContext.dispatch;

  var storeId = '';
  React.useEffect(function () {
    // labkodingMain().fetchAllSuratjalanByStoreId(function (listData) {
    //   dispatch({ type: 'setSuratjalanList', payload: listData })
    // }, storeId)
  }, []);
  var handleOnChangeComboboxStore = function handleOnChangeComboboxStore() {
    // fetch surat jalan by store id
  };
  return React.createElement(
    React.Fragment,
    null,
    state.suratJalanList.map(function (r, i) {
      return React.createElement(DaftarSuratJalanItem, { key: i, row: r });
    }),
    React.createElement(
      'div',
      { className: 'next' },
      React.createElement(
        'button',
        null,
        'Next'
      )
    )
  );
}
// ReactDOM.render(<ContextOneProvider><App /></ContextOneProvider>, document.querySelector('#daftar_suratjalan'))