import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcf6ebff", 
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 10,
    resizeMode: "contain",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  button: {
  backgroundColor: "#f7e6faff",
  paddingVertical: 12,
  paddingHorizontal: 30,
  borderRadius: 8,
  marginTop: 10,
},
buttonText: {
  color: "#161616ff",
  fontSize: 16,
  fontWeight: "bold",
  textAlign: "center",
},
});
