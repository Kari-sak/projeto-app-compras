import { SafeAreaView, Text, Pressable, TextInput, View, Alert, StyleSheet } from "react-native";
import React, { useState } from "react";
import auth from '@react-native-firebase/auth';

const CadastroScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    
    const createUserData = (uid, user) => {
      rtDatabase.ref(`users/${user}`).set({
        id : uid,
      })
      rtDatabase.ref(`uid-username/${uid}`).set(user)
    }

    const createUser = (validUserName) => {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(error => Alert.alert(`Erro ao efetuar cadastro: ${error.code}`))
        .then(credential => {
          createUserData(credential.user.uid, validUserName)
        })
    };

    const onPressRegister = () => {
      rtDatabase.ref(`users/${userName}`).once('value')
        .then(snap => {
          if(snap.exists()) {
            Alert.alert(`O username ${userName} já está em uso!`);
          } else {
            createUser(userName);
          }
        })
    }

    return (
      <SafeAreaView style={{alignContent:'center', justifyContent:'center'}}>
        <View style={{flex:1, alignItems:'center', justifyContent:'space-around', height:'80%'}}></View>
        <View style={styles.cabecalho}>
          <Text>Cadastro</Text>
        </View>
        <TextInput
          style={styles.campos}
          onChangeText={setUserName}
          value={userName}
          placeholder="Username"
        />
        <TextInput
          style={styles.campos}
          onChangeText={setEmail}
          value={email}
          placeholder="E-mail"
        />
        <TextInput
          style={styles.campos}
          onChangeText={setPassword}
          value={password}
          placeholder="Senha"
        />
        <View>
        <Pressable style={styles.botao} onPress={onPressRegister}> 
          <Text>Cadastrar</Text>
        </Pressable>
        <Pressable style={styles.botao} onPress={() => navigation.navigate('Home')}> 
          <Text>Voltar</Text>
        </Pressable>
        </View>
      </SafeAreaView>
    )
};

export default CadastroScreen;

const styles = StyleSheet.create({
  botao:{
    backgroundColor:'purple',
    padding:'1rem',
    margin:'1rem',
    width:'65%',
    textAlign:'center',
  },
  campos:{
    margin:'1em',
    padding:'1.5em',
    width:'65%'
  },
  cabecalho:{
    padding:'2em',
    backgroundColor:'purple',
    width:'100%',
    textAlign:'center',
    marginBottom:'1em',
  }
});