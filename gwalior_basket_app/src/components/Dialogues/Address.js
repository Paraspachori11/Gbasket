import React, {useEffect, useState} from 'react';
import {Modal,Text, View, Image, Dimensions} from 'react-native';
import Colors from "../../../assets/Colors";
import Button from '../Button';
import TextBox from '../TextBox';
import {storeData } from '../../storage/AsyncStorage';
import { postData } from '../../services/ServerServices';
import RazorpayCheckout from "react-native-razorpay";
const {width,height} = Dimensions.get("window")

export default function Address({addDialogue,setAddDialogue,phoneNumber,userId,userAddressData,setUserAddressData})
{
    const [modalVisible, setModalVisible] = useState(addDialogue);

    const [refresh,setRefresh] = useState(false)

    const [detail,setDetail] = useState(false)
    const [fetchedDataJSON,setFetchedDataJSON] = useState({})
    
    useEffect(function()
    {
      setModalVisible(addDialogue)
    },[addDialogue])

    const [userID,setUserID] = useState(userId)
    const [pNumber,setPnumber] = useState(phoneNumber)

    useEffect(function(){
        setUserID(userId)
        setPnumber(phoneNumber)
    },[userId,phoneNumber])

    const [userName,setUserName] = useState('')
    const [state,setState] = useState('')
    const [city,setCity] = useState('')
    const [zipCode,setZipCode] = useState('')
    const [Address,setAddress] = useState('')


    const [userAddressId,setUserAddressId] = useState('')
    useEffect(()=>{
        if(userAddressData.username !== 'No Record Found')
        {
        setDetail(false)
        setUserName(userAddressData.username)
        setState(userAddressData.state)
        setCity(userAddressData.city)
        // "zipcode" attribute coming from database fieldName
        if(userAddressData.zipcode)
        {
            setZipCode(userAddressData.zipcode)
        }
        // "zipCode" attribute coming from AsyncStorage JSON
        else if(userAddressData.zipCode)
        {
            setZipCode(userAddressData.zipCode)
        }
        setAddress(userAddressData.address)
        setFetchedDataJSON({'staticUserName':userAddressData.username,'staticState':userAddressData.state,'staticCity':userAddressData.city,'staticZipCode':userAddressData.zipcode ? userAddressData.zipcode : userAddressData.zipCode,'staticAddress':userAddressData.address})

        setUserAddressId(userAddressData.useraddressesid)
        }
        else
        {
            setDetail(true)
            setUserName('')
            setState('')
            setCity('')
            setZipCode('')
            setAddress('')
        }
        setRefresh(!refresh)
    },[userAddressData])

    const DetailBoxes=()=>{
        return(
            <View style={{width:width*0.96,flex:1,justifyContent:'space-between'}}>
                <TextBox icon={'cellphone-check'} value={phoneNumber} placeHolder={"Mobile Number"} editable={false}/>

                <TextBox icon={'account'} placeHolder={"User Name"} value={userName} onChangeText={(event)=>setUserName(event)}/>

                <TextBox placeHolder={"State"} value={state} onChangeText={(event)=>setState(event)}/>

                <TextBox placeHolder={"City"} value={city} onChangeText={(event)=>setCity(event)}/>

                <TextBox placeHolder={"Zip Code"} value={zipCode} onChangeText={(event)=>setZipCode(event)}/>

                <TextBox placeHolder={"Address"} multiline={true} numberOfLines={5} textAlign={'left'} textAlignVertical={'top'} value={Address} onChangeText={(event)=>setAddress(event)}/>

            </View>
        )
    }

    var notValid = false
    const entryValidation=()=>{
        if(userName !== '' && state !== '' && city !== '' && zipCode !== '' && Address !== '')
        {
            notValid = false
        }
        else
        {
            notValid = true
        }
        return notValid
    }

    function checkChangeAddress()
    {
        if( fetchedDataJSON.staticUserName !== userName || fetchedDataJSON.staticState !== state || fetchedDataJSON.staticCity !== city || fetchedDataJSON.staticZipCode !== zipCode || fetchedDataJSON.staticAddress !== Address)
        {
            return false
        }
        else
        {
            return true
        }
    }

    // *****************PAYMENT**************

    var options = {
        description: 'Credits towards consultation',
        image:  require('../../../assets/Images/logo.png'),
        currency: 'INR',
        key: 'rzp_test_GQ6XaPC6gMPNwH',
        amount: 1000,
        name: 'xyz',
        prefill: {
          email: 'void@razorpay.com',
          contact: '9191919191',
          name: 'Gwalior Basket'
        },
        theme: {color: '#009432'}
      }

    const handlePayment=()=>{
        RazorpayCheckout.open(options).then((data) => {
            // handle success
            alert(`Success: ${data.razorpay_payment_id}`);
          }).catch((error) => {
            // handle failure
            alert(`Error: ${error.code} | ${error.description}`);
          });
    }
    // ******************XXXXXXXX***************

    const handleRegister=async()=>{
        var body = {'userid':userID,'username':userName,'mobile':pNumber,'state':state,'city':city,'zipCode':zipCode,'address':Address}
        var result = await postData('userinterface/add_userAddresses',body)
        if(result.status)
        {
            if(result.message == 'UserAddress Added Successfully!!!')
            {
                body['useraddressesid'] = result.data[0].useraddressesid
            }
            await storeData(body.mobile,body)
            setAddDialogue(!addDialogue)
            setUserAddressData({})
            handlePayment()
        }
    }

    const handleUpdate=async()=>{
        var body = {'useraddressid':userAddressId,'userid':userID,'username':userName,'mobile':pNumber,'state':state,'city':city,'zipCode':zipCode,'address':Address}
        var result = await postData('userinterface/update_userAddresses',body)
        if(result.status)
        {
            await storeData(body.mobile,body)
            setAddDialogue(!addDialogue)
            setUserAddressData({})
            handlePayment()
        }
    }

    // const handleSkip=()=>{
    //     setAddDialogue(!addDialogue)
    //     handlePayment()
    // }

    return(
        <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        >
            <View style={{height:height,backgroundColor:Colors.White}}>

                <View style={{flexDirection:'row',alignItems:'center',elevation:5,height:height*0.07,backgroundColor:Colors.White,paddingLeft:5}}>
                    <Text style={{fontSize:22,fontWeight:'bold',color:'#008080'}}>Gwalior</Text>
                    <Text style={{fontSize:22,fontWeight:'bold',color:'#fdbb2d'}}>Basket</Text>
                    <Image style={{resizeMode: 'contain', width: 35,height: 35}} source={require('../../../assets/Images/logo.png')} />
                </View>

                <View style={{justifyContent:'center',height:height*0.05}}>
                    <Text style={{color:Colors.pureBlack,fontWeight:'bold',paddingLeft:5}}>Delivery to ADDRESS</Text>
                </View>

                <View style={{alignItems:'center',flex:1}}>
                    {DetailBoxes()}
                </View>

                <View style={{alignItems:'center',justifyContent:'center',height:height*0.12}}>
                    {detail ?
                    <Button width={width*0.96} height={height*0.07} bgColor={entryValidation() ? Colors.darkGrey : Colors.darkGreen} txtColor={Colors.White} title={"Register"} borderRadius={5} disableButton={entryValidation()} onPress={()=>handleRegister()}/>
                    :
                    <View style={{flexDirection:'row',width:width*0.96,justifyContent:'space-between'}}>
                        <Button width={width*0.46} height={height*0.07} bgColor={checkChangeAddress() ? Colors.darkGrey : Colors.darkGreen} txtColor={Colors.White} title={"Change Delivery Address"} borderRadius={5} disableButton={checkChangeAddress()} onPress={()=>handleUpdate()}/>
                        <Button width={width*0.46} height={height*0.07} bgColor={Colors.darkGreen} txtColor={Colors.White} title={"Deliver on Existing Address"} borderRadius={5} onPress={()=>handleUpdate()}/>
                    </View>
                    }
                </View>
            </View>
        </Modal>
    )
}