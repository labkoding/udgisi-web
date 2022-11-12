function submitKwitansi({ idInvoice }) {
  // window.location.href = "/inpreview.html?id=";
  // alert(storeId)
  let kwitansi_id = '';
  let kwitansi_number = '';
  let invoice_ids = JSON.stringify(idInvoice);
  var accessToken = labkodingMain().getAccessToken()

  const graphqlstr = `upsertTbKwitansi(request:{id: "${kwitansi_id}", nomor_kwitansi:"${kwitansi_number}",invoice_ids:${invoice_ids}}){  status,error,detail_data{id,nomor_kwitansi,created_dt,updated_dt,created_by,updated_by} }`;
  const query = JSON.stringify({query: "mutation{ " + graphqlstr + " }"})
  console.log('query=>', query)

  fetch(AppConfig.graphqlBaseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'AccessToken': accessToken,
      'hmac': labkodingMain().generateHmac(query),
    },
    body: query
  })
    .then(r => r.json())
    .then(data => {
      let error = (data.errors || []).map(r => r.message).join(', ')
      if(error) alert(error)
      else {
        if(data.data.upsertTbKwitansi.status === 200) {
          window.location.href = '/kwpreview.html?id='+data.data.upsertTbKwitansi.detail_data.id;
        }
        else alert(data.data.upsertTbKwitansi.error)
      }
    });

}

function DaftaInoviceItem ({ row, handleOnClickCheckbox, invoiceChecked }) {
  return (
    <React.Fragment>
      <div className='checkbox_wrap'>
        <div className='checkbox_left'>
          <a href={"/invoice.html?id="+row.id}>{row.label}</a>
        </div>
        <div className='checkbox_right'>
          <i className='fas fa-check' />
          <input type='checkbox' className='checkbox' checked={invoiceChecked.indexOf(row.id) !== -1} onChange={() => {}} onClick={(e) => handleOnClickCheckbox(e, row.id)} />
          <i className='fas fa-times' />
        </div>
      </div>
    </React.Fragment>
  )
}
function InvoiceCheckbox () {
  labkodingMain().restriction()
  const { state, dispatch } = React.useContext(ContextOne)
  const handleOnClickCheckbox = (e, id) => {
    if(e.target.checked) state.invoiceChecked.push(id)
    else state.invoiceChecked.splice(state.invoiceChecked.indexOf(id), 1)
    dispatch({ type: 'invoiceChecked', payload: state.invoiceChecked })
  }
  return (
    <React.Fragment>
      {state.invoiceList.map((r, i) => (<DaftaInoviceItem key={i} row={r} handleOnClickCheckbox={handleOnClickCheckbox} invoiceChecked={state.invoiceChecked} />))}
      <div className="next">
        <button onClick={() => submitKwitansi({ idInvoice: state.invoiceChecked })}>Next</button>
      </div>
    </React.Fragment>
  )
}
// ReactDOM.render(<ContextOneProvider><App /></ContextOneProvider>, document.querySelector('#daftar_suratjalan'))
