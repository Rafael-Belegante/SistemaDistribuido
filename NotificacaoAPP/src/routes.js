const express = require('express');
const router = express.Router();
const amqp = require('amqplib/callback_api');

amqp.connect(process.env.RABBITMQ_URL, (error0, connection) => {
  if (error0) throw error0;
  connection.createChannel((error1, channel) => {
    if (error1) throw error1;
    const queue = 'filaTransacao';

    channel.assertQueue(queue, { durable: false });
    console.log(" [*] Aguardando mensagens em %s. Para sair pressione CTRL+C", queue);

    channel.consume(queue, (msg) => {
      const data = JSON.parse(msg.content.toString());
      console.log(" [x] Recebido %s", data);

      // Aqui você pode enviar uma notificação para o usuário usando um serviço de notificação
      // e.g., email, SMS, etc.
    }, { noAck: true });
  });
});

module.exports = router;
