import { SafeAreaView, Text, Pressable, TextInput, View, StyleSheet } from "react-native";
import React, { useState } from "react";

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onPressLogin = () => {
      auth()
        .signInWithEmailAndPassword(email, password)
        .catch(error => Alert.alert(`Erro ao efetuar login: ${error.code}`))
    }
    return (
      <SafeAreaView style={{alignContent:'center', justifyContent:'center'}}>
        <View style={{flex:1, alignItems:'center', justifyContent:'space-around', height:'80%'}}></View>
        <View style={styles.cabecalho}>
            <Text>Login</Text>
        </View>
        <TextInput
          style= {styles.campos}
          onChangeText={setEmail}
          value={email}
          placeholder="E-mail"
        />
        <TextInput
          style= {styles.campos}
          onChangeText={setPassword}
          value={password}
          placeholder="Senha"
        />
        <View>
        <Pressable style={styles.botao} onPress={onPressLogin}> 
            <Text>Logar</Text>
        </Pressable>
        <Pressable style={styles.botao} onPress={() => navigation.navigate('Cadastro')}>
            <Text>Cadastrar</Text>
        </Pressable>
        <Pressable style={styles.botao} onPress={() => navigation.navigate('Home')}> 
          <Text>Voltar</Text>
        </Pressable>
        </View>
    </SafeAreaView>
  )
};

export default LoginScreen;

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