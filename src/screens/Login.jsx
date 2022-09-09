import React,{useState} from 'react'
import {View,Text,Dimensions,StyleSheet,TextInput,TouchableOpacity,Image} from 'react-native'
import CheckBox from "expo-checkbox";
import axios from 'axios'
import logo from '../../public/images/logo.png'

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const Login = () => {
  const [userName,setUserName]=useState('')
  const [password,setPassword]=useState('')
  const loginHandler=async()=>{
    const objUsr={
      sCode:password,
      sName:userName
    }
    await axios.post('https://5b4841c9-41cf-4c81-854a-aa6838a39120.mock.pstmn.io/azaaleactest/API/Sys/Sys.aspx/JValidate',objUsr).then((response)=>{
    alert(`Hi ${response.data.d.data.ado[0].sName}`)
    })
  }
  return (
    <View style={{display: 'flex', flexDirection: 'column',alignItems: 'center',justifyContent:"center",height:screenHeight}}>
       <View style={{height:100,width:screenWidth-50,padding:10,backgroundColor:'orange',marginBottom:20}}>
        <Image source={logo} style={{height:"90%", width:"auto"}} />
       </View>
       <View style={style.loginFormContainer}>
            <Text style={{fontSize:30,fontWeight:"bold",textAlign:"center"}}>Login</Text>
            <TextInput
        style={style.input}
        placeholder="username"
        keyboardType="default"
        value={userName}
        onChangeText={(text)=>setUserName(text)}
      />
            <TextInput
        style={style.input}
        placeholder="password"
        keyboardType="default"
        value={password}
        onChangeText={(text)=>setPassword(text)}
      />
      <View style={{marginTop:10,display:"flex",flexDirection:"row"}}>
        <CheckBox/>
        <Text style={{marginLeft:10}}>Save Password</Text>
      </View>
      <TouchableOpacity style={style.loginBtn} onPress={loginHandler}>
            <Text style={{color:"white"}}>Login</Text>
      </TouchableOpacity>
       </View>
    </View>
  )
}

const style=StyleSheet.create({
    loginFormContainer:{
        paddingHorizontal:10,
        paddingVertical:60,
        backgroundColor:'white',
        display: 'flex',
        flexDirection:"column",
        width:screenWidth -50,
        borderRadius:20

    },
    input: {
        height: 45,
        borderWidth: 1,
        paddingVertical:15,
        paddingHorizontal:10,
        marginTop:15,
        borderRadius:5
      },
      loginBtn:{
        marginTop:10,
        width:"90%",
       left:'5%',
       borderRadius:5,
       backgroundColor:'orange',
       height:40,
       display:"flex",
       justifyContent:"center",
       alignItems: "center",
      }
})

export default Login