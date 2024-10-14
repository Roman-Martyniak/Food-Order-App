import Header from './components/Header/Header.tsx';
import Meals from './components/Meals/Meals.tsx';
import Cart from './components/UI/Cart/Cart.tsx';
import { CartContextProvider } from './store/CartContext.tsx';
import { UserProgressContextProvider } from './store/UserProgressContext.tsx';

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
