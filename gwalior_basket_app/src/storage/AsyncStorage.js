import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData=async(Key,body)=>{
    try{
        await AsyncStorage.setItem(Key,JSON.stringify(body))
    }
    catch(e)
    {
        console.log("Error in" + Key,e)
    }
}

export const getKey = async()=>{
    try{
        var keys = await AsyncStorage.getAllKeys()
        // console.log("keys:",keys)
        return keys[0]
    }
    catch(e)
    {
        // console.log("Error in" + Keys,e)
        return null
    }
}

export const getStoreData=async(Key)=>{
    try{
        var response = await AsyncStorage.getItem(Key)
        return (JSON.parse(response))
    }
    catch(e)
    {
        console.log("Error in" + Key,e)
    }
}
