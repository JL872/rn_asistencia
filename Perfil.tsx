import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  StyleSheet,
  FlexStyle, Pressable
} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import {NavigationProp} from "@react-navigation/native"


class Perfil extends Component {

    render() {
      return (
        <View style={Style.Inicio}>
          <Text style={Style.Texto}>Bienvenido</Text>
        </View>
      );
    }
  }

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
  });
  
  export default Perfil;