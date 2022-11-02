function ContentLetter({nomor, quantity, price}) {
    return (
        <React.Fragment>
            <p>Nomor: {nomor}</p>
            <p>quantity: {quantity}</p>
            <p>price: {price}</p>
        </React.Fragment>
    )
}

function SjpreviewMain() {
    const { state, dispatch } = React.useContext(ContextOne)
    React.useEffect(() => {
        let params = (new URL(document.location)).searchParams;
        let id = params.get("id");
        labkodingMain().fetchOneInvoiceById(id, function(data = {}){
            // dispatch({ type: 'setSuratjalanDetail', payload: data })
            // dispatch({ type: 'setStoreSelected', payload: data.store_id })
        })
    }, [])

    return (
        <React.Fragment>
              {ReactDOM.createPortal(<ContentLetter nomor={state.suratjalanDetail.nomor_surat} quantity={state.suratjalanDetail.quantity} price={state.suratjalanDetail.price} />, document.querySelector('#subpage'))}
        </React.Fragment>
      )
}

ReactDOM.render(<ContextOneProvider><SjpreviewMain/></ContextOneProvider>, document.querySelector('#root'));