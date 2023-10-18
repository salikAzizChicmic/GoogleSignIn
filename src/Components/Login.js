import React,{useEffect, useState} from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin';


const Login = () => {
    const webClientId = "727395920058-tj3ad0obgumhhbsm2co1e6s5d7akm5a2.apps.googleusercontent.com"; 

    const [userData,setUserData]=useState(null)
    useEffect(()=>{
        GoogleSignin.configure({
            webClientId: webClientId,
        })
    },[])

    const googleLogin = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log("userinfo", userInfo);
            setUserData(userInfo.user)

        } catch (error) {
            console.log(error)
        }
      };

      const handleLogout=()=>{
         aut   
        setUserData(null)
      }

      
  return (
    <View>

        {userData && <View style={{justifyContent:'center',alignItems:'center',marginTop:110,marginBottom:30}}>
            <Image style={{height:130,width:130,objectFit:'fill',borderRadius:50}} source={{uri:userData.photo}} />
            <Text style={{fontSize:20,fontWeight:'bold',marginTop:10}}>{userData.givenName} {userData.familyName}</Text>
            <Text>{userData.email}</Text>
        </View>}

        {!userData && <TouchableOpacity onPress={googleLogin} style={{marginHorizontal:50,marginVertical:0}}>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',borderWidth:1,borderRadius:10}}>
                <Image style={{height:40,width:40,marginHorizontal:10,marginVertical:5}} source={require('../Assets/Images/google.png')} />
                <Text style={{fontSize:20,fontWeight:'bold'}}>Signin with Google</Text>
            </View>
        </TouchableOpacity>}

        {userData && <TouchableOpacity onPress={handleLogout} style={{marginHorizontal:50,marginVertical:0}}>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',borderWidth:1,borderRadius:10}}>
                <Image style={{height:40,width:40,marginHorizontal:10,marginVertical:5}} source={require('../Assets/Images/lgt.png')} />
                <Text style={{fontSize:20,fontWeight:'bold'}}>Signout from Google</Text>
            </View>
        </TouchableOpacity>}
       
    </View>
  )
}

export default Login