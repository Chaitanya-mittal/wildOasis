import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Modal from "../../ui/Modal";
import { useMoveBack } from "../../hooks/useMoveBack";
// import { useParams } from "react-router-dom";
import useBooking from "./useBooking";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import { useNavigate } from "react-router-dom";
import CheckoutButton from "../check-in-out/CheckoutButton";
import useDeleteBooking from "./useDeleteBooking";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking = {}, loadingBooking } = useBooking();
  const navigate = useNavigate();
  const moveBack = useMoveBack();
  // const status = "checked-in";
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const { deleteBookingFunc, isDeleting } = useDeleteBooking();
  if (loadingBooking || isDeleting) return <Spinner />;
  if (!booking?.id) return <Empty resource="Booking"></Empty>;
  const { status, id: bookingId } = booking;
  // console.log(status);
  function handleDeleteBooking() {
    deleteBookingFunc(bookingId, {
      onSuccess: () => navigate("/bookings"),
      onError: () => navigate("/bookings"),
    });
  }
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", "")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <Modal>
        <ButtonGroup>
          {status === "unconfirmed" && (
            <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
              Check in
            </Button>
          )}
          {status === "checked-in" && <CheckoutButton bookingId={bookingId} />}
          <Modal.Open opens="confirmDelete">
            <Button variations="danger">Delete Booking</Button>
          </Modal.Open>
          <Button variations="secondary" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>
        <Modal.Window name="confirmDelete">
          <ConfirmDelete
            onConfirm={handleDeleteBooking}
            disabled={isDeleting}
            resourceName={`Booking ${bookingId}`}
          />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default BookingDetail;
