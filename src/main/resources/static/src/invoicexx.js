
const ContextOne = React.createContext()
const initialState = {
  offset: 0,
  version: 0,
  songs: [],
  favorites: [],
  suratJalanList: [],
  storeList: [],
  searchString: ''
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'loadData':
      return { ...state, ...action.payload, version: state.version + 1 }
    case 'setSearchString':
      return { ...state, searchString: action.payload, version: state.version + 1 }
    case 'setSuratjalanList':
      return { ...state, suratJalanList: action.payload, version: state.version + 1 }
    case 'setStoreList':
      return { ...state, storeList: action.payload, version: state.version + 1 }
    case 'setOffset':
      return { ...state, offset: action.payload }
    case 'setSongs':
      return { ...state, songs: action.payload, version: state.version + 1 }
    case 'addToFavorites':
      var result = [...state.favorites, ...action.payload]
      return { ...state, favorites: result, version: state.version + 1 }
    case 'removeFromFavorites':
      return { ...state, favorites: action.payload, version: state.version + 1 }
  }
}

function ContextOneProvider (props) {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  let value = { state, dispatch }
  React.useEffect(() => {
    if (state.version > 0) {
      const jsonValue = JSON.stringify(state)
      localStorage.setItem('DATABASE', jsonValue)
    }
  }, [state.version])
  React.useEffect(() => {
    value = localStorage.getItem('DATABASE')
    // .then((value) => {
    const jsonValue = value != null ? JSON.parse(value) : initialState
    dispatch({ type: 'loadData', payload: jsonValue })
    // });
  }, [])
  return (
    <ContextOne.Provider value={value}>{props.children}</ContextOne.Provider>
  )
}
const ContextOneConsumer = ContextOne.Consumer

function fetchAllSuratjalanByStoreId (cb, storeId) {
  // let { state, dispatch } = React.useContext(ContextOne);

  var accessToken = labkodingMain().getAccessToken()
  // let store = document.getElementById('store').value;
  console.log('storeIdstoreId=>', storeId)
  const graphqlstr = `getAllTbSuratjalan(request:{page_index: 0, page_size: 1000, filter:{store_id:"${storeId}"}}){status,error,list_data{id,nomor_surat,store_id,quantity,price,created_dt,updated_dt,created_by,updated_by,version},count,page_count}`
  const query = JSON.stringify({ query: '{ ' + graphqlstr + ' }' })
  fetch(AppConfig.graphqlBaseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      AccessToken: accessToken,
      hmac: labkodingMain().generateHmac(query)
    },
    body: query
  })
    .then(r => r.json())
    .then(data => {
      const listOptions = data.data.getAllTbSuratjalan.list_data.map(r => {
        return { id: r.id, label: r.nomor_surat }
      })
      cb(listOptions)
      // dispatch({type: 'setSuratjalanList', payload: listOptions})
    })
}
function onChangeStore (value, cb) {
  fetchAllSuratjalanByStoreId(function (listData) {

  }, value)
}
// component
function DaftarSuratJalanItem ({ row }) {
  return (
    <React.Fragment>
      <div class='checkbox_wrap'>
        <div class='checkbox_left'>
          {row.label}
        </div>
        <div class='checkbox_right'>
          <i class='fas fa-check' />
          <input type='checkbox' class='checkbox' />
          <i class='fas fa-times' />
        </div>
      </div>
    </React.Fragment>
  )
}
// component
function DaftarSuratJalan () {
  const { state, dispatch } = React.useContext(ContextOne)
  labkodingMain().restriction()
  console.log('satuuu=>', state.version)
  const [listSuratjalan, setListSuratjalan] = React.useState(state.suratJalanList)
  React.useEffect(() => {
    // setInterval(function () {
    //     let store = document.getElementById('store').value;
    //     console.log('store====>', store)
    // }, 1000);
    // fetchAllSuratjalanByStoreId(function(listData){
    //     setListSuratjalan(listData)
    // })
  }, [])
  return (
    <React.Fragment>
      <p>
        <span>{state.version}</span>
        <br />
        {/* {state.suratJalanList.map((r, i) => (<DaftarSuratJalanItem key={i} row={r} />))} */}
      </p>
    </React.Fragment>
  )
}
function fetchAllStore (cb) {
  const { state, dispatch } = React.useContext(ContextOne)
  var accessToken = labkodingMain().getAccessToken()
  const graphqlstr = 'getAllTbStore(request:{page_index: 0, page_size: 1000}){status,error,list_data{id,store_name,created_dt,updated_dt,created_by,updated_by,version},count,page_count}'
  const query = JSON.stringify({ query: '{ ' + graphqlstr + ' }' })
  // fetch(AppConfig.graphqlBaseUrl, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Accept: 'application/json',
  //     AccessToken: accessToken,
  //     hmac: labkodingMain().generateHmac(query)
  //   },
  //   body: query
  // }).then(r => r.json())
  //   .then(data => {
  //     const listOptions = data.data.getAllTbStore.list_data.map(r => {
  //       return { id: r.id, label: r.store_name }
  //     })
  //     cb(listOptions)
  //   })
}
// component
function StoreOptions () {
  labkodingMain().restriction()
  const { state, dispatch } = React.useContext(ContextOne)
  // let { currentStore, setCurrentStore} = React.useState('');
  React.useEffect(() => {
    fetchAllStore(function(listData) {
      console.log('listData=>', listData)
  //     dispatch({ type: 'setStoreList', payload: listData })
    })
  //   // setCurrentStore(listData[0].id)
  }, [])
  // React.useEffect(() => {
  //   console.log('currentStore=>', currentStore)
  // }, [currentStore]);
  const handleOnChangeComboboxStore = (e) => {
    console.log('handleOnChangeComboboxStore')
    fetchAllSuratjalanByStoreId(function (listData) {
      console.log('listData=>', listData)
      dispatch({ type: 'setSuratjalanList', payload: listData })
    }, e.target.value)
  }
  return (
    <React.Fragment>
      <select name='store' id='store' onChange={handleOnChangeComboboxStore}>
        {state.storeList.map((r, i) => (<option key={i} value={r.id}>{r.label}</option>))}
      </select>
    </React.Fragment>
  )
}

// ReactDOM.render(<ContextOneProvider><DaftarSuratJalan /></ContextOneProvider>, document.querySelector('#daftar_suratjalan'))
ReactDOM.render(<ContextOneProvider><StoreOptions /></ContextOneProvider>, document.querySelector('#combobox_store'))
