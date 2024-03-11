import fastify from "fastify";
import UserDAL from "./source/database";

require('newrelic');

const server = fastify({
    logger: true
});

server.options('/', async (request, reply) => {
    reply.headers({
        'Allow': 'GET,PUT,PATCH,POST,DELETE',
        'Cache-Control': 'no-cache',
        'Server': 'Node JS Server',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': 'pt-br'
    })
});

server.get('/health-check', async () => {
    return {
        status: 'ok',
        message: 'Server is up and running'
    };
});

server.get('/user', async (request, reply) => {
    const { name } = request.query as { name: string };

    const result = UserDAL.List(name);

    const returnList = {
        count: result.length,
        users: result
    }

    return reply.code(200).send(JSON.stringify(returnList));
});

server.get('/user/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const user = UserDAL.Get(id);
    if (user) {
        return reply.code(200).send(JSON.stringify(user));
    } else {
        return reply.code(404).send({
            message: 'User not found'
        });
    }
});

server.patch('/user/:id', async (request, reply) => {
    const { id, } = request.params as { id: string };
    const { name, age } = request.body as { name: string, age: number };
    const user = UserDAL.Get(id);
    if (!user) {
        return reply.code(404).send({
            message: 'User not found'
        })
    }
    UserDAL.Update(id, name, age);
    return reply.code(204).send();
});

server.put('/user/:id', async (request, reply) => {
    const { id, } = request.params as { id: string };
    const { name, age } = request.body as { name: string, age: number };
    UserDAL.UpdateOrCreate(id, name, age);
    return reply.code(204).send();
});

server.delete('/user/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    if (!UserDAL.Get(id)) {
        return reply.code(404).send({
            message: 'User not found'
        })
    }
    UserDAL.Delete(id);
    return reply.code(204).send();
});

server.post('/user', async (request, reply) => {
    const requestData: { name: string, age: number } = request.body as { name: string, age: number };
    const { name, age } = requestData;
    const id = UserDAL.Save(name, age);
    return reply.code(201).send({ id: id });
});

server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
});