import AutoSaveFormWithoutHook from "@/components/AutoSaveFormWithoutHook";

const page = () => {
  return (
    <div className="container min-h-[70vh] mx-auto px-6">
      <h1 className="text-2xl font-semibold my-8">
        AutoSave Without Hook Example
      </h1>
      <AutoSaveFormWithoutHook />
    </div>
  );
};

export default page;
