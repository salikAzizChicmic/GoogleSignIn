import React,{useEffect, useState} from 'react'
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native'
import { GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({

    webClientId:
    
    "727395920058-tj3ad0obgumhhbsm2co1e6s5d7akm5a2.apps.googleusercontent.com",
    
    }); 
const Login = () => {
    const [userData,setUserData]=useState(null)
    const [loading,setLoading]=useState(false)

    const googleLogin = async () => {
        const { idToken } = await GoogleSignin.signIn();

        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        
        return auth().signInWithCredential(googleCredential);
      };

      const handleLogin=()=>{
        setLoading(true)
        googleLogin().then((res)=>{
            setUserData(res.user)
            setLoading(false)
        }).catch(error=>{
            console.log(error)
            setLoading(false)
        })
      }
      

      const handleLogout=()=>{
        setLoading(true)
        auth().signOut().then(()=>{
            setUserData(null)
            setLoading(false)
        }).catch(error=>{
            console.log(error)
            setLoading(false)
        })
      }

      useEffect(()=>{
        setUserData(auth().currentUser)
      })
  return (
    <View>

        {userData && <View style={{justifyContent:'center',alignItems:'center',marginTop:110,marginBottom:30}}>
            <Image style={{height:130,width:130,objectFit:'fill',borderRadius:50}} source={{uri:userData.photoURL}} />
            <Text style={{fontSize:20,fontWeight:'bold',marginTop:10}}>{userData.givenName} {userData.displayName}</Text>
            <Text>{userData.email}</Text>
        </View>}

        {!userData && <TouchableOpacity onPress={handleLogin} style={{marginHorizontal:50,marginTop:300}}>
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
        {loading && <ActivityIndicator size='large' />}
       
    </View>
  )
}

export default Login