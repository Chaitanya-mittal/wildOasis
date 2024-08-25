import Button from "../../ui/Button";
import useCheckout from "./useCheckout";
import { Link } from "react-router-dom";
function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingout } = useCheckout();

  function handleCheckout() {
    checkout(bookingId);
  }
  return (
    <Button
      sizes="small"
      variations="primary"
      disabled={isCheckingout}
      as={Link}
      onClick={handleCheckout}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
