import Header from './components/Header/Header.tsx';
import Meals from './components/Meals/Meals.tsx';
import { CartContextProvider } from './store/CartContext.tsx';

function App() {
  return (
    <CartContextProvider>
      <Header />
      <Meals />
    </CartContextProvider>
  );
}

export default App;
