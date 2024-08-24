import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Label from "../../ui/Label";

import useUpdateUser from "./useUpdateUser";
import { Error } from "../../ui/Error";
function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ password }) {
    updateUser({ password }, { onSuccess: () => reset() });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="password">Password (min 8 characters)</Label>

        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
        {errors?.password && <Error>{errors.password.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="passwordConfirm">Confirm Password</Label>

        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
        {errors?.passwordConfirm && (
          <Error>{errors.passwordConfirm.message}</Error>
        )}
      </FormRow>
      <FormRow>
        <Button onClick={reset} type="reset" variations="secondary">
          Cancel
        </Button>
        <Button>Update password</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
