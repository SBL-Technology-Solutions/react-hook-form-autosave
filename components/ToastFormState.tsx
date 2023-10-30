import { type FieldValues } from "react-hook-form";

export const ToastFormState = <T extends FieldValues>({
  formState,
}: {
  formState: T;
}) => {
  return (
    <div className="flex flex-col gap-2 text-sm">
      {/* loop over each key of formState */}
      {Object.entries(formState).map(([key, value]) => (
        <span key={key}>
          {/* capitalize the first letter of the key */}
          {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
        </span>
      ))}
    </div>
  );
};
