import React,{useState,useEffect} from 'react'

function Search({Data, setFilteredData}) {
  
  const [searchInput, setsearchInput] = useState("")
  const filterMovies = (e) => {
    if (e.target.value.length >= 2) {
      Data.forEach(movie => {
        if (movie.name.toLowerCase().includes(e.target.value.toLowerCase())) {
          setFilteredData(oldArray => [...oldArray,movie] );

        }
      })
    }
  }

  useEffect(() => {
    if (searchInput.length === 0) {
      setFilteredData([])
    }
  },[searchInput])
  return (
    <section className='layout-row justify-content-center mb-40'>
      <input 
        type='text'
        value={searchInput}
        placeholder='Search for movie by name' 
        className='w-75 py-2'
        data-testid='search'
        onChange={(e) => {
          setsearchInput(e.target.value)
          filterMovies(e)
        }}
      />
    </section>
  )
}

export default Search
//**TODO CALLING WAY There should be Two states in parent where you want to implement searching * /
{/* 
   const [Data, setData] = useState([])
  const [FilteredData, setFilteredData] = useState([])

  <Search Data={Data} setFilteredData={setFilteredData} />
          <Movieslist Data={FilteredData.length!==0?FilteredData:Data}  /> 
          {FilteredData.length===0 && <div data-testid='noResult'>
            <h3 className='text-center'>No Results Found</h3>
          </div>}
*/}