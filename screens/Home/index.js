import { SafeAreaView, Text, View, StyleSheet, Pressable } from "react-native";
import auth from '@react-native-firebase/auth';

const HomeScreen = ({navigation}) => {
    const onPressLogout = () => {
        auth.signOut();
    }

    return (
        <SafeAreaView>
            <View style={styles.cabecalho}>
                <Text>App de Compras</Text>
            </View>
            <View style={{justifyContent:'space-around', alignItems:'center'}}>
                <Pressable style={styles.botao} onPress={() => navigation.navigate('Login')}>
                    <Text>Login</Text>
                </Pressable>
                <Pressable style={styles.botao} onPress={() => navigation.navigate('Cadastro')}>
                    <Text>Cadastro</Text>
                </Pressable>
                <Pressable style={styles.botao} onPress={onPressLogout}>
                    <Text>Logout</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
botao:{
    backgroundColor:'purple',
    padding:'1rem',
    margin:'1rem',
    width:'65%',
    textAlign:'center',
    },
cabecalho:{
    padding:'2em',
    backgroundColor:'purple',
    width:'100%',
    textAlign:'center',
    marginBottom:'1em',
    }
});