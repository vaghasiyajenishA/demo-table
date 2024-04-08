import './App.css';
import { TableData } from './data'
import { useEffect, useState } from 'react';

function App() {
  const [filter, setFilter] = useState({})
  const [data, setData] = useState(TableData)
  const [headerData, setHeaderData] = useState([])
  const [FilterOptions, setFilterOptions] = useState([])

  console.log('TableDataTableDataTableData', headerData, FilterOptions, filter, data, TableData);

  useEffect(() => {
    const header = []
    const filterOptions = {}
    TableData?.forEach((TItme) => {
      for (const property in TItme) {
        if (!header?.includes(property)) {
          header.push(property)
          if (property !== 'id') {
            filterOptions[property] = [TItme[property]]
          }
        }
        if (filterOptions[property]?.length > 0 && !filterOptions[property]?.includes(TItme[property])) {
          filterOptions[property] = [...filterOptions[property], ...[TItme[property]]]
        }
      }
    })
    setHeaderData(header)
    setData(TableData)
    const FOptions = []
    let filterInitalKey = {}
    for (const [key, value] of Object.entries(filterOptions)) {
      FOptions.push({ filterKey: key, type: header[1] === key ? 'Search' : 'Switch', option: value })
      filterInitalKey = { ...filterInitalKey, [key]: [] }
    }
    setFilterOptions(FOptions)
    setFilter(filterInitalKey)
  }, [])

  const handleChange = (event, filterKey, value, type) => {
    console.log('typetypetypetypetypetype', type);
    let filterKeyData = []
    if (type === "Search") {
      filterKeyData = [event.target.value]

    } else if (event.target?.checked) {
      filterKeyData = [...filter[filterKey], ...[value]]
    } else {
      const valueArray = filter[filterKey]
      let index = valueArray.indexOf(value);
      valueArray.splice(index, 1);
      filterKeyData = valueArray

    }
    const filterData = { ...filter, [filterKey]: filterKeyData }
    const updateData = TableData?.filter((item) => {
      let array = []
      for (const property in filterData) {
        if (filterData[property].length > 0) {
          if (property === headerData[1]) {
            array.push(item[property]?.toLowerCase()?.includes(filterData[property][0]?.toLowerCase()))
          } else {
            array.push(filterData[property]?.includes(item[property]))
          }
        }
      }
      const isChecked = array?.every((i) => i)
      return isChecked && item
    })
    setData(updateData)
    setFilter(filterData)
  }
  return (
    <div className="App">

      <div class="grid-container">
        {FilterOptions?.map((i, index) => {
          return (
            <div class="grid-item" key={index}>
              {i?.type === 'Search' ?
                <input placeholder={i?.filterKey} onChange={(e) => { handleChange(e, i?.filterKey, "", i?.type) }} />
                :
                <div className='gridtext'>
                  <span className='gridHeader'>{i?.filterKey}</span>
                  <div>
                    {i?.option?.map((FO, IN) => {
                      return (
                        <div className='textName' key={IN}>
                          <input type='checkbox' onChange={(e) => { handleChange(e, i?.filterKey, FO, i?.type) }} />
                          <span>{FO}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              }
            </div>
          )
        })}
      </div>
      <table>
        <thead>
          <tr>
            {headerData?.map((headerItem) => {
              return (
                <th>{headerItem}</th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => {
            return (
              <tr>
                {headerData?.map((headerItem) => {
                  return (
                    <td>{item[headerItem]}</td>
                  )
                })}
              </tr>
            )
          })}
          {/* <tr>
            <td>John Doe</td>
            <td>30</td>
            <td>New York</td>
          </tr>
          <tr>
            <td>Jane Smith</td>
            <td>25</td>
            <td>Los Angeles</td>
          </tr>
          <tr>
            <td>Bob Johnson</td>
            <td>35</td>
            <td>Chicago</td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
}

export default App;
