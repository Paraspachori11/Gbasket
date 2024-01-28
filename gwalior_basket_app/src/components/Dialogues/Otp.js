import React, {useEffect, useState,useRef} from 'react';
import {Modal,Text, View, Image, Dimensions, TouchableOpacity, TextInput} from 'react-native';
import Colors from "../../../assets/Colors";
import EntypoIcon from "react-native-vector-icons/Entypo"
import Button from '../Button';
import { postData } from '../../services/ServerServices';
const {width,height} = Dimensions.get("window")

export default function Otp({otpDialogue,setOtpDialogue,phoneNumber,setPhoneNumber,addDialogue,setAddDialogue,setUserId,setUserAddressData})
{
    const [modalVisible, setModalVisible] = useState(otpDialogue);

    useEffect(function()
    {
        if(otpDialogue)
        {
            generateOtp()
        }
      setModalVisible(otpDialogue)
    },[otpDialogue])

    const [otpValue,setOtpValue] = useState('')
    function generateOtp()
    {
        var OTP = parseInt(Math.random()*8999)+1000
        console.log(OTP)
        setOtpValue(OTP)
    }

    const [msg,setMsg] = useState('')

    const handleVerify=()=>{
        if(mainValue == otpValue)
        {
            setTimeout(() => {
                setMsg("Otp Verified sucessfully")
                const check_Add_Registration =async()=>{
                    var body = {'mobilenumber' : phoneNumber}
                    var result = await postData('userinterface/check_add_registration',body)
                    // console.log(result)
                    setUserId(result.data[0].userid)

                    var resultMsg = result.message
                    if(resultMsg == 'Already Registered')
                    {
                        const fetch_userAddresses_data = async()=>{
                            var result_of_useraddresses = await postData('userinterface/fetch_useraddresses_data',body)
                            
                            var userNameStatus = result_of_useraddresses.data[0].username
                            // console.log(result_of_useraddresses.data)

                            if(userNameStatus !=='No Record Found')
                            {
                                setUserAddressData(result_of_useraddresses.data[0])
                            }
                            else if(userNameStatus === 'No Record Found')
                            {
                                setUserAddressData(result_of_useraddresses.data[0])
                            }
                        }
                        fetch_userAddresses_data()
                    }
                    else if(resultMsg == "User Registered Succesfully")
                    {
                        setUserAddressData({"username": "No Record Found"})
                    }
                }
                check_Add_Registration()
            }, 750);
            setTimeout(()=>{
                setOtpDialogue(!otpDialogue)
                setMsg('')
                setAddDialogue(!addDialogue)
            },2000)
        }
        else
        {
            setTimeout(() => {
                setMsg("Incorrect Otp")
            }, 750);
            setTimeout(()=>{
                handleClose()
                setMsg('')
            },2000)
        }
    }

    const handleClose=()=>{
        setOtpDialogue(!otpDialogue)
        setPhoneNumber('')
    }

    const box1Ref = useRef(null);
    const box2Ref = useRef(null);
    const box3Ref = useRef(null);
    const box4Ref = useRef(null);

    const [value1,setValue1] = useState('')
    const [value2,setValue2] = useState('')
    const [value3,setValue3] = useState('')
    const [value4,setValue4] = useState('')
    
    const [mainValue,setMainValue] = useState('')

    useEffect(function()
    {
        setMainValue((value1)+(value2)+(value3)+(value4))
    },[value1,value2,value3,value4])

    // console.log(mainValue)
    var button = true

        if(/^[0-9]{4}$/.test(mainValue))
        {
            button = false
        }
        else
        {
            button = true
        }

    const otpBoxes =()=>{
        return (
            <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>

                <TextInput ref={box1Ref} maxLength={1} keyboardType='numeric' style={{borderWidth:1.5,borderColor:Colors.darkGreen,color:Colors.pureBlack,width:width*0.135,height:height*0.07,borderRadius:5,textAlign:'center'}} onChangeText={(value)=>{if(value.length === 1){box2Ref.current.focus();setValue1(value)}}}/>

                <TextInput ref={box2Ref} maxLength={1} keyboardType='numeric' style={{borderWidth:1.5,borderColor:Colors.darkGreen,color:Colors.pureBlack,width:width*0.135,height:height*0.07,borderRadius:5,textAlign:'center'}} onChangeText={(value)=>{if(value.length === 1){box3Ref.current.focus();setValue2(value)}}}/>

                <TextInput ref={box3Ref} maxLength={1} keyboardType='numeric' style={{borderWidth:1.5,borderColor:Colors.darkGreen,color:Colors.pureBlack,width:width*0.135,height:height*0.07,borderRadius:5,textAlign:'center'}} onChangeText={(value)=>{if(value.length === 1){box4Ref.current.focus();setValue3(value)}}}/>

                <TextInput ref={box4Ref} maxLength={1} keyboardType='numeric' style={{borderWidth:1.5,borderColor:Colors.darkGreen,color:Colors.pureBlack,width:width*0.135,height:height*0.07,borderRadius:5,textAlign:'center'}} onChangeText={(value)=>{if(value.length === 1){setValue4(value)}}}/>


                {/* <TextBox width={width*0.135} height={height*0.07} borderRadius={5} maxLength={1} keyboardType='numeric' textAlign='center'/>

                <TextBox width={width*0.135} height={height*0.07} borderRadius={5} maxLength={1} keyboardType='numeric' textAlign='center'/>

                <TextBox width={width*0.135} height={height*0.07} borderRadius={5} maxLength={1} keyboardType='numeric' textAlign='center'/>

                <TextBox width={width*0.135} height={height*0.07} borderRadius={5} maxLength={1} keyboardType='numeric' textAlign='center'/> */}

            </View>
        )
    }



    return(
        <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        >
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <View style={{height:height*0.35,width:width*0.95,elevation:5,borderRadius:20,backgroundColor:Colors.White}}>

                    <View>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginLeft:5}}>

                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={{fontSize:22,fontWeight:'bold',color:'#008080'}}>Gwalior</Text>
                            <Text style={{fontSize:22,fontWeight:'bold',color:'#fdbb2d'}}>Basket</Text>
                            <Image style={{resizeMode: 'contain', width: 35,height: 35}} source={require('../../../assets/Images/logo.png')} />
                        </View>

                        <TouchableOpacity onPress={()=>handleClose()} style={{marginRight:5}}>
                            <EntypoIcon name="cross" size={22}/>
                        </TouchableOpacity>
                        </View>

                        <View style={{borderWidth:0.7,borderColor:Colors.pureBlack,marginHorizontal:7,borderRadius:10}}></View>
                    </View>

                    <View style={{flex:1,justifyContent:'space-evenly'}}>
                        <View style={{marginLeft:5}}>
                            <View>
                                <Text style={{fontWeight:'bold',color:Colors.pureBlack,fontSize:20}}>OTP Verification</Text>
                            </View>

                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontWeight:'bold',color:Colors.pureBlack}}>OTP has been sent to</Text>
                                <Text style={{fontWeight:'bold',color:Colors.darkGreen}}> +91 {phoneNumber}</Text>
                            </View>
                        </View>

                        <View>
                            {otpBoxes()}
                        </View>

                        {msg == '' ?
                        <View style={{alignItems:'center'}}>
                            <Button title={'Verify OTP'} bgColor={button ? Colors.darkGrey : Colors.darkGreen} txtColor={Colors.White} width={width*0.75} height={height*0.05} borderRadius={5} disableButton={button ? true : false} onPress={()=>handleVerify()}/>
                        </View>
                        :
                        <View style={{alignItems:'center'}}>
                            <Text style={{color:msg == 'Incorrect Otp' ? Colors.errClr : Colors.darkGreen,fontWeight:"bold",fontSize:18}}>{msg}</Text>
                        </View>
                        }
                    </View>
                </View>
            </View>
        </Modal>
    )
}