import "./styles.css";
import { useEffect, useState, useRef } from "react";
import Card from "./components/card";
import SearchBar from "./components/searchbar";
import { useSelector } from "react-redux";
import {saveResult} from './store/main.action';
import { useDispatch } from "react-redux";

export default function Entry() {
  
  const [search, setSearch] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [searchResult, setSearchResult] = useState([])
  const dispatch = useDispatch()

  let data = useSelector((state)=>state.mainReducer.result);
 
  let maxPage = 3
  let currentPage = useRef(1)

  let options = {
    root: null,
    rootMargin: "0px",
    threshold: [0.0]
  };

  const apiCall = async (dataSet) => {
    try {
      const movies = await fetch(`page-${dataSet}.json`);
      const moviesJSON = await movies.json();
      return moviesJSON;
    } catch (error) {
      console.log(error);
    }
  };

  const callFunc = async (dataSet) => {
    let moviesJSON = await apiCall(dataSet);
    console.log("updated data ", moviesJSON)
    let updatedData = [...data, ...moviesJSON?.page["content-items"].content];
    currentPage.current++;
    console.log("updated data ", updatedData)
    dispatch(saveResult([...updatedData]))
  };
  
  const callupdate = (value) => {
    if (value[0].isIntersecting && currentPage.current <= maxPage) {
      callFunc(currentPage.current);
    }
  };
  
  useEffect(() => {
    if (data.length > 0) {
      let observer = new IntersectionObserver(callupdate, options);
      let target = document.querySelector(`#scroll-${data.length - 6}`);
      if(target){
        observer.observe(target);
      }
    }
  }, [data,searchResult]);

  useEffect(() => {
    callFunc(currentPage.current);
  }, []);

  const handleSearch = () => {
    if(search !== ""){
      let result = data.filter((item)=> item.name.toLowerCase() == search.toLowerCase())
      setSearchResult(result)
    }else{
      let result = []
      setSearchResult([])
    } 
  }

  const contentMaper = (content) => {
    if(content.length > 0){
      return content.map((item, index) => {
        return (
          <>
            <Card index={index} item={item} />
          </>
        );
      })
    }
  }

  return (
    <div className="App">
      {console.log("data is ", data)}
      <div className="search">
        <SearchBar 
          onSearch={handleSearch} 
          showResult={showResult} 
          setShowResult={setShowResult}
          search={search}
          setSearch={setSearch}
          showNoResult={searchResult.length == 0 ?? false}
        />
      </div>
      <div id="list-of-items">
        {searchResult.length > 0 ? contentMaper(searchResult): contentMaper(data)}
      </div>
    </div>
  );
}
