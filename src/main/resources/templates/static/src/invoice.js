function InvoiceMain() {
  const { state, dispatch } = React.useContext(ContextOne)

  // const currentStoreId = state.storeSelected
  // const currentSelectedSuratjalan

  const handleOnChangeComboboxStore = (value) => {
    dispatch({ type: 'setStoreSelected', payload: value })
    labkodingMain().fetchAllSuratjalanByStoreId(function (listData) {
      dispatch({ type: 'setSuratjalanList', payload: listData })
      dispatch({ type: 'suratJalanChecked', payload: [] })
    }, value)
  }
    return (
      <React.Fragment>
            {ReactDOM.createPortal(<StoreCombobox handleOnChange={handleOnChangeComboboxStore} />, document.querySelector('#combobox_store'))}
            {ReactDOM.createPortal(<SuratjalanCheckbox storeId={state.storeSelected} />, document.querySelector('#daftar_suratjalan'))}
      </React.Fragment>
    )
}
ReactDOM.render(<ContextOneProvider><InvoiceMain /></ContextOneProvider>, document.querySelector('#root'));
