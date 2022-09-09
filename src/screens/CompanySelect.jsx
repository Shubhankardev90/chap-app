import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import SelectDropdown from "react-native-select-dropdown";
import axios from 'axios'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Alert,
  TextInput,
  Dimensions,
  AsyncStorage,
  ImageBackground,
  Button,
  TouchableOpacity
} from "react-native";
const settingIcon = <Icon name="gear" size={40} color="#000" />;
const data = ["Egypt", "Canada", "Australia", "Ireland"];


// import settingIcon from "../../public/icons/settings.png";
// import Icon from 'react-native-vector-icons'
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const CompanySelect = ({navigation}) => {
  const [modalShow, setModalShow] = useState(false);
  const [portNumber, setPortNumber] = useState("");
  const [company,setCompany]=useState([]);
  const [selectCompany,setSelectCompany]=useState('');

const getCompaniesData=async()=>{
try{
  await axios.post('https://5b4841c9-41cf-4c81-854a-aa6838a39120.mock.pstmn.io/azaaleactest/API/Sys/Sys.aspx/JInitialize',{"Content-Type": "application/json"}).then(function(response){
    // setCompany(response.data)
    let data=response.data.d.data.ado;
    data && setCompany(data)
  })
}catch(e){
  console.log("error",e);
}
}

useEffect(() => {
  getCompaniesData()
},[])


  const saveOnLocal = async (name, value) => {
    try {
      await AsyncStorage.setItem(`@${name}`, value);
    } catch (e) {
      console.log(e);
    }
  };
  const getFromLocal = async (name) => {
    try {
      await AsyncStorage.getItem(`@${name}`).then((res) => {
        setPortNumber(res);
      });
    } catch (e) {
      console.log(e);
    }
  };
  async function toggleModal() {
    setPortNumber(getFromLocal("Talk2EnfyPort"));
    setModalShow(!modalShow);
  }
  const portInputHandler = (text) => {
    setPortNumber(text);
  };
  const resetTextHandler = () => {
    setPortNumber("");
  };
  const saveTextHandler = async () => {
    saveOnLocal("Talk2EnfyPort", portNumber);
    await setPortNumber("");
    Alert.alert("PORT saved");
    toggleModal();
  };
  const connectHandler=async()=>{
    await AsyncStorage.setItem('@Talk2EnfyCompany',selectCompany)
    // const c=await AsyncStorage.getItem('@Talk2EnfyCompany')
    navigation.navigate('login')
  }

  return (
    <View>
      <View>
        <Pressable onPress={toggleModal} style={style.settingIcon}>
          {/* <Image source={settingIcon}  /> */}
          {settingIcon}
        </Pressable>
      </View>
      <ImageBackground source={require('../../public/images/Get_Started.png')} resizeMode="contain" style={style.imgBackground}>
      <View
        style={modalShow ? style.modalContainer : style.modalContainerHidden}
      >
        <View style={style.modal}>
          <View style={style.label}>
            <Text style={style.labelText}>Port setting</Text>
          </View>
          <TextInput
            numberOfLines={5}
            editable
            maxLength={40}
            placeholder="Enter PORT "
            style={style.input}
            value={portNumber}
            onChangeText={(text) => portInputHandler(text)}
          />
          <View style={style.modalOptions}>
            <Pressable onPress={resetTextHandler}>
              <Text> Reset</Text>
            </Pressable>
            <Pressable onPress={saveTextHandler}>
              <Text> Save</Text>
            </Pressable>
            <Pressable onPress={toggleModal}>
              <Text> Cancel</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View style={style.selectCompany}>
      <View style={{position: "relative"}}>
      <SelectDropdown
      defaultButtonText="Select Company"
        dropdownStyle={{ width: "85%" }}
        buttonStyle={{width: "100%",padding:2,height:40}}
        buttonTextStyle={{fontSize: 16}}
        data={company}
        onSelect={(selectedItem, index) => {
          setSelectCompany(selectedItem.CODE)
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem.NAME;
        }}
        rowTextForSelection={(item, index) => {
          return item.NAME;
        }}
      />
    </View>
      </View>
      <TouchableOpacity style={style.connectBtn} onPress={connectHandler}>
        <Text style={{color:"white",fontSize:20}}>Connect</Text>
      </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const style = StyleSheet.create({
  settingIcon: {
    height: 40,
    width: 40,
    position: "absolute",
    right: 10,
    top: 10,
    zIndex:999
  },
  modalContainer: {
    position: "absolute",
    height: screenHeight,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex:99,
    backgroundColor:'#000000b0',
    width: screenWidth
  },
  modalContainerHidden: {
    position: "absolute",
    height: screenHeight - 100,
    top: 50,
    display: "none",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    width: screenWidth - 50,
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    borderRadius: 5,
  },
  input: {
    borderWidth: 2,
    width: "90%",
    height: 40,
    borderColor: "orange",
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  label: {
    width: "90%",
    marginBottom: 20,
  },
  modalOptions: {
    display: "flex",
    flexDirection: "row",
    margin: 30,
    justifyContent: "space-between",
    width: "90%",
  },
  selectCompany:{
    borderColor:"black",
    borderWidth:1,
    position: "absolute",
    top:screenHeight -280,
    width:screenWidth -50,
    left:25,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius:5,
    padding:1
  },
  imgBackground:{
    height:screenHeight/2,
    display:'flex',
    alignItems:"flex-start",
    width:screenWidth
  },
  connectBtn:{
    position: 'absolute',
    top:screenHeight -200,
    backgroundColor:"red",
    width:screenWidth -100,
    left:50,
    height:40,
    display:"flex",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"orange",
    borderRadius:10
  },
});

export default CompanySelect;
