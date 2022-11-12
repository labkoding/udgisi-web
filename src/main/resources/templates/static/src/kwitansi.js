function KwitansiMain() {
  const { state, dispatch } = React.useContext(ContextOne)

  // const currentStoreId = state.storeSelected
  // const currentSelectedSuratjalan

  const fetchAllInvoice = () => {
    labkodingMain().fetchAllInvoice(function (listData) {
      dispatch({ type: 'setInvoiceList', payload: listData })
      dispatch({ type: 'invoiceChecked', payload: [] })
    })
  }
  React.useEffect(() => {
    fetchAllInvoice()
  }, [])
    return (
      <React.Fragment>
            {ReactDOM.createPortal(<InvoiceCheckbox />, document.querySelector('#daftar_invoice'))}
      </React.Fragment>
    )
}
ReactDOM.render(<ContextOneProvider><KwitansiMain /></ContextOneProvider>, document.querySelector('#root'));
