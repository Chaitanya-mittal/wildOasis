import styled from "styled-components";
import { format, isToday } from "date-fns";
import Menus from "../../ui/Menus";
import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import {
  HiArrowUpOnSquare,
  HiEllipsisVertical,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { HiArrowDownOnSquare } from "react-icons/hi2";
import useCheckout from "../check-in-out/useCheckout";
import Spinner from "../../ui/Spinner";
import useDeleteBooking from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  const { checkout, isCheckingout } = useCheckout();
  const { deleteBookingFunc, isDeleting } = useDeleteBooking();

  const navigate = useNavigate();

  function handleCheckOut() {
    checkout(bookingId);
  }
  function handleDeleteBooking() {
    deleteBookingFunc(bookingId);
  }

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle opens={bookingId}>
            <HiEllipsisVertical />
          </Menus.Toggle>
          <Menus.List name={bookingId}>
            <Menus.Button onClick={() => navigate(`/bookings/${bookingId}`)}>
              <HiEye /> See Details
            </Menus.Button>
            {status === "unconfirmed" && (
              <Menus.Button onClick={() => navigate(`/checkin/${bookingId}`)}>
                <HiArrowDownOnSquare /> Check in
              </Menus.Button>
            )}
            {status === "checked-in" && (
              <Menus.Button
                onClick={() => handleCheckOut()}
                disabled={isCheckingout}
              >
                <HiArrowUpOnSquare /> Check out
              </Menus.Button>
            )}
            <Modal.Open opens="confirmDelete">
              <Menus.Button>
                <HiTrash /> Delete Booking
              </Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>
        <Modal.Window name="confirmDelete">
          <ConfirmDelete
            onConfirm={handleDeleteBooking}
            resourceName={`Booking ${bookingId}`}
            disabled={isDeleting}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
