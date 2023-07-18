import { useState } from 'react';

export const NameForm = ({ onSubmit }) => {
  const [nickName, setNickName] = useState({ nickName: '' });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setNickName(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...nickName });
    setNickName({ nickName: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} type="text" name="nickName" placeholder="NickName" />
      <button type="submit">Submit</button>
    </form>
  );
};
