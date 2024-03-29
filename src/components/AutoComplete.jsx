import { useContext, useEffect, useState } from "react";
import finnHub from "../apis/finnHub";
import { WatchListContext } from "../context/watchListContext";

export const AutoComplete = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const {addStock} = useContext(WatchListContext)

  const renderDropdown = () => {
    const dropDownClass = search ? "show" : null;
    return (
      <ul className={`dropdown-menu ${dropDownClass}`} style={{
        height:"500px",
        overflowY:"scroll",
        overflowX:"hidden",
        cursor:"pointer"
      }}>
        {results.map((result) => {
          return (
            <li onClick={() => {
              addStock(result.symbol)
              setSearch("")
            }} key={result.symbol} className="dropdown-item">{result.description} ({result.symbol})</li>
          )
        })}
      </ul>
    )
  }

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await finnHub.get("/search", {
          params: {
            q: search,
          },
        });
        console.log(response);
        if (isMounted) {
          setResults(response.data.result);
        }
      } catch (error) {}
    };
    if (search.length > 0) {
      fetchData();
    } else {
      setResults([]);
    }
    return () => (isMounted = false);
  }, [search]);


  return (
    <div className="w-50 p-5 rounded mx-auto">
      <img src="https://icdn.turkiyegazetesi.com.tr/images/22-11/11/intro-resmi-61.png" style={{width:"100%",height:"auto",marginBottom:"20px",borderRadius:"20px"}} alt=""></img>
      <div className="form-floating dropdown">
        <input
          style={{ backgroundColor: "rgba(145,158,171,0.04" }}
          id="search"
          type="text"
          className="form-control"
          placeholder="Search"
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <label htmlFor="search"> Search </label>
        {renderDropdown()}
      </div>
    </div>
  );
};
