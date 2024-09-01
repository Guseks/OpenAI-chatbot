import React from "react";

type UserInputProps = {
  handleSubmit: () => void;
  currentPrompt: string;
  setCurrentPrompt: React.Dispatch<React.SetStateAction<string>>;
};

const UserInput = ({
  handleSubmit,
  currentPrompt,
  setCurrentPrompt,
}: UserInputProps) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="flex w-full gap-5"
    >
      <input
        className="p-3 text-black rounded-lg font-semibold w-full shadow-sm shadow-stone-950"
        type="text"
        placeholder="Enter your prompt"
        value={currentPrompt}
        onChange={(e) => setCurrentPrompt(e.target.value)}
      />

      <button
        className="bg-white shadow-sm shadow-stone-950 text-stone-950 font-semibold rounded-lg w-24 hover:bg-stone-950 hover:text-stone-100"
        type="submit"
      >
        Send
      </button>
    </form>
  );
};

export default UserInput;
