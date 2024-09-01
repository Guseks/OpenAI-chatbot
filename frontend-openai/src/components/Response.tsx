type aiMessage = {
  prompt: string;
  answer: string[];
};

type ResponseProps = {
  response: aiMessage;
};

const Response = ({ response }: ResponseProps) => {
  return (
    <div className="shadow-inner flex flex-col gap-2 ">
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
  );
};

export default Response;
