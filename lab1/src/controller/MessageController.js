import {useState} from 'react';

import Message from '../model/Message';
import MessageModel from '../model/MessageModel';
import MessageList from '../view/MessageList';

const MessageController = () => {
  const [messages, setMessages] = useState(MessageModel);
  const [author, setAuthor] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [messageInputStyle, setMessageInputStyle] = useState({});

  const clearForm = () => {
    setMessageInputStyle({});
    setNewMessage('');
    setAuthor('');
  }

  const addMessage = () => {
    if (!newMessage) {
      setMessageInputStyle({
        borderColor: 'red'
      });

      return;
    }

    const newMessageId = Math.random().toString().slice(-8);

    setMessages((oldMessageData) => {
      // This is a workaround for the setting the state.
      // React calls the state setter twice to make sure it was properly set,
      // so we need to make sure the duplicate element is not added.
      const existingMessage = oldMessageData.find((message) => message.id === newMessageId);

      if (!existingMessage) {
        oldMessageData.push(new Message(newMessageId, newMessage, author));
      }

      return oldMessageData;
    });

    clearForm();
  };

  return (
    <>
      <MessageList data={messages} />

      <div className="message-form">
        <input type='text' name='message' placeholder='Input your message' style={messageInputStyle}
          value={newMessage} onChange={(e) => {setNewMessage(e.target.value)}} />
        <input type='text' name='author' placeholder='Author name (optional)'
          value={author} onChange={(e) => {setAuthor(e.target.value)}} />

        <button onClick={addMessage}>Submit</button>
        <button onClick={clearForm}>Clear form</button>
      </div>
    </>
  )
};

export default MessageController;
