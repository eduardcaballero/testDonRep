import React, { useRef } from 'react';

const RETURN_KEY_CODE = 13;

export default function Footer({ sendMessage, onChangeMessage, message }) {
  const msgRef = useRef()
  const onKeyDown = ({ keyCode }) => {
    if (keyCode !== RETURN_KEY_CODE) { return; }

    sendMsg();
  }

  const sendMsg = () => {
    msgRef.current.value = '';
    sendMessage();
  }

  return (
    <div className="messages__footer">
      <input
        ref={msgRef}
        onKeyDown={onKeyDown}
        placeholder="Write a message..."
        id="user-message-input"
        onChange={onChangeMessage}
        autocomplete="off"
      />
      <div className="messages__footer__actions">
        <i className="far fa-smile" />
        <i className="fas fa-paperclip" />
        <i className="mdi mdi-ticket-outline" />
        <button onClick={sendMsg} disabled={!message}>Send</button>
      </div>
    </div>
  );
}
