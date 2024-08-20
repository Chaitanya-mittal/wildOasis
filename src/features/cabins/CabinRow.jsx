import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";

import { HiTrash } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { FaCopy } from "react-icons/fa";
import { HiMiniPencil } from "react-icons/hi2";
import CreateCabinForm from "./CreateCabinForm";
import Row from "../../ui/Row";
import useDeleteCabin from "./useDeleteCabin";
import useCreateCabins from "./useCreateCabins";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { isCreating, createCabinFunc } = useCreateCabins();
  const { isDeleting, handleDeleteCabin } = useDeleteCabin();

  const { name, maxCapacity, regularPrice, discount, image, id } = cabin;

  function handleDuplicateCabin() {
    const newCabin = {
      name: `Duplicate of ${name}`,
      image,
      maxCapacity,
      regularPrice,
      discount,
    };
    createCabinFunc(newCabin);
  }
  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} People</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount === 0 ? (
        <span>&mdash;</span>
      ) : (
        <Discount>{formatCurrency(discount)}</Discount>
      )}
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle opens={id} />
            <Menus.List name={id}>
              <Modal.Open opens="delete">
                <Menus.Button>
                  <HiTrash /> Delete
                </Menus.Button>
              </Modal.Open>
              <Modal.Open opens="edit">
                <Menus.Button>
                  <HiMiniPencil /> Edit
                </Menus.Button>
              </Modal.Open>

              <Menus.Button
                onClick={handleDuplicateCabin}
                disabled={isCreating}
              >
                <FaCopy /> Duplicate
              </Menus.Button>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateCabinForm editSession={cabin} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="cabin"
                onConfirm={() => handleDeleteCabin(id)}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
