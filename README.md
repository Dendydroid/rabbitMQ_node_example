# RabbitMQ Publisher & Consumer interaction Nodejs example

### Use docker images:
- [RabbitMQ publisher](https://hub.docker.com/repository/docker/dendydroid/rabbitmq-publisher)
- [RabbitMQ consumer](https://hub.docker.com/repository/docker/dendydroid/rabbitmq-consumer)

### Or build manually
  - Create images from publisher/Dockerfile & consumer/Dockerfile with --net and -p
 `cd consumer && npm install && npm run start & cd publisher && npm install && npm run start`

Feel free to use
