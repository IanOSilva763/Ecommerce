import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CartProvider } from './CarrinhoContexto';
import TelaAdm from './Telas/TelaAdm';
import TelaCadastro from './Telas/TelaCadastro';
import TelaCarrinho from './Telas/TelaCarrinho';
import TelaDashboard from './Telas/TelaDashboard';
import TelaEditProduto from './Telas/TelaEditProduto';
import TelaInicial from './Telas/TelaInicial';
import TelaLogin from './Telas/TelaLogin';
import TelaProduto from './Telas/TelaProduto';

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
            })}
          />
          <Stack.Screen name="Cadastro" component={TelaCadastro} />
          <Stack.Screen name="Inicio" component={TelaInicial} />
          <Stack.Screen name="Produto" component={TelaProduto} />
          <Stack.Screen name="Admin" component={TelaAdm} />
          <Stack.Screen name="EditProduto" component={TelaEditProduto} />
          <Stack.Screen name="Carrinho" component={TelaCarrinho} />
          <Stack.Screen name="Dashboard" component={TelaDashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
