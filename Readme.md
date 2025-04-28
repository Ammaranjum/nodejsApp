/RabbitMQ
|-- /models
| |-- book.js
|
|-- /services
| |-- bookService.js
|
|-- /consumers
| |-- bookConsumer.js
|
|-- /publishers
| |-- bookPublisher.js
|
|-- /routes
| |-- bookRoutes.js
|
|-- /config
| |-- mongo.js
|
|-- app.js
|-- package.json

PS E:\RabbitMQ> npm start

> rabbitmq@1.0.0 start
> node app.js

Server running on port 5000
MongoDB connected

Consumers initialized:

- Consumer-1
- Consumer-2
- Consumer-3

--- Message flow ---

[Sent] Action: create | Title: Fahrenheit 451
[Consumer-1] Processed: Fahrenheit 451 (Ray Bradbury)

[Sent] Action: create | Title: The Hobbit
[Consumer-3] Processed: The Hobbit (J.R.R. Tolkien)

[Sent] Action: create | Title: The Catcher in the Rye
[Consumer-2] Processed: The Catcher in the Rye (J.D. Salinger)

[Sent] Action: create | Title: Crime and Punishment
[Consumer-1] Processed: Crime and Punishment (Fyodor Dostoevsky)

[Sent] Action: create | Title: Moby Dick
[Consumer-3] Processed: Moby Dick (Herman Melville)

[Sent] Action: read | ID: 680f89c133ab916a1367234f
[Consumer-2] Fetched: Moby Dick

[Sent] Action: delete | ID: 680f89c133ab916a1367234f
[Consumer-1] Deleted: Moby Dick

--- Server stopped ---
