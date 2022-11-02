function submitSuratjalan() {
    let suratjalan_quantity = document.getElementById('suratjalan_quantity').value;
    console.log('suratjalan_quantity:', suratjalan_quantity);
    let suratjalan_price = document.getElementById('suratjalan_price').value;
    console.log('suratjalan_price:', suratjalan_price);
    let store = document.getElementById('store').value;
    console.log('store:', store);
    let suratjalan_id = document.getElementById('suratjalan_id').value;
    console.log('suratjalan_id:', suratjalan_id);
    let suratjalan_number = document.getElementById('suratjalan_number').value;
    console.log('suratjalan_number:', suratjalan_number);
    var accessToken = labkodingMain().getAccessToken()

    if(!suratjalan_number){
      suratjalan_number = new Date().getTime()
    }
    
    const graphqlstr = `upsertTbSuratjalan(request:{id: "${suratjalan_id}", nomor_surat:"${suratjalan_number}",store_id:"${store}",quantity:${suratjalan_quantity},price:"${suratjalan_price}"}){  status,error,detail_data{id,nomor_surat,store_id,quantity,price,created_dt,updated_dt,created_by,updated_by,version} }`;
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
            if(data.data.upsertTbSuratjalan.status === 200) {
              window.location.href = '/sjpreview.html?id='+data.data.upsertTbSuratjalan.detail_data.id;
            }
            else alert(data.data.upsertTbSuratjalan.error)
          }
        });
}

function SuratjalanMain() {
  const { state, dispatch } = React.useContext(ContextOne)
  // init data
  // get detail surat jalan
  React.useEffect(() => {
    let params = (new URL(document.location)).searchParams;
    let id = params.get("id");
    labkodingMain().fetchOneSuratjalanById(id, function(data = {}){
      dispatch({ type: 'setSuratjalanDetail', payload: data })
      dispatch({ type: 'setStoreSelected', payload: data.store_id })
      // set value input text
      // const val = data || {}
      document.getElementById('suratjalan_quantity').value = data.quantity || ''
      document.getElementById('suratjalan_price').value = data.price || ''
      document.getElementById('suratjalan_id').value = data.id || ''
      document.getElementById('suratjalan_number').value = data.nomor_surat || ''
    })
  }, [])
  const handleOnChangeComboboxStore = (value) => {
    dispatch({ type: 'setStoreSelected', payload: value })
  }
  return (
      <ContextOneProvider>
          {ReactDOM.createPortal(<StoreCombobox currentId={state.storeSelected} handleOnChange={handleOnChangeComboboxStore} />, document.querySelector('#combobox_store'))}
          {/* {ReactDOM.createPortal(<StoreList currentId={(state.suratjalanDetail || {}).store_id} />, document.querySelector('#combobox_store'))} */}
          {/* {ReactDOM.createPortal(<InvoiceSuratJalan />, document.querySelector('#daftar_suratjalan'))} */}
      </ContextOneProvider>    
  )
}

ReactDOM.render(<ContextOneProvider><SuratjalanMain/></ContextOneProvider>, document.querySelector('#root'));
// ReactDOM.render(<App/>, document.querySelector('#suratjalan_content'));