import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import useSettings from "../settings/useSettings";
import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useEffect, useState } from "react";
import useCheckin from "./useCheckin";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const [checkPaid, setCheckPaid] = useState(false); // initialise when booking laoded
  const [breakfastPaid, setBreakfastPaid] = useState(false);
  const { settings, isGetting: loadingSettings } = useSettings();
  const { booking, loadingBooking } = useBooking();
  const { checkin, isChecking } = useCheckin();
  useEffect(() => {
    if (booking?.hasPaid) setCheckPaid(booking.hasPaid);
    if (booking?.hasBreakfast) setBreakfastPaid(booking.hasBreakfast);
  }, [booking]);

  if (loadingBooking || isChecking || loadingSettings) return <Spinner />;
  if (!booking) return <Empty resource="booking"></Empty>;

  const {
    id: bookingId,
    guests,
    totalPrice,
    hasPaid,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    numGuests * numNights * settings.breakfastPrice;
  function handleCheckin() {
    if (!checkPaid) {
      return;
    }
    if (breakfastPaid) {
      checkin({
        bookingId,
        breakfast: {
          extrasPrice: optionalBreakfastPrice,
          hasBreakfast: true,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          checked={breakfastPaid}
          onChange={() => {
            setBreakfastPaid((p) => !p);
            setCheckPaid(false);
          }}
          id="breakfastPaid"
          disabled={hasPaid && hasBreakfast}
        >
          Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
        </Checkbox>
      </Box>
      <Box>
        <Checkbox
          checked={checkPaid}
          onChange={() => setCheckPaid((p) => !p)}
          disabled={checkPaid}
          id="checkPaid"
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {!breakfastPaid
            ? formatCurrency(totalPrice)
            : formatCurrency(totalPrice + optionalBreakfastPrice) +
              `(${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfastPrice)})`}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          variation="secondary"
          disabled={!checkPaid}
        >
          Check in booking #{bookingId}
        </Button>
        <Button variations="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
