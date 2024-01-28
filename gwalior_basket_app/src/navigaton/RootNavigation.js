import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import MyProfile from "../screens/MyProfile";
import Product from "../screens/Product";
import AppHeader from "../components/AppHeader";
import { createDrawerNavigator,DrawerContentScrollView,DrawerItemList,DrawerItem } from "@react-navigation/drawer";
import MCI from 'react-native-vector-icons/MaterialCommunityIcons'
import { Image, Text, View } from "react-native";
import OpenPage from "../screens/OpenPage";
import { useState,useEffect } from "react";
import ProductDetail from "../screens/ProductDetail";
import ShowCart from "../components/ShowCart/MainComponent/ShowCart";
import Category from "../screens/Category";
import { getKey, getStoreData } from "../storage/AsyncStorage";

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

export default function RootNavigation()
{
    const [userData, setUserData] = useState({'username':'','mobile':''});

    useEffect(async function(){
        var phNo = await getKey()
        var data = await getStoreData(phNo)
        setUserData(data)
    },[])

    // var userData = ''

    // useEffect(async function(){
    //     var phNo = await getKey()
    //     if(phNo !== undefined)
    //     {
    //         userData = await getStoreData(phNo)
    //     }
    // })

    function CustomDrawerContent(props) {
        return(
            <DrawerContentScrollView {...props}>
                <View style={{display:'flex',padding:20,alignItems:'center',flexDirection:'column'}}>
                    <Image style={{marginBottom:5,resizeMode:'contain',width:100,height:100}} source={require('../../assets/Images/user.png')} />
                    <Text style={{fontWeight:'bold'}}>{userData?.username}</Text>
                    <Text>+91 {userData?.mobile}</Text>
                </View>

                <DrawerItemList {...props} />
                    {/* <DrawerItem label="My Profile" onPress={()=>props.navigation.navigate('MyProfile')} icon={()=><MCI name={'account-box'} size={24} /> } /> */}

                    {/* <DrawerItem label="Settings" icon={()=><MCI name={'account-settings'} size={24} /> } /> */}

                    <DrawerItem label="Logout" icon={()=><MCI name={'logout'} size={24} /> } />
            </DrawerContentScrollView>
        )
    }
    
    const ProjectDrawer = () => {
        return(
            <Drawer.Navigator initialRouteName="Home" drawerContent={props=><CustomDrawerContent {...props} />}>

                <Drawer.Screen name="Home" component={Home} options={{headerShown:false , drawerIcon:()=><MCI name={"home-city"} size={24}/> }} />

                <Drawer.Screen name="Product" component={Product} options={{headerShown:false , drawerIcon:()=><MCI name={"drawing-box"} size={24}/> }} />

                <Drawer.Screen name="MyProfile" component={MyProfile} options={{headerShown:false , drawerIcon:()=><MCI name={"account-box"} size={24}/> }} />

            </Drawer.Navigator>
        )
    }

    const [display,setDisplay] = useState(true)

    useEffect(function(){
        setTimeout(() => {
        setDisplay(false)
        }, 3000);
    },[])

    return(
        <NavigationContainer>
            {display ?
            <Stack.Navigator initialRouteName={"splash"} >
                <Stack.Screen name="splash" component={OpenPage} options={{headerShown : false}} />
            </Stack.Navigator>
            :
            <></>
            }

            {!display ?
            <Stack.Navigator initialRouteName={"initialHome"} >
                <Stack.Screen name="initialHome" component={ProjectDrawer} options={{ header : AppHeader}} />
                <Stack.Screen name="Product" component={Product} options={{ header : AppHeader}} />
                <Stack.Screen name="MyProfile" component={MyProfile} options={{ header : AppHeader}} />
                <Stack.Screen name="Category" component={Category} options={{headerShown : true}} />
                <Stack.Screen name="ShowCart" component={ShowCart} options={{headerShown : true}} />
                <Stack.Screen name="ProductDetail" component={ProductDetail} options={{headerShown : true}} />
            </Stack.Navigator>
            :
            <></>
            }
        </NavigationContainer>
    )
}