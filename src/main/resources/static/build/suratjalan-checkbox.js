function DaftarSuratJalanItem(_ref) {
  var row = _ref.row,
      handleOnClickCheckbox = _ref.handleOnClickCheckbox,
      suratJalanChecked = _ref.suratJalanChecked;

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
function SuratjalanCheckbox() {
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
        null,
        'Next'
      )
    )
  );
}
// ReactDOM.render(<ContextOneProvider><App /></ContextOneProvider>, document.querySelector('#daftar_suratjalan'))