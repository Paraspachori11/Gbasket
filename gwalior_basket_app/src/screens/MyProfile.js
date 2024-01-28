import { Text, View,Image,Dimensions,ScrollView } from "react-native";
import TextBox from "../components/TextBox";
import Colors from "../../assets/Colors";
import { getKey, getStoreData, storeData } from "../storage/AsyncStorage";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { postData } from "../services/ServerServices";
import { useNavigation } from "@react-navigation/native";
const {width,height} = Dimensions.get('window')

export default function MyProfile()
{
    const [refresh,setRefresh] = useState(false)
    const [phoneNumber,setPhoneNumber] = useState('')
    const [fetchedDataJSON,setFetchedDataJSON] = useState({})
    // {"address": "36-A, New Shanti Nagar , Nai Sadak , lashkar", "city": "Gwalior", "mobile": "7649833608", "state": "Madhya Pradesh", "useraddressid": 3, "userid": 12, "username": "Paras Pachori", "zipCode": "474001"}
    
    useEffect( async function()
    {
        setPhoneNumber(await getKey())
        setFetchedDataJSON(await getStoreData(await getKey()))
    },[])

    useEffect(function(){
        setUserName(fetchedDataJSON.username)
        setState(fetchedDataJSON.state)
        setCity(fetchedDataJSON.city)
        setZipCode(fetchedDataJSON.zipCode)
        setAddress(fetchedDataJSON.address)
    },[fetchedDataJSON])

    const [userName,setUserName] = useState('')
    const [state,setState] = useState('')
    const [city,setCity] = useState('')
    const [zipCode,setZipCode] = useState('')
    const [Address,setAddress] = useState('')

    const DetailBoxes=()=>{
        return(
            <View style={{width:width*0.96,height:height*0.75,justifyContent:'space-between'}}>
                
                <View>
                    <Text style={{fontWeight:'bold',color:Colors.Black}}>Mobile Number</Text>
                    <TextBox icon={'cellphone-check'} value={phoneNumber} placeHolder={"Mobile Number"} editable={false} borderRadius={10}/>
                </View>

                <View>
                    <Text style={{fontWeight:'bold',color:Colors.Black}}>User Name</Text>
                    <TextBox icon={'account'} placeHolder={"User Name"} value={userName} onChangeText={(event)=>setUserName(event)} borderRadius={10}/>
                </View>

                <View>
                    <Text style={{fontWeight:'bold',color:Colors.Black}}>State</Text>
                    <TextBox placeHolder={"State"} value={state} onChangeText={(event)=>setState(event)} borderRadius={10}/>
                </View>

                <View>
                    <Text style={{fontWeight:'bold',color:Colors.Black}}>City</Text>
                    <TextBox placeHolder={"City"} value={city} onChangeText={(event)=>setCity(event)} borderRadius={10}/>
                </View>

                <View>
                    <Text style={{fontWeight:'bold',color:Colors.Black}}>Zip Code</Text>
                    <TextBox placeHolder={"Zip Code"} value={zipCode} onChangeText={(event)=>setZipCode(event)} borderRadius={10}/>
                </View>

                <View>
                    <Text style={{fontWeight:'bold',color:Colors.Black}}>Address</Text>
                    <TextBox placeHolder={"Address"} multiline={true} numberOfLines={5} textAlign={'left'} textAlignVertical={'top'} value={Address} onChangeText={(event)=>setAddress(event)} borderRadius={10}/>
                </View>

            </View>
        )
    }

    var notValid = false
    const entryValidation=()=>{
        if(userName !== '' && state !== '' && city !== '' && zipCode !== '' && Address !== '')
        {
            notValid = false
        }
        if( fetchedDataJSON.username !== userName || fetchedDataJSON.state !== state || fetchedDataJSON.city !== city || fetchedDataJSON.zipCode !== zipCode || fetchedDataJSON.address !== Address)
        {
            notValid = false
        }
        else
        {
            notValid = true
        }
        return notValid
    }

    var navigater = useNavigation()

    const handleEdit=async()=>{
        var body = {'useraddressid':fetchedDataJSON.useraddressid,'userid':fetchedDataJSON.userid,'username':userName,'mobile':phoneNumber,'state':state,'city':city,'zipCode':zipCode,'address':Address}
        var result = await postData('userinterface/update_userAddresses',body)
        if(result.status)
        {
            await storeData(body.mobile,body)
            navigater.navigate('Home')
        }
    }

    return(
        <ScrollView style={{backgroundColor:Colors.White,height:height}}>
            <View>
                <Text style={{color:Colors.Black,fontSize:25,fontWeight:'bold'}}>My Profile</Text>
            </View>
            <View style={{alignItems:'center'}}>
                <Image style={{marginBottom:5,resizeMode:'contain',width:100,height:100}} source={require('../../assets/Images/user.png')} />
            </View>
            <View style={{alignItems:'center'}}>
                {DetailBoxes()}
            </View>
            <View style={{height:height*0.1,justifyContent:'center',alignItems:'center'}}>
                <Button width={width*0.96} height={height*0.07} bgColor={entryValidation() ? Colors.darkGrey : Colors.darkGreen} txtColor={Colors.White} title={"Edit Profile"} borderRadius={5} disableButton={entryValidation()} onPress={()=>handleEdit()}/>
            </View>
        </ScrollView>
    )
}