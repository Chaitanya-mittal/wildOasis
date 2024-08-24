import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Label from "../../ui/Label";
import { Error } from "../cabins/CreateCabinForm";
import useSignup from "./useSignup";
import SpinnerMini from "../../ui/SpinnerMini";
import { useNavigate } from "react-router-dom";
// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const navigate = useNavigate();
  const { signupFunc, isSigning } = useSignup();
  function onSubmit(data) {
    signupFunc(
      {
        email: data.email,
        fullName: data.fullname,
        password: data.password,
      },
      {
        onSettled: () => navigate("/dashboard"),
      }
    );
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          type="text"
          id="fullName"
          {...register("fullname", {
            required: "This is a required field",
          })}
        />
        {errors?.fullname && <Error>{errors.fullname.message}</Error>}
      </FormRow>

      <FormRow label="Email address">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "This is a required field",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please enter a valid email",
            },
          })}
        />
        {errors?.email && <Error>{errors.email.message}</Error>}
      </FormRow>

      <FormRow label="Password (min 8 characters)">
        <Label htmlFor="password">Password</Label>

        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "This is a required field",
            minLength: {
              value: 8,
              message: "Password must contain atleast 8 characters",
            },
          })}
        />
        {errors?.password && <Error>{errors.password.message}</Error>}
      </FormRow>

      <FormRow label="Repeat password">
        <Label htmlFor="passwordConfirm">Repeat Password</Label>

        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This is a required field",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
        />
        {errors?.passwordConfirm && (
          <Error>{errors.passwordConfirm.message}</Error>
        )}
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variations="secondary" type="reset">
          Cancel
        </Button>
        <Button type="submit" disabled={isSigning}>
          {isSigning ? <SpinnerMini /> : " Create new user"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
