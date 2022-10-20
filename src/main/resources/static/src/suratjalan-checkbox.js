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
function SuratjalanCheckbox () {
  labkodingMain().restriction()
  const { state, dispatch } = React.useContext(ContextOne)
  const storeId = ''
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
          <button>Next</button>
      </div>
    </React.Fragment>
  )
}
// ReactDOM.render(<ContextOneProvider><App /></ContextOneProvider>, document.querySelector('#daftar_suratjalan'))
