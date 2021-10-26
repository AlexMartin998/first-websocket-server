'use strict';

const socket = io();

const online = document.querySelector('.online'),
  offline = document.querySelector('.offline'),
  hideText = document.querySelector('.hide-text'),
  chat = document.querySelector('.chat'),
  txtMessage = document.querySelector('.textMessage'),
  btnSend = document.querySelector('.btn-send');

socket.on('connect', () => {
  // console.log('Connected!');

  online.classList.remove('hide-text');
  offline.classList.add('hide-text');
});

socket.on('disconnect', () => {
  // console.log('Disconnected from Server');
  txtMessage.value = '';

  online.classList.add('hide-text');
  offline.classList.remove('hide-text');
});

socket.on('send-message-from-server', payload => {
  console.log(payload);
  // txtMessage.value = payload.message;
});

// // // DOM
document.addEventListener('DOMContentLoaded', () => {
  txtMessage.focus();
});

chat.addEventListener('submit', e => {
  e.preventDefault();
  if (txtMessage.value === '') return;

  const message = txtMessage.value;
  const payload = {
    message,
    uid: socket.id,
    date: new Date().getTime(),
  };

  socket.emit('send-message-from-client', payload, msg => {
    console.log('From server: ', msg);
  });

  txtMessage.value = '';
});

// btnSend.addEventListener('click', e => {
//   const btn = e.target.closest('.btn-send');
//   if (!btn) return;

//   const message = txtMessage.value;
//   console.log(message);
// });
