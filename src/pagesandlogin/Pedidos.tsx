import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert, FlatList, SafeAreaView } from "react-native";
import db from "./database";

type Pedido = {
  id: number;
  nome: string;
  valor: string;
  quantidade: string;
  deve: string;
  data: string;
};

export default function Pedidos() {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [deve, setDeve] = useState("");
  const [data, setData] = useState("");
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    const initDb = async () => {
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS pedidos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT,
          valor TEXT,
          quantidade TEXT,
          deve TEXT,
          data TEXT
        );
      `);
      carregarPedidos();
    };
    initDb();
  }, []);

  const excluirPedido = async (id: number) => {
    await db.runAsync("DELETE FROM pedidos WHERE id = ?", [id]);
    carregarPedidos();
  };

  const carregarPedidos = async () => {
    const rows = await db.getAllAsync("SELECT * FROM pedidos");
    setPedidos(rows as Pedido[]);
  };

  const salvarPedido = async () => {
    if (!nome || !valor || !quantidade || !deve || !data) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    await db.runAsync(
      "INSERT INTO pedidos (nome, valor, quantidade, deve, data) VALUES (?, ?, ?, ?, ?)",
      [nome, valor, quantidade, deve, data]
    );

    Alert.alert("Sucesso", "Pedido salvo!");
    setNome("");
    setValor("");
    setQuantidade("");
    setDeve("");
    setData("");
    carregarPedidos();
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <TextInput
        style={{ borderWidth: 1, marginBottom: 8, padding: 8 }}
        placeholder="Nome do cliente"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={{ borderWidth: 1, marginBottom: 8, padding: 8 }}
        placeholder="Valor da compra"
        value={valor}
        onChangeText={setValor}
      />
      <TextInput
        style={{ borderWidth: 1, marginBottom: 8, padding: 8 }}
        placeholder="Quantidade"
        value={quantidade}
        onChangeText={setQuantidade}
      />
      <TextInput
        style={{ borderWidth: 1, marginBottom: 8, padding: 8 }}
        placeholder="Deve total"
        value={deve}
        onChangeText={setDeve}
      />
      <TextInput
        style={{ borderWidth: 1, marginBottom: 8, padding: 8 }}
        placeholder="Data"
        value={data}
        onChangeText={setData}
      />
      <Button title="Salvar Pedido" onPress={salvarPedido} />


      <FlatList
        style={{ marginTop: 16, flex: 1 }}
        data={pedidos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
              paddingVertical: 8,
            }}
          >
            <Text>Nome: {item.nome}</Text>
            <Text>Valor: {item.valor}</Text>
            <Text>Quantidade: {item.quantidade}</Text>
            <Text>Deve: {item.deve}</Text>
            <Text>Data: {item.data}</Text>

            <Button
              title="Excluir"
              color="red"
              onPress={() => excluirPedido(item.id)}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
