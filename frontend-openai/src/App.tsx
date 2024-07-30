import { useRef, useState } from "react";
import axios from "axios";

type aiMessage = {
  prompt: string;
  answer: string[];
};

function App() {
  const [responses, setResponses] = useState<aiMessage[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function makePrompt(prompt: string) {
    console.log(prompt);
    const response = await axios.get("http://localhost:4000/request", {
      params: {
        prompt: prompt,
      },
    });
    //console.log(response.data.answer.split("\n"));
    setResponses([
      ...responses,
      { prompt: prompt, answer: response.data.answer.split("\n") },
    ]);
  }

  function handleSubmit() {
    if (currentPrompt === "") {
      setErrorMessage("Please enter a prompt.");
      setTimeout(() => setErrorMessage(""), 2000);
      return;
    }
    makePrompt(currentPrompt);
    setCurrentPrompt("");
  }

  return (
    <div className="flex flex-col gap-5 items-center border-2  w-[600px] m-auto py-10 my-10 rounded-xl bg-stone-100">
      <h1 className="font-bold text-3xl text-stone-950">AI Chatbot</h1>
      <div className=" flex justify-center flex-col items-center gap-2">
        <div className="flex flex-col gap-5 overflow-y-auto h-[500px] w-[500px] rounded-lg bg-white font-semibold text-stone-950 items-start p-5 text-sm shadow-stone-950 shadow-sm">
          {responses.length !== 0 ? (
            responses.map((response) => (
              <div
                className="shadow-inner flex flex-col gap-2 "
                key={responses.indexOf(response)}
              >
                <p className="bg-stone-200 p-2 inline-block rounded-md shadow-sm shadow-stone-950">
                  {response.prompt}
                </p>
                <div className=" p-2 inline-block rounded-md shadow-sm shadow-stone-950">
                  {response.answer.map((item: string) => (
                    <p className="py-1" key={item}>
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className=" flex flex-col items-start gap-2">
              <p className="bg-stone-200 shadow-sm shadow-stone-950 rounded-lg p-3">
                Welcome!
              </p>
              <p className="bg-stone-200 shadow-sm shadow-stone-950 rounded-lg p-3">
                What can I help you with today?
              </p>
            </div>
          )}
        </div>
        <div className="h-6 w-full">
          {errorMessage && (
            <span className="text-red-500 font-semibold items-start flex justify-start px-8">
              {errorMessage}
            </span>
          )}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex px-5 gap-10"
        >
          <input
            className="p-3 text-black rounded-lg font-semibold w-96 shadow-sm shadow-stone-950"
            type="text"
            placeholder="Enter your prompt"
            value={currentPrompt}
            onChange={(e) => setCurrentPrompt(e.target.value)}
          />
          <button
            className="bg-white shadow-sm shadow-stone-950 text-stone-950 font-semibold rounded-lg w-20 hover:bg-stone-950 hover:text-stone-100"
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
