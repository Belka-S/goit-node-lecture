export const Chat = ({ items }) => {
  const chatMessages = items.map(({ message, id, type, nickName }) => {
    const chatMessage = `${nickName} - ${message}`;
    return type === 'yourMessage' ? <h3 key={id}>{chatMessage}</h3> : <p key={id}>{chatMessage}</p>;
  });
  return <div>{chatMessages}</div>;
};
