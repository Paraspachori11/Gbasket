import axios from "axios"
// const ServerUrl = "http://localhost/5000"
const ServerURL = "http://192.168.58.155:5000"

const getData = async(url)=>{
    try{
        var response = await axios.get(`${ServerURL}/${url}`)
        var result = await response.data
        return result
    }
    catch(e)
    {
        return null
    }
}

const postData = async(url,body)=>{
    try{
        var response = await axios.post(`${ServerURL}/${url}`,body)
        var result = await response.data
        return result
    }
    catch(e)
    {
        return null
    }
}

// export default {getData,postData,ServerUrl}

export {ServerURL,getData,postData}