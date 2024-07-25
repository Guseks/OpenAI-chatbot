import { useState } from "react";
import axios from "axios";

function App() {
  const [responses, setResponses] = useState<string[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState("");

  async function makePrompt(prompt: string) {
    console.log(prompt);
    const response = await axios.get("http://localhost:4000/request", {
      params: {
        prompt: prompt,
      },
    });
    console.log(response.data);
    setResponses([...responses, response.data.answer]);
  }

  return (
    <div className="flex flex-col gap-5 items-center border-2  w-[600px] m-auto py-10 my-10 rounded-xl bg-stone-100">
      <h1 className="font-bold text-3xl text-stone-950">AI Chatbot</h1>
      <div className=" flex justify-center flex-col items-center gap-5">
        <div className="flex flex-col gap-5 overflow-y-auto h-[500px] w-[500px] rounded-lg bg-white font-semibold text-stone-950 items-start p-10 text-sm shadow-stone-950 shadow-sm">
          <h2 className="text-xl border-b-2 w-full border-stone-950">
            Responses from AI bot
          </h2>
          {responses.length !== 0 ? (
            responses.map((response) => (
              <p key={responses.indexOf(response)}>{response}</p>
            ))
          ) : (
            <div className=" flex flex-col items-start">
              <p>Welcome!</p>
              <p>What can I help you with today?</p>
            </div>
          )}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            makePrompt(currentPrompt);
          }}
          className="flex px-5 gap-10"
        >
          <input
            className="p-3 text-black rounded-lg font-semibold w-96 shadow-sm shadow-stone-950"
            type="text"
            placeholder="Enter your prompt"
            onChange={(e) => setCurrentPrompt(e.target.value)}
          />
          <button
            className="bg-white shadow-sm shadow-stone-950 text-stone-950 font-semibold rounded-lg w-20 hover:shadow-blue-700 hover:bg-stone-50"
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
