import { useContext } from 'react';
import CartContext from '../../../store/CartContext.tsx';
import UserProgressContext from '../../../store/UserProgressContext.tsx';
import Input from '../Input/Input.tsx';
import Button from '../Button/Button.tsx';
import Modal from '../Modal/Modal.tsx';
import { currencyFormatter } from '../../../utils/formatting.ts';
import useHttp from '../../../hooks/useHttp.ts';
import Error from '../../Error/Error.tsx';

const requestConfig = {
  method: 'POST' as const,
  headers: {
    'Content-Type': 'application/json',
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp('http://localhost:3000/orders', requestConfig, null);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fd = new FormData(event.target as HTMLFormElement);
    const customerData = Object.fromEntries(fd.entries());
    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleFinish}>
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>We will get back to you with more details via email within the next few minutes.</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && <Error title="Failed to submit order" message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
