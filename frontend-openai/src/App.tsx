//import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  //const [response, setResponse] = useState("");
  async function testAPI() {
    const testPrompt = "Hi, Nice to meet you";
    const response = await axios.get("http://localhost:4000/request", {
      params: {
        prompt: testPrompt,
      },
    });
    console.log(response.data);
    //setResponse(response.data);
  }

  return (
    <div>
      <h1>Hello World</h1>
      <button onClick={() => testAPI()}>Test API</button>
    </div>
  );
}

export default App;
