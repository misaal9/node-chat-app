var socket = io();
socket.on('connect', function() {
  console.log('Connected to server');

});
//
// socket.on('welcomeUser', function(msg){
//   console.log(msg);
// });
//
// socket.on('newUserAdd', function(msg){
//   console.log(msg);
// });

socket.on('newMessage', function(msg){
  console.log(msg);
  const list = $('#msgList');
  var li = $('<li></li>').text(`${msg.from}: ${msg.text}`);
  list.append(li);
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

$('#form-message').on('submit', function(e){
  e.preventDefault();
  const msgInput = $('#newMsg');
  socket.emit('createMsg', {
    from: 'User',
    text: msgInput.val()
  }, function(){
    msgInput.val('');
  });
});
