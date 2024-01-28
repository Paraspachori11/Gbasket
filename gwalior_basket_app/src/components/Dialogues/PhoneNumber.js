import React, {useEffect, useState} from 'react';
import {Modal,Text, View, Image, Dimensions, TouchableOpacity} from 'react-native';
import Colors from "../../../assets/Colors";
import TextBox from "../TextBox";
import Button from "../Button";
import EntypoIcon from "react-native-vector-icons/Entypo"
const {width,height} = Dimensions.get("window")

export default function PhoneNumber({dialogue,setDialogue,setPhoneNumber,otpDialogue,setOtpDialogue})
{
  const [modalVisible, setModalVisible] = useState(dialogue);
  const [number,setNumber] = useState('')
  const [button,setButton] = useState(true)

  useEffect(function()
  {
    setModalVisible(dialogue)
  },[dialogue])

  const handleClose=()=>{
    setDialogue(!dialogue)
  }

  const handleChangeText =(eventValue)=>{
    setNumber(eventValue)
    if((/^[0-9]{10}$/.test(eventValue)))
    {
      setButton(false)
    }
    else
    {
      setButton(true)
    }
  }

  const handleOtp =()=>{
    setPhoneNumber(number)
    setNumber('')
    setButton(true)
    setDialogue(!dialogue)
    setOtpDialogue(!otpDialogue)
  }

  return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        >
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <View style={{height:height*0.25,width:width*0.95,elevation:5,borderRadius:20,backgroundColor:Colors.White,justifyContent:'space-evenly'}}>

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

<View style={{justifyContent:'space-evenly',flex:1}}>
            <View style={{alignItems:'center'}}>
                <TextBox numText={' +91'} width={width*0.75} height={height*0.07} placeHolder={"Enter Mobile Number"} keyboardType={"numeric"} onChangeText={(event)=>handleChangeText(event)} maxLength={10}/>
            </View>

            <View style={{alignItems:'center'}}>
                <Button title={'Get OTP'} bgColor={button ? Colors.darkGrey : Colors.darkGreen} txtColor={Colors.White} width={width*0.75} height={height*0.05} borderRadius={5} disableButton={button ? true : false} onPress={()=>handleOtp()}/>
            </View>
            </View>
        </View>
        </View>
      </Modal>
  );
};






// import { View,Dimensions, Text,Image } from "react-native";
// import Colors from "../../../assets/Colors";
// import TextBox from "../TextBox";
// import Button from "../Button";
// const {width,height} = Dimensions.get("window")

// export default function PhoneNumber()
// {
//     return(
//         <View style={{height:height*0.25,width:width*0.95,elevation:5,borderRadius:20,backgroundColor:Colors.White,justifyContent:'space-between'}}>

//             <View>
//                 <View style={{flexDirection:'row',alignItems:'center'}}>
//                     <Text style={{fontSize:22,fontWeight:'bold',color:'#008080'}}>Gwalior</Text>
//                     <Text style={{fontSize:22,fontWeight:'bold',color:'#fdbb2d'}}>Basket</Text>
//                     <Image style={{resizeMode: 'contain', width: 35,height: 35}} source={require('../../../assets/Images/logo.png')} />
//                 </View>

//                 <View style={{borderWidth:0.7,borderColor:Colors.pureBlack,marginHorizontal:7,borderRadius:10}}></View>
//             </View>

//             <View style={{alignItems:'center'}}>
//                 <TextBox numText={' +91'} width={width*0.75} height={height*0.07} placeHolder={"Enter Mobile Number"}/>
//             </View>

//             <View style={{paddingBottom:5,alignItems:'center'}}>
//                 <Button title={'Get OTP'} bgColor={Colors.darkGreen} txtColor={Colors.White} width={width*0.25} height={height*0.05} borderRadius={150}/>
//             </View>
//         </View>
//     )
// }