import React, { useContext, useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import useSound from 'use-sound';
import config from '../../../config';
import LatestMessagesContext from '../../../contexts/LatestMessages/LatestMessages';
import TypingMessage from './TypingMessage';
import Header from './Header';
import Footer from './Footer';
import Message from './Message';
import initialBottyMessage from '../../../common/constants/initialBottyMessage';
import '../styles/_messages.scss';

const socket = io(
  config.BOT_SERVER_ENDPOINT,
  { transports: ['websocket', 'polling', 'flashsocket'] }
);

const ME = 'me';

function Messages() {
  const [playSend] = useSound(config.SEND_AUDIO_URL,{ id: 'send', volume: 0.25 });
  const [playReceive] = useSound(config.RECEIVE_AUDIO_URL,{ id: 'receive', volume: 0.25 });
  const { setLatestMessage } = useContext(LatestMessagesContext);
  const messagesEndRef = useRef();
  const [isTyping, setIsTyping] = useState(false);
  const [message, setMessage] = useState();
  const [messages, setMessages] = useState([]);

  const onChangeMessage = (msg) => {
    setMessage(msg.target.value);
  }

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  const addMessage = (msg, user)=>{
    setMessages((s) => ([...s, { message: msg, id: Date.now(), user }]));
    if(user === ME){playSend();}else{playReceive();}
    setLatestMessage('bot', msg)
  }

  const sendMessage = () => {
    socket.emit("user-message", message);
    addMessage(message, 'me');
    
  }

  useEffect(() => {

    addMessage(initialBottyMessage, 'bot');

    socket.on('bot-typing', () => {
      setIsTyping(true);
    })

    socket.on('bot-message', (msg) => {
      setIsTyping(false);
      addMessage(msg, 'bot');
    });

    return () => {
      socket.close();
    }
  }, [])

  useEffect(() => {
    scrollToBottom();
  },[isTyping, messages])

  return (
    <div className="messages">
      <Header />
      <div className="messages__list" id="message-list">
        {messages.map((m) => <Message key={m.id} message={m} />)}
        {isTyping && <TypingMessage />}
        <div ref={messagesEndRef} />
      </div>
      <Footer message={message} sendMessage={sendMessage} onChangeMessage={onChangeMessage} />
    </div>
  );
}

export default Messages;
