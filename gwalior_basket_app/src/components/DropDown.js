import { TextInput, View,Image,FlatList,Text } from "react-native";
import Colors from "../../assets/Colors";
import Icons from "react-native-vector-icons/AntDesign"
import { useState,useRef } from "react";
import Option from "./Option";
import CountryFlag from "react-native-country-flag";


const DropDown=({width,height,borderRadius,onPress=()=>{},onFocus=()=>{}})=>{
    const [iconDD,setIconDD] = useState(false)
    const textInputRef = useRef(null)

    const optionBox=()=>{
        setIconDD(!iconDD)
        textInputRef.current.blur()
    }

    const handleFocusTextBox=()=>{
        if(!iconDD)
        {
            setIconDD(!iconDD)
        }
    }

    const handleBlurTextBox=()=>{
            setIconDD(false)
        // if(!iconDD)
        // {
        //     setIconDD(iconDD)
        // }
        // else
        // {
        //     setIconDD(!iconDD)
        // }
    }

    const ctyData = [{ctyCode:'7',isoCode:'RU',ctyName:'Russia'},{ctyCode:'64',isoCode:'NZ',ctyName:'NewZealand'},{ctyCode:'91',isoCode:'IN',ctyName:'India'},{ctyCode:'44',isoCode:'GB',ctyName:'England'},{ctyCode:'27',isoCode:'ZA',ctyName:'South Africa'},{ ctyCode: '93', isoCode: 'AF', ctyName: 'Afghanistan' },{ ctyCode: '355', isoCode: 'AL', ctyName: 'Albania' },{ ctyCode: '213', isoCode: 'DZ', ctyName: 'Algeria' }]


    const [id,setId] = useState('')

    const OptionView=()=>{
        return(
            <View style={{borderWidth:1,width:225,height:130,borderRadius:6,backgroundColor:Colors.lightGrey}}>
                <FlatList 
                data={ctyData}
                renderItem={({item})=>{
                    return <Option isocode={item.isoCode} ctycode={item.ctyCode} name={item.ctyName} onPress={() => {setId(item);handleBlurTextBox();textInputRef.current.blur()}}/>
                }}/>
            </View>
        )
    }

    return(
        <View style={{alignItems:'center'}}>
            <View style={{borderColor:Colors.darkGrey,borderWidth:1.5,width:width,height:height,borderRadius:borderRadius,alignItems:'center',flexDirection:'row'}}>
                {!id ? <Image source={require("../../assets/Images/earth.png")} style={{width:32,height:32,borderWidth:1,marginLeft:5}}/> : <CountryFlag isoCode={id.isoCode} size={30} style={{borderRadius:4,marginLeft:2.5,height:35}}/>}
                <TextInput placeholder="Country" style={{flex:1}} onFocus={()=>{handleFocusTextBox()}} 
                // onBlur={()=>{handleBlurTextBox()}}
                ref={textInputRef}
                value={id.ctyName}
                />
                <Icons name={!iconDD ?'caretup':'caretdown'} style={{fontSize:20,flex:0.15}} onPress={()=>{optionBox()}}/>
            </View>
            {iconDD?OptionView():<></>}
            {/* {id?<Text>{JSON.stringify(id)}</Text>:<></>} */}
        </View>
    )
}

export default DropDown