import { useState,useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom";
import finnHub from "../apis/finnHub";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs"
import { WatchListContext } from "../context/watchListContext";

export const StockList = () => {
    const [stock,setStock] = useState([]);
    const {watchList,deleteStock} = useContext(WatchListContext);
    const navigate = useNavigate();

   const renderIcon = (data) => {
    return data < 0? <BsFillCaretDownFill/> : <BsFillCaretUpFill/>;
   }

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
        try {
            const response = await Promise.all(watchList.map((stock) => {
                return finnHub.get("/quote", {
                    params : {
                        symbol: stock
                    }
                })
            }))
            const data = response.map((response) => {
                return {
                    data:response.data,
                    symbol:response.config.params.symbol
                }
            })
            console.log(data)
            if(isMounted){
                setStock(data)     
            }     
        }catch(err){

        }
      }
      fetchData()
      return () => (isMounted = false)
    })


    const handleStockSelect = (symbol) => {
        navigate(`detail/${symbol}`)
      }
   
    return (
        <div>
           <table className="table hover mt-5">
                <thead style={{color:"white"}}>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Last</th>
                        <th scope="col">Chg</th>
                        <th scope="col">Chg%</th>
                        <th scope="col">High</th>
                        <th scope="col">Low</th>
                        <th scope="col">Open</th>
                        <th scope="col">Pclose</th>
                    </tr>
                </thead>
                <tbody>
                   {stock.map((stockData) => {
                    return (
                         <tr style={{ cursor: "pointer" }} onClick={() => handleStockSelect(stockData.symbol)} className="table-row" key={stockData.symbol}>
                            <th scope="row"> {stockData.symbol}</th>
                            <td> {stockData.data.c} </td>
                            <td className={(stockData.data.d < 0)?"text-danger" : "text-success"}> {stockData.data.d} </td>
                            <td className={(stockData.data.dp < 0)? "text-danger" : "text-success"}> {stockData.data.dp} {renderIcon(stockData.data.dp)} </td>
                            <td> {stockData.data.h} </td>
                            <td> {stockData.data.l} </td>
                            <td> {stockData.data.o} </td>
                            <td> {stockData.data.pc} <button className="btn btn-danger btn-sm ml-3 d-inline-block delete-button" onClick={(e) => {
                                e.stopPropagation();
                                deleteStock(stockData.symbol)
                            }}> Remove</button></td>
                        </tr>
                    )
                   })}
                </tbody>
            </table>
        </div>
    )
}
