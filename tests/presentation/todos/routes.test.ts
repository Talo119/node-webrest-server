import request from 'supertest'
import { testServer } from '../../test-server';
import { prisma } from '../../../src/data/postgres';

describe('Todo route testing', () => { 

    beforeAll(async()=>{
        console.log('antes de start');
        await testServer.start();
        console.log('despues de start');
    });

    afterAll(()=> {
        testServer.close();
    });

    const todo1 = {text: 'Hola Mundo again'};
    const todo2 = {text: 'Hola Mundo 2'};
    
    test('should return todos', async() => { 
        

        /* await prisma.todo.createMany({
            data: [todo1,todo2]
        }); */

        const {body} = await request(testServer.app)
            .get('/api/todos')
            .expect(200);
        
        expect(body).toBeInstanceOf(Array);
        //expect(body.length).toBe(8);

     });


     test('should return a TODO api/todos/:id', async() => { 
        
        const todos = await prisma.todo.findMany();
        

        const {body} = await request(testServer.app)
            .get(`/api/todos/${todos[0].id}`)
            .expect(200);

        console.log({body})

        /* expect(body).toEqual({
            id: 1,
            text:'Buy video games',
            completed: null
        }); */


    });

    test('should return a 404 Not found api/todos/:id', async() => { 
        const {body} = await request(testServer.app)
            .get(`/api/todos/999`)
            .expect(400);

        console.log({body})

        expect(body).toEqual({ error: 'Todo with id 999 not found' });
    });

    test('should return a new Todo api/todos', async() => { 
        const {body} = await request( testServer.app )
            .post('/api/todos')
            .send(todo1)
            .expect(201);

        expect(body).toEqual({
            id: expect.any(Number),
            text: todo1.text,
            completed: null
        });
     });
    
    
     test('should return an error if text is not valid api/todos', async() => { 
        const {body} = await request( testServer.app )
            .post('/api/todos')
            .send({ })
            .expect(400);

        expect(body).toEqual({ error: 'Text property is required' });
     });

    test('should an updated TODO api/todos/:id', async() => { 
        const todo = await prisma.todo.findUnique({
            where: {id:1}
        });
        console.log({todo:todo?.id});

        const {body} = await request(testServer.app)
            .put(`/api/todos/${todo?.id}`)
            .send({text: todo?.text, completed: '2024-01-13'})
            .expect(200);
        expect(body).toEqual({
            id: expect.any(Number),
            text: 'Buy video games',
            completed: '2024-01-13T00:00:00.000Z'
          });
    });


    test('should return 404 if TODO not found', async() => { 
        const {body} = await request(testServer.app)
            .put(`/api/todos/999`)
            .send({text: 'Hola mundo update', completed: '2024-01-15'})
            .expect(400);
        expect(body).toEqual({ error: 'Todo with id 999 not found' });
     });

     test('should return an updated TODO on the date', async() => { 

        const todo = await prisma.todo.findUnique({
            where: {id:1}
        });

        const {body} = await request(testServer.app)
            .put(`/api/todos/${todo?.id}`)
            .send({completed: '2024-01-15'})
            .expect(200);
        
        
        expect(body).toEqual({
            id: 1,
            text: 'Buy video games',
            completed: '2024-01-15T00:00:00.000Z'
          });
      });

    test('should delete a TODO api/todos/:id', async() => { 
        const todo = await prisma.todo.findUnique({
            where: {id:32}
        });

        const {body} = await request(testServer.app)
            .delete(`/api/todos/${todo?.id}`)
            .expect(200);
        expect(body).toEqual({ 
            id: expect.any(Number), 
            text: todo?.text, 
            completed: null
        });
    });

 });