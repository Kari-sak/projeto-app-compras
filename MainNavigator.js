import{ useState, useEffect } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/Home";
import CadastroScreen from "./screens/Cadastro";
import LoginScreen from "./screens/Login";
import ListaDeComprasScreen from "./screens/ListaDeCompras";
import { SafeAreaView, Text } from 'react-native';

const MainNavigator = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState();

    function onAuthStateChanged(user) {
        setUser(user);
        if (isLoading) setIsLoading(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    const Stack = createNativeStackNavigator();

    if (isLoading) {
        return(
            <SafeAreaView>
                <Text>
                    LOADING
                </Text>
            </SafeAreaView>
        )
    }

    return (
        <Stack.Navigator initialRouteName={user ? "Home" : "Login"}>
           {
            user ? (
                <>
                    <Stack.Screen name={"Home"} component={HomeScreen}/>
                    <Stack.Screen name={"ListaDeCompras"} component={ListaDeComprasScreen}/>
                </>
            ) : (
                <>
                    <Stack.Screen name={"Cadastro"} component={CadastroScreen}/>
                    <Stack.Screen name={"Login"} component={LoginScreen}/>
                </>
            )
           }
        </Stack.Navigator>
    );
};
  
export default MainNavigator;