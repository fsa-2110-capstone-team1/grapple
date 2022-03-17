import React, { useState} from 'react';
import { useNavigate } from "react-router-dom";

// import SearchIcon from "@material-ui/icons/Search";

const SearchChallenges = ({data})=> {
    const [searchedData, setSearchedData] = useState([])
    const navigate = useNavigate();
    const updateList = (e) =>{
const search = e.target.value
const newSearch = data.filter((searching) =>{
    return searching.name.toLowerCase().includes(search.toLowerCase())
})
if (search === ''){
    setSearchedData([])
}
else{
setSearchedData(newSearch)
}
    }


    return (
        <div className="search">
            <div className="searchInputs"> 
            <input type='text' placeholder={'Search for Challenge'} onChange={updateList}/>
        <div className="searchIcon"></div>
    </div>
    {searchedData.length != 0 && (
        <div className="dataResult">
            {searchedData.slice(0, 15).map((challenge, key)=> {
                return (
                <a className="dataItem" onClick={() => navigate(`/challenges/${challenge.id}`)}>
                     <p>{challenge.name}</p>
                     </a>
            )})}
        </div>
    )}
        </div>
    )
}

export default SearchChallenges