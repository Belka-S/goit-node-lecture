import { useState } from 'react';

export const ChatForm = ({ onSubmit }) => {
  const [message, setMessage] = useState({ message: '' });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setMessage(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...message });
    setMessage({ message: '' });
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} type="text" name="message" placeholder="Message" />
      <button type="submit">Send</button>
    </form>
  );
};
