const express = require('express');
const router = express.Router();
const db = require('./db');
const amqp = require('amqplib/callback_api');

router.post('/transacao', async (req, res) => {
  const { userId, amount } = req.body;
  try {
    const result = await db.query('INSERT INTO transacoes(user_id, amount, status) VALUES($1, $2, $3) RETURNING *', [userId, amount, 'pendente']);
    const transacao = result.rows[0];

    amqp.connect(process.env.RABBITMQ_URL, (error0, connection) => {
      if (error0) throw error0;
      connection.createChannel((error1, channel) => {
        if (error1) throw error1;
        const queue = 'filaTransacao';
        const msg = JSON.stringify({ transacaoId: transacao.id, userId, status: 'pendente' });

        channel.assertQueue(queue, { durable: false });
        channel.sendToQueue(queue, Buffer.from(msg));
        console.log(" [x] Enviado %s", msg);
      });
    });

    res.status(201).json(transacao);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro Interno do Servidor' });
  }
});

module.exports = router;
