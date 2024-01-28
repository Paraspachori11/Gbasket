import { useEffect, useState } from "react";
import { TextInput,View,Text } from "react-native";
import Colors from "../../assets/Colors";
import Icons from "react-native-vector-icons/MaterialCommunityIcons"


const TextBox=({icon,error,password,placeHolder,width,height,borderRadius,onFocus=()=>{},onPress=()=>{},numText,keyboardType="default",onChangeText=(event)=>{},maxLength,textAlign="auto",value='',editable=true,multiline=false,numberOfLines=1,textAlignVertical="auto"})=>{

    const [focus,setFocus]=useState(false)
    const [pwdIcon,setPwdIcon]=useState(false)
    // pwdIcon = false (Visibility Off) || pwdIcon = true (Visibility on)
    const [inputValue,setInputValue] = useState(value)

    useEffect(function()
    {
        setInputValue(value)
    },[value])

    return(
    <View>
        <View
        onBlur={()=>{setFocus(false)}} 
        onFocus={()=>{onFocus();setFocus(true)}} 
        style={{width: width,
                height: height,
                borderColor: focus ? Colors.darkGreen : error ? Colors.errClr : Colors.darkGrey,
                borderRadius: borderRadius,
                borderWidth: focus ? 1.5 : error ? 1.5 : 1.5,
                flexDirection: 'row',
                alignItems:'center'
                }}>
            {numText ? <Text>{numText}</Text> : <></>}
            {!icon && !password ? <></> : <Icons name={password?'key-variant':icon} style={{fontSize:40,marginRight:5}} color={Colors.Grey}/>}
            <TextInput secureTextEntry={pwdIcon ? false : password ? true : false} placeholder={placeHolder} style={{flex:1,textAlign:textAlign}} textAlignVertical={textAlignVertical} keyboardType={keyboardType} onChangeText={(event)=>{onChangeText(event);setInputValue(event)}} maxLength={maxLength} value={inputValue} editable={editable} multiline={multiline} numberOfLines={numberOfLines}/>
            {password?<Icons name={!pwdIcon?'eye-off':'eye'} onPress={()=>{setPwdIcon(!pwdIcon)}} style={{fontSize:30,paddingTop:5}}/>:<></>}
        </View>
        {error?<Text style={{color:Colors.errClr,marginLeft:5}}>Error!{error}</Text>:<></>}
    </View>
    )
}

export default TextBox

// import { useState } from "react";
// import { TextInput,View,Text } from "react-native";
// import Colors from "../../assets/Colors";
// import Icons from "react-native-vector-icons/MaterialCommunityIcons"


// const TextBox=({icon,error:initalError,password,placeHolder,width,height,borderRadius,onFocus=()=>{},onPress=()=>{}})=>{

//     const [focus,setFocus]=useState(false)
//     const [err,setErr] = useState(initalError)

//     const [pwdIcon,setPwdIcon]=useState(false)
    // pwdIcon = false (Visibility Off) || pwdIcon = true (Visibility on)


//     return(
//     <View>
//         <View 
//         onBlur={()=>{setFocus(false);setErr(false)}} 
//         onFocus={()=>{onFocus();setFocus(true)}} 
//         style={{width: width,
//                 height: height,
//                 borderColor: focus ? Colors.BorderClr : err ? Colors.errClr : Colors.darkGrey,
//                 borderRadius: borderRadius,
//                 borderWidth: focus ? 2 : err ? 2 : 1.5,
//                 flexDirection: 'row'
//                 }}>
//             <Icons name={password?'key-variant':icon} style={{fontSize:40,marginRight:5}} color={Colors.Grey}/>
//             <TextInput secureTextEntry={pwdIcon ? false : password ? true : false} placeholder={placeHolder} style={{flex:1}}/>
//             {password?<Icons name={!pwdIcon?'eye-off':'eye'} onPress={()=>{setPwdIcon(!pwdIcon)}} style={{fontSize:30,paddingTop:5}}/>:<></>}
//         </View>
//         {err?<Text style={{color:Colors.errClr,marginLeft:5}}>Error!{err}</Text>:<></>}
//     </View>
//     )
// }

// export default TextBox