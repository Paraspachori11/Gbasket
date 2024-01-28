import { View,Dimensions } from "react-native";
import Button from "../../Button";
import Colors from "../../../../assets/Colors";
import PhoneNumber from "../../Dialogues/PhoneNumber";
import { useEffect, useState } from "react";
import Otp from "../../Dialogues/Otp";
import Address from "../../Dialogues/Address";
import { getKey, getStoreData } from "../../../storage/AsyncStorage";
const {width,height} = Dimensions.get('window')

export default function MakePayment({cartDataKeys})
{
    const [dialogue,setDialogue] = useState(false)

    const [phoneNumber,setPhoneNumber] = useState('')
    const [otpDialogue,setOtpDialogue] = useState(false)
    const [userId,setUserId] = useState('')
    const [userAddressData,setUserAddressData] = useState({})

    const [addDialogue,setAddDialogue] = useState(false)

    const get_Number_from_Async=async()=>{
        var thekey = await getKey()
        // console.log(thekey)
        // console.log(typeof(thekey))
        if(thekey == undefined)
        {
            thekey = ''
        }
        return thekey
    }
    const handleDialog =async()=>{
        var numberKey = ''
        numberKey = await get_Number_from_Async()
        if(numberKey !== '')
        {
            setPhoneNumber(numberKey)
            var userData = await getStoreData(numberKey)
            setUserId(userData.userid)
            setUserAddressData(userData)
            setAddDialogue(!addDialogue)
        }
        else
        {
        setDialogue(true)
        }
    }

    return(
        <View>
            <View style={{height:height*0.09,justifyContent:'center'}}>
                <Button onPress={()=>handleDialog()} title={"Make Payment"} width={width*0.96} height={height*0.07} txtColor={Colors.White} bgColor={cartDataKeys === 0 ? Colors.darkGrey : Colors.darkGreen} disableButton={cartDataKeys === 0 ? true : false}/>
            </View>

{/* Dialogues */}
            <View>
                <PhoneNumber dialogue={dialogue} setDialogue={setDialogue} setPhoneNumber={setPhoneNumber} otpDialogue={otpDialogue} setOtpDialogue={setOtpDialogue}/>
            </View>

            <View>
                <Otp otpDialogue={otpDialogue} setOtpDialogue={setOtpDialogue} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} addDialogue={addDialogue} setAddDialogue={setAddDialogue} setUserId={setUserId} setUserAddressData={setUserAddressData}/>
            </View>

            <View>
                <Address addDialogue={addDialogue} setAddDialogue={setAddDialogue} phoneNumber={phoneNumber} userId={userId} userAddressData={userAddressData} setUserAddressData={setUserAddressData}/>
            </View>
        </View>
    )
}