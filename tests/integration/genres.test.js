const request = require('supertest');
const { Genre } = require('../../models/genre');

let server;

describe('/api/genres', () => {
  beforeEach(() => (server = require('../../index')));
  afterEach(async () => {
    server.close();
    await Genre.deleteMany({});
  });

  describe('GET /', () => {
    it('should return all genres', async () => {
      await Genre.insertMany([{ name: 'genre1' }, { name: 'genre2' }]);

      const res = await request(server).get('/api/genres');

      expect(res.status).toBe(200); // too generic
      expect(res.body.length).toBe(2); // still generic
      expect(res.body.some((g) => g.name === 'genre1')).toBeTruthy();
      expect(res.body.some((g) => g.name === 'genre2')).toBeTruthy();
    });
  });
});
