//hook useState que representa os estados da nossa aplicação
import { useState } from "react";

// componentes do próprio react native sendo:

// TouchableWithoutFeedback = torna nossa tela um botão que nos retorna um feedback,
// em nosso caso queremos apenas que ele dasabilite nosso teclado;

// Keyboard = esse componente tem as propriedades
// do nosso teclado inclusive a fução para que ele seja desabilitado.

// KeyboardAvoidingView = garante que o comportamento do teclado quando aberto seja semelhante ou igual em ambas plataformas(Android e IOS)

import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";

//aqui seria a biblioteca de icones ja embutido no proprio expo
//este é o link para ficar mais facil a busca por algum icone: https://icons.expo.fyi/Index
import { Entypo } from "@expo/vector-icons";

//essa biblioteca serve para fazermos validações em nossos campos, em nosso caso email e senha.
import * as yup from "yup";

//aqui são nossos componentes de estilo da nosso interface criado através do styled-components
import {
  CaixaPrincipal,
  ConteudoInput,
  InputEmail,
  InputSenha,
  TituloDaPagina,
  VerSenha,
  BotaoEntrar,
  Entrar,
  ConteudoInputErros,
  TextoErros,
} from "./style";

//aqui é iniciado nossa função principal de login,
//ela retorna nossa interface fazendo com que seja exibida em nosso celular
export const Login = () => {
  //esse é nosso estado booleano que é resposável por mostrar ou não nossa senha.
  const [temSenha, setTemSenha] = useState(false);

  //este estado é responsavel por ter os dados de nosso formulario,
  //ele nada mais é que um estado do tipo objeto = {}
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  //este estado é responsavel por armazenar os erros gerados em nosso formulario caso seus dados estejam errados,
  //ele nada mais é que um estado do tipo objeto = {}
  const [errors, setErrors] = useState({
    email: "",
    senha: "",
  });

  //aqui fazemos o uso da bibliotteca yup para criarmos um objeto de validação com regras
  //onde email e senha são strings = "" e ambos são obrigatórios
  const loginScheme = yup.object({
    email: yup.string().required("E-mail é obrigatorio"),
    senha: yup.string().required("Senha é obrigatoria"),
  });

  //Aqui temos nossa função para enfim fazermos a autenticação quando clicar no BotaoEntrar
  //ela é uma função assincrona que tem que esperar um tempinho para ser executada(isso depende muito de nossa api quando tivermos uma para ser requisitada)
  const handleLogin = async () => {
    try {
      //aqui chamamos o esquema de validação para que ele faça validação dos dados aramazenados em formiData
      //abortEarly é um booleano que faz com que evite que a validação fique em loop infinito
      await loginScheme.validate(formData, { abortEarly: false });
    } catch (err) {
      // aqui é um caso de erro em nosso formulário, começamos instanciando a variavel
      // err com os erros gerados no yup que é quando as regras de cada variavel dentro do objeto
      // não é atigida, depois criamos uma variavel local para armazenar essas mensagens de erros,
      // em seguida pegamos o erro e fazermos um forEach para que ele percorra todos os erros e separe eles
      // de forma que possamos identificar qual de nosso campos esta dando erro, e ai fazemos com que nossa variavel local
      // receba as mensagens de erros geradas, e por fim colocamos essa variavel local que recebeu todas essas informações dentro
      // da função errors que faz com que ela atualiza o estado da variaval de estado errors.
      if (err instanceof yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });

        setErrors(errorMessages);
        console.log(errorMessages);
      }
    }
  };

  //   esta função serve para que possamos atualizar os estados tanto dos dados do formulario como de erros
  //   nesta função usamos squad operator = ... que faz com peguemos tudo que ja tem dentro de nossas variaveis
  //   paragarantir que só atualizamos o que realmente é necessario, depois usamos uma key para identificar qual dado estamos atualizando:
  //   nos de erros apenas limpamos o erro quando o input esta vazio, nos dados do usuario passamos o valor que digitamos em nosso input para ele ser atualizado
  const setFormDataValue = (key, value) => {
    setErrors({ ...errors, [key]: "" });
    setFormData({ ...formData, [key]: value });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <CaixaPrincipal>
          <TituloDaPagina>Login</TituloDaPagina>

          <ConteudoInputErros>
            {/* input que ira receber as informações de email */}
            <InputEmail
              //aqui estamos passado a mensagens de erros tranformando ela em booleano = !! antes da string transforma em booleano,
              //e faz com que ative o feedback de erros
              erro={!!errors.email}
              placeholder="E-mail"
              placeholderTextColor="#000"
              value={formData.email}
              onChangeText={(value) => setFormDataValue("email", value)}
            />
            {/* o texto de erros só ira aparecer se houver algum erro, caso contrario ele não aparece */}
            {errors.email && <TextoErros>{errors.email}</TextoErros>}
          </ConteudoInputErros>

          <ConteudoInputErros>
            {/* input que ira receber as informações de senha 
            aqui estamos passado a mensagens de erros tranformando ela em booleano = !! antes da string transforma em booleano, 
            e faz com que ative o feedback de erros*/}
            <InputSenha erro={!!errors.senha}>
              <ConteudoInput
                placeholder="Senha"
                //esta propriedade serve para esconder a senha quando ela é verdadeira
                //aqui também invertemos o estado de nossa variavel booleana pois ela inicia como false
                secureTextEntry={!temSenha}
                value={formData.senha}
                onChangeText={(value) => setFormDataValue("senha", value)}
              />
              {/* aqui é o nosso botão responsavel por mostrar a senha ou não mostrar
              ele faz isso invertendo o valor de nosso estado itemSenha, por padrão iniciamos esta 
              variavel como false, ou seja, negativo então se invertemos o estado ela fica true, ou seja, positivo e mostra a senha
              caso contrario não mostra */}
              <VerSenha onPress={() => setTemSenha(!temSenha)}>
                {/* aqui temos o icone de olho aberto = eye e olho fechado = eye-with-line, 
                se temSenha tiver um valor verdadeiro ele aparece com o olho aberto isso significa que
                podemos ver nossa senha, se o valor for negativo, ou seja, false então aparece o olho fechado e não podemos ver a senha */}
                <Entypo
                  name={temSenha ? "eye" : "eye-with-line"}
                  size={24}
                  color="black"
                />
              </VerSenha>
            </InputSenha>
            {/* o texto de erros só ira aparecer se houver algum erro, caso contrario ele não aparece */}
            {errors.senha && <TextoErros>{errors.senha}</TextoErros>}
          </ConteudoInputErros>

          {/* botao entrar ira executar nossa função para fazer o login, ou seja, nossa autenticação  */}
          <BotaoEntrar onPress={handleLogin}>
            <Entrar>Entrar</Entrar>
          </BotaoEntrar>
        </CaixaPrincipal>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
