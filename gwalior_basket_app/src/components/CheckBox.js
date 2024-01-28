import { TouchableOpacity,View} from "react-native"
import Colors from "../../assets/Colors"
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome"
import { useState } from "react"

const CheckBox=({onPress=()=>{}})=>
{
    const [check,setCheck] = useState(false)

    const handleStatusChange =()=>{
        setCheck(!check)
    }

    return(
        <TouchableOpacity onPress={()=>{onPress();handleStatusChange()}}>
            <View style={{width:15,height:15,borderWidth:2,borderRadius:2,borderColor:Colors.darkGreen,backgroundColor: !check ? Colors.White : Colors.darkGreen,alignItems:'center',justifyContent:'center'}}>
                {!check ?
                <></> 
                :
                <FontAwesomeIcon name="check" size={11} color="white"/>
                }
            </View>
        </TouchableOpacity>
    )
}

export default CheckBox