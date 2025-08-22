import React, { useState, useEffect } from "react";
import { View, TextInput, Image, TouchableOpacity, Text, Alert } from "react-native";
import { style } from "./styles";
import db, { setupDatabase } from "./database";

type Props = {
  navigation: any;
};

export default function Login({ navigation }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setupDatabase().catch((err) => {
      console.error("Erro ao configurar o banco:", err);
    });
  }, []);

  const handleLogin = async () => {
    try {
      const rows = await db.getAllAsync(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        [username, password]
      );

      if (rows.length > 0) {
        Alert.alert("Sucesso", "Login válido! Bem-vinda(o), " + username);
        navigation.replace("Pedidos"); 
      } else {
        Alert.alert("Erro", "Usuário ou senha incorretos!");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      Alert.alert("Erro", "Ocorreu um problema ao acessar o banco.");
    }
  };

  return (
    <View style={style.container}>
      <Image
        source={require("../assets/carrinho.png")}
        style={style.logo}
      />

      <TextInput
        style={style.input}
        placeholder="Login"
        placeholderTextColor="#999"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={style.input}
        placeholder="Senha"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={style.button} onPress={handleLogin}>
        <Text style={style.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}
