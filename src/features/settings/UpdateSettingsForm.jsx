import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Label from "../../ui/Label";
import useSettings from "./useSettings";
import Spinner from "../../ui/Spinner";
import useUpdateSettings from "./useUpdateSettings";

function UpdateSettingsForm() {
  const {
    isGetting,
    settings: {
      maxBookingLength,
      minBookingLength,
      breakfastPrice,
      maxGuestsPerBooking,
    } = {}, // initialise {} is not fetched yet
  } = useSettings();

  const { isUpdating, updateSettingsFunc } = useUpdateSettings();

  function handleUpdate(e, field) {
    const { value } = e.target;
    if (!value) return;
    updateSettingsFunc({ [field]: value });
  }

  if (isGetting) return <Spinner />;
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Label>Minimum Nights </Label>
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Label>Maximum Nights </Label>

        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Label>Maximum guests </Label>

        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Label>Breakfast Price</Label>

        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
