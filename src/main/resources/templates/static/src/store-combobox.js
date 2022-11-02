function StoreCombobox ({ currentId, handleOnChange }) {
    labkodingMain().restriction()
    const { state, dispatch } = React.useContext(ContextOne)
    React.useEffect(() => {
      labkodingMain().fetchAllStore(function (listData) {
        dispatch({ type: 'setStoreList', payload: listData })
        const storeId = listData[0].id
        handleOnChange(storeId)
      })
    }, [])
    return (
      <React.Fragment>
        <select name='store' id='store' onChange={e => handleOnChange(e.target.value)} value={currentId}>
          {state.storeList.map((r, i) => (<option key={i} value={r.id}>{r.label}</option>))}
        </select>
      </React.Fragment>
    )
  }