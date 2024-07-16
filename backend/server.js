import axios from "axios";
import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
dotenv.config();



const API_KEY = process.env.API_KEY;
const openai = new OpenAI({apiKey: API_KEY});

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 4000;

//Help function for handling making a request to API
async function makeRequest(prompt) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "prompt" }],
      model: "gpt-3.5-turbo",
    });
    console.log(completion.choices[0]);
    
  }
  catch (error) {
    console.error(error.name, error.message);
  }
}

//Gets prompt input from client, makes request and handles response.
app.get('/request', async (req, res) => {
  const { prompt } = req.query;
  await makeRequest(prompt);
  res.status(200).json({ message: "Request processed successfully." });
  
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})

//Test function to see if the API is working.
async function test(){
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful assistant." }],
      model: "gpt-3.5-turbo",
    });
    console.log(completion.choices[0]);
  }
  catch (error) {
    console.error(error.name, error.message);
  }
  
}

test();

