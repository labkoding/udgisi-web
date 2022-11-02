function submitInvoice({ idSuratjalan, storeId }) {
  // window.location.href = "/inpreview.html?id=";
  // alert(storeId)
  let invoice_id = '';
  let invoice_number = '';
  let suratjalan_ids = JSON.stringify(idSuratjalan);
  var accessToken = labkodingMain().getAccessToken()

  const graphqlstr = `upsertTbInvoice(request:{id: "${invoice_id}", nomor_invoice:"${invoice_number}",store_id:"${storeId}",suratjalan_ids:${suratjalan_ids}}){  status,error,detail_data{id,nomor_invoice,store_id,version,created_dt,updated_dt,created_by,updated_by} }`;
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
        if(data.data.upsertTbInvoice.status === 200) {
          window.location.href = '/inpreview.html?id='+data.data.upsertTbInvoice.detail_data.id;
        }
        else alert(data.data.upsertTbInvoice.error)
      }
    });

}

function DaftarSuratJalanItem ({ row, handleOnClickCheckbox, suratJalanChecked }) {
  // console.log('DaftarSuratJalanItem invoked ', suratJalanChecked)
  return (
    <React.Fragment>
      <div className='checkbox_wrap'>
        <div className='checkbox_left'>
          <a href={"/suratjalan.html?id="+row.id}>{row.label}</a>
        </div>
        <div className='checkbox_right'>
          <i className='fas fa-check' />
          <input type='checkbox' className='checkbox' checked={suratJalanChecked.indexOf(row.id) !== -1} onChange={() => {}} onClick={(e) => handleOnClickCheckbox(e, row.id)} />
          <i className='fas fa-times' />
        </div>
      </div>
    </React.Fragment>
  )
}
function SuratjalanCheckbox ({ storeId }) {
  labkodingMain().restriction()
  const { state, dispatch } = React.useContext(ContextOne)
  React.useEffect(() => {
    // labkodingMain().fetchAllSuratjalanByStoreId(function (listData) {
    //   dispatch({ type: 'setSuratjalanList', payload: listData })
    // }, storeId)
  }, [])
  const handleOnClickCheckbox = (e, id) => {
    // console.log("Clicked, new value = ",  e.target.checked);
    if(e.target.checked) state.suratJalanChecked.push(id)
    else state.suratJalanChecked.splice(state.suratJalanChecked.indexOf(id), 1)
    dispatch({ type: 'suratJalanChecked', payload: state.suratJalanChecked })
  }
  return (
    <React.Fragment>
      {state.suratJalanList.map((r, i) => (<DaftarSuratJalanItem key={i} row={r} handleOnClickCheckbox={handleOnClickCheckbox} suratJalanChecked={state.suratJalanChecked} />))}
      <div className="next">
        <button onClick={() => submitInvoice({ idSuratjalan: state.suratJalanChecked, storeId: storeId })}>Next</button>
      </div>
    </React.Fragment>
  )
}
// ReactDOM.render(<ContextOneProvider><App /></ContextOneProvider>, document.querySelector('#daftar_suratjalan'))
