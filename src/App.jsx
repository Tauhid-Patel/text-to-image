import { Configuration, OpenAIApi } from "openai";

import { useState } from 'react';
import './App.css'

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState(
    "Bears with Paint Brushes the Starry Night, painted by Vincent Van Gogh.."
  );
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    setPlaceholder(`Search ${prompt}..`);
    setLoading(true);
    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512",
    });
    setLoading(false);
    setResult(res.data.data[0].url);
  };
  return (
    <div className="App">
      {loading ? (
        <>
          <h2>Generating..Please Wait..</h2>
        </>
      ) : (
        <>
        <div className="App-main">
          <h2>What is it that you desire ?</h2>
          <h4>Generate images using OpenAI, a text-to-image web based application<br />
          to generate images as you wish</h4>
          <div className="together">
          <textarea
            className="app-input"
            placeholder={placeholder}
            onChange={(e) => setPrompt(e.target.value)}
            rows="10"
            cols="20"
          />
          <button
          className="cta-btn" 
          onClick={generateImage}>ABRA CADABRAA 🔮</button>
          </div>

          {result.length > 0 ? (
            <img className="result-image" src={result} alt="result" />
          ) : (
            <></>
          )}
          </div>
        </>
      )}
    </div>
  );
}

export default App