function InvoiceMain() {
  var _React$useContext = React.useContext(ContextOne),
      state = _React$useContext.state,
      dispatch = _React$useContext.dispatch;

  // const currentStoreId = state.storeSelected
  // const currentSelectedSuratjalan

  var handleOnChangeComboboxStore = function handleOnChangeComboboxStore(value) {
    dispatch({ type: 'setStoreSelected', payload: value });
    labkodingMain().fetchAllSuratjalanByStoreId(function (listData) {
      dispatch({ type: 'setSuratjalanList', payload: listData });
      dispatch({ type: 'suratJalanChecked', payload: [] });
    }, value);
  };
  return React.createElement(
    React.Fragment,
    null,
    ReactDOM.createPortal(React.createElement(StoreCombobox, { handleOnChange: handleOnChangeComboboxStore }), document.querySelector('#combobox_store')),
    ReactDOM.createPortal(React.createElement(SuratjalanCheckbox, { storeId: state.storeSelected }), document.querySelector('#daftar_suratjalan'))
  );
}
ReactDOM.render(React.createElement(
  ContextOneProvider,
  null,
  React.createElement(InvoiceMain, null)
), document.querySelector('#root'));