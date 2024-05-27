# Como Executar

Certifique-se de que o Docker Desktop está instalado em seu sistema Windows.

Abra o terminal (PowerShell ou CMD) e navegue até o diretório onde está o arquivo docker-compose.yml que você criou.

Execute o comando abaixo para subir os serviços especificados no arquivo docker-compose.yml:
docker-compose up --build

Isso irá construir as imagens dos serviços, criar os containers e iniciá-los. Durante esse processo, você verá os logs de inicialização de cada serviço.

Após o comando ser executado com sucesso, você deve ver mensagens indicando que os serviços estão rodando, por exemplo:
Para o serviço de pagamento:
Serviço de pagamento rodando na porta 3000
Para o serviço de notificação:
Serviço de notificação rodando na porta 3001

Agora que os serviços estão rodando, você pode testar a comunicação entre eles. Use um cliente HTTP, como curl, Postman ou Insomnia, para enviar uma solicitação POST para o serviço de pagamento. Por exemplo:
curl -X POST http://localhost:3000/api/transacao -H "Content-Type: application/json" -d "{\"user
