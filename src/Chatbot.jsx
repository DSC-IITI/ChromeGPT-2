import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Style from './Chatbot.module.css'

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [messages, setMessages] = useState([]);


  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await model.generateContent(input);
    const responseText = result.response.text();
    setMessages([...messages, { user: false, message: input }, { user: true, message: responseText }]);
    setInput('');
  };

  const handleKeyPress = (event) => {

    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  return (
    <div className={Style.chatbot}>
      <div className={Style.messages}>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.user ? `${Style.user}` : `${Style.bot}`}`}>
            {message.message}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatbot;