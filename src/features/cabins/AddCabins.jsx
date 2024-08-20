import CreateCabinForm from "./CreateCabinForm";

import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
function AddCabins() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button variations="primary" sizes="medium">
          Add new Cabin
        </Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
    // <>
    //   <Button variations="primary" sizes="medium" onClick={handleCreateCabin}>
    //     {openModal ? "Close" : "Add new Cabin"}
    //   </Button>

    //   {openModal && (
    //     <Modal closeModal={() => setOpenModal(false)}>
    //       <CreateCabinForm handleForm={handleCreateCabin} />
    //     </Modal>
    //   )}
    // </>
  );
}

export default AddCabins;
