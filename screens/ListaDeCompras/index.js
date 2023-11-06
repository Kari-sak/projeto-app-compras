import { SafeAreaView, View, Text, TextInput, FlatList, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';

const ListaDeComprasScreen = ({navigation}) => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    const databaseRef = firebase.database().ref('shoppingList');

    databaseRef.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const itemsArray = Object.entries(data).map(([key, value]) => ({ key, ...value }));
        setItems(itemsArray);
      } else {
        setItems([]);
      }
    });

    return () => {
      databaseRef.off('value');
    };
  }, []);

  const handleAddItem = () => {
    if (newItem) {
      firebase.database().ref('shoppingList').push({
        name: newItem,
        quantity: 1,
      });
      setNewItem('');
    }
  };

  const handleUpdateQuantity = (key, quantity) => {
    firebase.database().ref(`shoppingList/${key}`).update({
      quantity,
    });
  };

  const handleDeleteItem = (key) => {
    firebase.database().ref(`shoppingList/${key}`).remove();
  };

  return (
    <SafeAreaView style={{alignContent:'center', justifyContent:'center'}}>
        <View style={{flex:1, alignItems:'center', justifyContent:'space-around', height:'80%'}}></View>
        <View style={styles.cabecalho}>
            <Text>Lista de Compras</Text>
        </View>
        <View style={{justifyContent:'space-around', alignItems:'center'}}>
            <TextInput
                style={styles.campos}
                onChangeText={(text) => setNewItem(text)}
                value={newItem}
                placeholder="Novo Item"
            />
            <Pressable style={styles.botao} onPress={handleAddItem}> 
                <Text>Adicionar Item</Text>
            </Pressable>
        <FlatList
            data={items}
            renderItem={({ item }) => (
            <View>
                <Text>{item.name}</Text>
                <TextInput
                    style={styles.campos}
                    onChangeText={(text) => handleUpdateQuantity(item.key, text)}
                    value={item.quantity.toString()}
                    placeholder="Quantidade"
                />
                <Pressable style={styles.botao} onPress={handleAddItem}> 
                    <Text>+</Text>
                </Pressable>
                <Pressable style={styles.botao} onPress={() => handleDeleteItem(item.key)}> 
                    <Text>-</Text>
                </Pressable>
            </View>
            )}
        />
        </View>
        <View>
            <Pressable style={styles.botao} onPress={handleAddItem}> 
                <Text>Adicionar</Text>
            </Pressable>
            <Pressable style={styles.botao} onPress={() => navigation.navigate('Home')}> 
                <Text>Voltar</Text>
            </Pressable>
        </View>
    </SafeAreaView>
  )};

  export default ListaDeComprasScreen;

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