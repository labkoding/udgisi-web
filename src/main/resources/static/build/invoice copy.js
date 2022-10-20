function App() {
  labkodingMain().restriction();

  var _React$useContext = React.useContext(ContextOne),
      state = _React$useContext.state,
      dispatch = _React$useContext.dispatch;

  React.useEffect(function () {
    labkodingMain().fetchAllStore(function (listData) {
      dispatch({ type: 'setStoreList', payload: listData });
    });
  }, []);
  var handleOnChangeComboboxStore = function handleOnChangeComboboxStore() {
    // fetch surat jalan by store id
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
ReactDOM.render(React.createElement(
  ContextOneProvider,
  null,
  React.createElement(App, null)
), document.querySelector('#combobox_store'));