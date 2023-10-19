import React,{useEffect, useState} from 'react'
import { ActivityIndicator, Image, Text, TouchableOpacity, View,Modal } from 'react-native'
import { GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({

    webClientId:
    
    "727395920058-tj3ad0obgumhhbsm2co1e6s5d7akm5a2.apps.googleusercontent.com",
    
    }); 
const Login = () => {
    const [userData,setUserData]=useState(null)
    const [loading,setLoading]=useState(false)

    const [status,setStatus]=useState(false)

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
        setTimeout(()=>{
            auth().signOut().then(()=>{
                setUserData(null)
                setLoading(false)
            }).catch(error=>{
                console.log(error)
                setLoading(false)
            })
        },500)
      }

      const handleModal=()=>{
        console.log("Hello modal")
        setStatus(true)
      }

      useEffect(()=>{
        setUserData(auth().currentUser)
      })
  return (
    <View>
    <Modal visible={status} >

    </Modal>
        {userData && <View style={{flexDirection:'row',backgroundColor:'#287FF0',width:'100%',height:'13%',justifyContent:'flex-end'}}>
       <TouchableOpacity onPress={handleModal}>
        <View style={{flexDirection:'column'}}>
            <View style={{marginHorizontal:9,backgroundColor:'white',height:7,width:7,borderRadius:10,marginTop:10}} />
            <View style={{marginHorizontal:9,backgroundColor:'white',height:7,width:7,borderRadius:10,marginTop:5}} />
            <View style={{marginHorizontal:9,backgroundColor:'white',height:7,width:7,borderRadius:10,marginTop:5}} />

        </View>
        </TouchableOpacity>
        </View>}

        {userData && <View style={{justifyContent:'center',alignItems:'center',marginTop:80,marginBottom:30}}>
            <Image style={{height:130,width:130,objectFit:'contain',borderRadius:50}} source={{uri:userData.photoURL}} />
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