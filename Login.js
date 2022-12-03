import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  StyleSheet,
  FlexStyle, Pressable, Button
} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import {NavigationProp} from "@react-navigation/native"
import {createNativeStackNavigator } from '@react-navigation/native-stack';
import {useNavigation} from "@react-navigation/native";
import Perfil from "./Perfil";





const VentanaStack = () => {
  const navegation = useNavigation();
  return (
    <View style={Style.Inicio}>
    <Text style={Style.Texto}>Inicio de sesion</Text>

    <View style={Style.Textinp}>
      <TextInput placeholder="Usuario" />
    </View>

    <View style={Style.Textinp}>
      <TextInput placeholder="Contraseña" secureTextEntry={true} />
    </View>

    <Button
    title='Entrar'
    onPress={()=>navegation.navigate("Perfil")}
    />

  </View>
  );
};



const Style = StyleSheet.create({
  Inicio: {
    flex: 1,
    backgroundColor: '#6495ed',
  },
  Texto: {
    fontSize: 30,
    color: '#fff8dc',
    textAlign: 'center',
    marginTop: 50,
  },

  Textinp: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff8dc',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  boton: {
  marginTop:20,
  marginLeft:80,
  marginRight:80,
  backgroundColor: "#6a5acd",
  borderRadius:10,
  height:30,
  alignItems:"center",
  justifyContent:"center"
  },

  textboton:{
  color:"#dcdcdc",
  fontSize:20,
  fontWeight:"bold",
  }
});
export default VentanaStack;