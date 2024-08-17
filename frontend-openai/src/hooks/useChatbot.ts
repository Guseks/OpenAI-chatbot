import { useState } from 'react'
import axios from 'axios';

type aiMessage = {
  prompt: string;
  answer: string[];
};


const useChatbot = () => {
  const [responses, setResponses] = useState<aiMessage[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function makePrompt(prompt: string) {
    setLoading(true);
    try {
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
    } catch (error) {
      console.error("Error making prompt:", error);
      setErrorMessage("Failed to fetch response. Please try again.");
      setTimeout(() => setErrorMessage(""), 2000);
    }
    finally {
      setLoading(false);
    }
    
  }

  function handleSubmit() {
    if (currentPrompt === "") {
      setErrorMessage("Prompt cannot be empty.");
      setTimeout(() => setErrorMessage(""), 2000);
      return;
    }
    makePrompt(currentPrompt);
    setCurrentPrompt("");
  }

  return {
    responses,
    currentPrompt,
    setCurrentPrompt,
    errorMessage,
    handleSubmit,
    loading,
  }
}

export default useChatbot;