/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {ScrollView, View} from 'react-native';
import AppHeader from './src/components/AppHeader';
import OpenPage from './src/screens/OpenPage';
import Home from './src/screens/Home';
import ShowCart from './src/components/ShowCart/MainComponent/ShowCart';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import RootReducer from './src/storage/RootReducer';
import BrandsInFocus from './src/components/BrandsInFocus';
import BigSummerFest from './src/components/BigSummerFest';
import SelectedProducts from './src/components/SelectedProducts/MainComponent/SelectedProduct';
import PhoneNumber from './src/components/Dialogues/PhoneNumber';
import ProductDetail from './src/screens/ProductDetail';
import RootNavigation from './src/navigaton/RootNavigation';
const store = createStore(RootReducer)

function App(){

  // const [display,setDisplay] = useState(true)

  // useEffect(function(){
  //   setTimeout(() => {
  //     setDisplay(false)
  //   }, 3500);
  // },[])

  return(
    <Provider store={store}>
      <RootNavigation/>
  {/* <View>
    {display ?
    <OpenPage/>
    :
    <></>
    }
    {!display ?
    <View>
    <ScrollView>
        Home

        <AppHeader/>

        <Home/>

        <ProductDetail/>

        CART
        <ShowCart/>
        <BrandsInFocus/>
        <BigSummerFest/>
    </ScrollView>
        </View>
    :
    <></>
    }
  </View> */}
  </Provider>
  )
  };
export default App;