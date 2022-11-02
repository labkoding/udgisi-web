function StoreCombobox(_ref) {
  var currentId = _ref.currentId,
      handleOnChange = _ref.handleOnChange;

  labkodingMain().restriction();

  var _React$useContext = React.useContext(ContextOne),
      state = _React$useContext.state,
      dispatch = _React$useContext.dispatch;

  React.useEffect(function () {
    labkodingMain().fetchAllStore(function (listData) {
      dispatch({ type: 'setStoreList', payload: listData });
      var storeId = listData[0].id;
      handleOnChange(storeId);
    });
  }, []);
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      'select',
      { name: 'store', id: 'store', onChange: function onChange(e) {
          return handleOnChange(e.target.value);
        }, value: currentId },
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