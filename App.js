import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native';
import { CartProvider } from './CarrinhoContexto';
import TelaProduto from './Telas/TelaProduto';
import TelaAdm from './Telas/TelaAdm';
import TelaCadastro from './Telas/TelaCadastro';
import TelaInicial from './Telas/TelaInicial';
import TelaLogin from './Telas/TelaLogin';
import TelaPedido from './Telas/TelaPedido';

const Stack = createStackNavigator();

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen
            name="Login"
            component={TelaLogin}
            options={({ navigation }) => ({
              title: 'Login',
              headerRight: () => (
                <Button
                  onPress={() => navigation.navigate('Cadastro')}
                  title="Cadastro"
                  color="#000"
                />
              ),
            })}
          />
          <Stack.Screen name="Cadastro" component={TelaCadastro} />
          <Stack.Screen name="Inicio" component={TelaInicial} />
          <Stack.Screen name="Produto" component={TelaProduto} />
          <Stack.Screen name="Pedido" component={TelaPedido} />
          <Stack.Screen name="Admin" component={TelaAdm} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
