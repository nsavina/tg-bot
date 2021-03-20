const request = require("supertest");
import app from '../../app';

describe('POST /tg', () => {
    test('responds with json', (done) => {
        request(app)
        .post("/tg")
        .send({
            "message":{
            "chat":{
                "id":200207524,
            },
            "text":"hey"
            }
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, _) => {
            if (err) return done(err);
            return done();
        });
    });

    test('responds with json', () => {
        request(app)
        .post("/tg")
        .send({})
        .set('Accept', 'application/json')
        .toThrowError(new TypeError('Empty request body'));
    })
});
