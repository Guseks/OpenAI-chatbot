import LoadingSpinner from "./components/LoadingSpinner";
import useChatbot from "./hooks/useChatbot";

function App() {
  const {
    responses,
    currentPrompt,
    setCurrentPrompt,
    errorMessage,
    handleSubmit,
    loading,
  } = useChatbot();

  return (
    <div className="flex flex-col gap-5 items-center border-2  w-[700px] m-auto py-10 my-10 rounded-xl bg-stone-100">
      <div className=" h-12 w-5/6 justify-between flex items-center">
        <h1 className="font-bold text-3xl text-stone-950">AI Chatbot</h1>
        <div className="flex justify-center items-center w-12">
          {loading && <LoadingSpinner />}
        </div>
      </div>

      <div className=" flex justify-center flex-col items-center gap-4">
        <div className="flex flex-col gap-5 overflow-y-auto h-[500px] w-[600px] rounded-lg bg-white font-semibold text-stone-950 items-start p-5 text-sm shadow-stone-950 shadow-sm">
          {responses.length !== 0 ? (
            responses.map((response) => (
              <div
                className="shadow-inner flex flex-col gap-2 "
                key={responses.indexOf(response)}
              >
                <p className="bg-stone-300 p-2 inline-block rounded-md shadow-sm shadow-stone-950">
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
        <div className="h-6 w-full">
          {errorMessage && (
            <span className="text-red-500 font-semibold items-start flex justify-start px-8">
              {errorMessage}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
