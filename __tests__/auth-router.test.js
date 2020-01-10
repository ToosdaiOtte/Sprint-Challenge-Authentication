const server = require('../api/server.js');
const request = require('supertest');
const db = require('../database/dbConfig.js');
const Users = require('../users/users-model.js');

describe("POST /register", () => {
    it("should return JSON", () => {
      return request(server)
        .post("/api/auth/register")
        .send({
          username: "Sprint",
          password: "123456"
        })
        .then(res => {
          expect(res.type).toMatch(/json/);
        });
    });
  
    // it("should return 200 OK status", () => {
    //   return request(server)
    //     .post("/api/auth/register")
    //     .send({
    //       username: "Sprint",
    //       password: "123456"
    //     })
    //     .then(res => {
    //       expect(res.status).toBe(200);
    //     });
    // });
    it('should add the user into the db', async () => {
        await Users.add({
            username: 'tOtte',
            password: 'password'
        });

        const users = await db('users');
        expect(users).toHaveLength(1);
    })

    beforeEach(async () => {
        await db('users').truncate();
    })
  });

describe('POST /login', () => {
    it('should return 200 OK status', () => {
        return request(server)
            .post('/api/auth/login')
            .send({
                username: 'tOtte',
                password: 'password'
            })
            .then(res => {
                expect(res.status).toBe(200);
            })
    })

    it('should return welcome message', async () => {
        await Users.findById(1);
        const user = await db('users');
        expect(                                                                                                                                                                             message).toBe(`Welcome ${user}`)
    })
})