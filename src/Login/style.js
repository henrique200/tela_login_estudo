import styled from "styled-components/native";

// flex:1 é a mesma coisa que width: 100%, height: 100%

export const CaixaPrincipal = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #151515;
  padding: 24px;
  gap: 15px;
`;

export const TituloDaPagina = styled.Text`
  font-size: 34px;
  color: #ffffff;
  font-weight: 700;
`;

export const InputEmail = styled.TextInput`
  /* aqui recebemos a propiedade de erros e verificamos a se tiver 
  algum erro a cor da borda deve ficar vermelha se não deve ser transparente */
  border: 3px solid ${(props) => (props.erro ? "red" : "transparent")};
  background-color: #ccc;
  border-radius: 4px;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  color: #222;
`;

export const InputSenha = styled.View`
  /* aqui recebemos a propiedade de erros e verificamos a se tiver 
  algum erro a cor da borda deve ficar vermelha se não deve ser transparente */
  border: 3px solid ${(props) => (props.erro ? "red" : "transparent")};
  background-color: #ccc;
  border-radius: 4px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

export const ConteudoInput = styled.TextInput`
  width: 80%;
  font-size: 16px;
  color: #222;
`;

export const VerSenha = styled.TouchableOpacity`
  width: auto;
  height: auto;
`;

export const BotaoEntrar = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  background-color: transparent;
  border: 2px solid #ffffff;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

export const Entrar = styled.Text`
  font-size: 20px;
  color: #ffffff;
  font-weight: 700;
`;

export const ConteudoInputErros = styled.View`
  width: 100%;
  gap: 7px;
`;

export const TextoErros = styled.Text`
  font-size: 14px;
  color: red;
`;
