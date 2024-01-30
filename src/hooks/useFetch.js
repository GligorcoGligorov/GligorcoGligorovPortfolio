
import { useState, useEffect } from "react";

import db_data from "../data/db";

const useFetch = (url) => {

    const takeDataFor = url.split("http://localhost:8000/")[1];

    let returnData = db_data[takeDataFor];
    let takeDataForProject = 0;

    if (takeDataFor.includes("projects/")) {
        takeDataForProject = parseInt(takeDataFor.split("projects/")[1])-1;
        returnData = db_data["projects"][takeDataForProject];
    }

    return {data: returnData, isPending: false, error: false}

    // const [data,setData] = useState(null)
    // const [isPending, setIsPending] = useState(true)
    // const [error, setError] = useState(null)


    // useEffect(() =>{

    //     const abortCont = new AbortController();

    //     fetch(url, {signal: abortCont.signal})
    //     .then(res => {
    //         if(!res.ok){
    //             throw Error("Could not fetch the data for that resourse")
    //         }
    //         return res.json()
    //     })
    //     .then(data => {
    //         setData(data)
    //         setIsPending(false)
    //         setError(null)
    //     })
    //     .catch((err) => {
    //         if(err.name === 'AbortError'){
    //             console.log("fetch aborted")
    //         }else{
    //             setIsPending(false)
    //             setError(err.message)
    //         }

            
    //     })

    //     return () => abortCont.abort()

    // }, [url])

    // return { data, isPending, error}
}

export default useFetch;