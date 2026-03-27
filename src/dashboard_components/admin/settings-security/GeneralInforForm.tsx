import FormField from "./FormField";
import FormSelect from "./FormSelect";

function GeneralInfoForm() {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-5 mb-8">
      <FormField  label="Platform Name"  defaultValue="Gustavo Xavier" />
      <FormField  label="Support Email"  defaultValue="yoursilentwhistle@email.com" />
      <FormField  label="Website"        defaultValue="www.cinact@gmail.com" />
      <FormField  label="Phone"          defaultValue="(225) 555-0118" />
      <FormSelect label="Language"       options={["English", "Spanish", "French"]} defaultValue="English" />
      <FormField  label="Address"        defaultValue="1901 Thornridge Cir. Shiloh, Hawaii 81063" />
    </div>
  );
}
export default GeneralInfoForm;