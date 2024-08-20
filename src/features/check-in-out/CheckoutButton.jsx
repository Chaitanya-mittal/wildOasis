import Button from "../../ui/Button";
import useCheckout from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingout } = useCheckout();

  function handleCheckout() {
    checkout(bookingId);
  }
  return (
    <Button
      variation="primary"
      disabled={isCheckingout}
      onClick={handleCheckout}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
