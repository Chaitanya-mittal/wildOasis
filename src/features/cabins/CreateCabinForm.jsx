import styled from "styled-components";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import useCreateCabins from "./useCreateCabins";
import useEditCabins from "./useEditCabins";
import Label from "../../ui/Label";
export const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ handleForm, editSession = {} }) {
  const isEditSession = Boolean(editSession?.id);
  const { isCreating, createCabinFunc } = useCreateCabins();
  const { isEditing, editCabinFunc } = useEditCabins();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: isEditSession ? editSession : {} });

  function handleOnSubmit(data) {
    // handle creating and editing a cabin
    if (isEditSession) {
      //1.edit session
      //2. check if image is changed or not and pass accordingly
      let imageField;
      if (typeof data.image === "string") {
        imageField = data.image;
      } else {
        imageField = data.image[0];
      }
      editCabinFunc(
        { ...data, image: imageField },
        {
          onSuccess: () => {
            handleForm();
          },
        }
      );
    } else {
      //create session
      createCabinFunc(
        { ...data, image: data.image[0] },
        {
          onSuccess: () => {
            reset();
            handleForm();
          },
        }
      );
    }
    // createCabinFunc(data);
  }
  return (
    <Form
      onSubmit={handleSubmit(handleOnSubmit)}
      type={`${handleForm ? "modal" : "regular"}`}
    >
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "Please enter a cabin name.",
          })}
        />
        {errors?.name && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "Please enter maximum capacity of the cabin.",
            min: {
              value: 0,
              message: "Maximum Capacity must be greater than 0.",
            },
          })}
        />
        {errors?.maxCapacity && <Error>{errors.maxCapacity.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "Please enter  regular price of the cabin.",
            min: {
              value: 0,
              message: "Regular price must be greater than 0.",
            },
          })}
        />
        {errors?.regularPrice && <Error>{errors.regularPrice.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "Please enter discount",
            min: {
              value: 0,
              message: "Discount must be 0 or more",
            },
          })}
        />
        {errors?.discount && <Error>{errors.discount.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for cabin</Label>
        <Textarea
          type="text"
          id="description"
          defaultValue=""
          {...register("description")}
        />
        {errors?.discription && <Error>{errors.description.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? null : "Please provide cabin Image",
          })}
        />
        {errors?.image && <Error>{errors.image.message}</Error>}
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variations="secondary"
          type="reset"
          sizes="medium"
          onClick={handleForm}
        >
          Cancel
        </Button>
        <Button type="submit" sizes="medium" disabled={isEditing || isCreating}>
          Submit
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
