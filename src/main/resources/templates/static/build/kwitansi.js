function KwitansiMain() {
  var _React$useContext = React.useContext(ContextOne),
      state = _React$useContext.state,
      dispatch = _React$useContext.dispatch;

  // const currentStoreId = state.storeSelected
  // const currentSelectedSuratjalan

  var fetchAllInvoice = function fetchAllInvoice() {
    labkodingMain().fetchAllInvoice(function (listData) {
      dispatch({ type: 'setInvoiceList', payload: listData });
      dispatch({ type: 'invoiceChecked', payload: [] });
    });
  };
  React.useEffect(function () {
    fetchAllInvoice();
  }, []);
  return React.createElement(
    React.Fragment,
    null,
    ReactDOM.createPortal(React.createElement(InvoiceCheckbox, null), document.querySelector('#daftar_invoice'))
  );
}
ReactDOM.render(React.createElement(
  ContextOneProvider,
  null,
  React.createElement(KwitansiMain, null)
), document.querySelector('#root'));