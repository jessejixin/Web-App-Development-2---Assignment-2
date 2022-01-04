import chai from "chai";
import request from "supertest";
import api from "../../../../index";

const expect = chai.expect;
let user1token;

describe("Users endpoint", () => {
  describe("GET /api/users ", () => {
    it("should return the 2 users and a status 200", (done) => {
      request(api)
        .get("/api/users")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(2);
          let result = res.body.map((user) => user.username);
          expect(result).to.have.members(["user1", "user2"]);
          done();
        });
    });
  });

  describe("POST /api/users ", () => {
    describe("For a register action", () => {
      describe("when the payload is correct", () => {
        it("should return a 201 status and the confirmation message", () => {
          return request(api)
            .post("/api/users?action=register")
            .send({
              username: "user3",
              password: "test3",
            })
            .expect(201)
            .expect({success: true, msg: 'Successful created new user.' });
        });
        after(() => {
          return request(api)
            .get("/api/users")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((res) => {
              expect(res.body.length).to.equal(3);
              const result = res.body.map((user) => user.username);
              expect(result).to.have.members(["user1", "user2", "user3"]);
            });
        });
      });
    });
    describe("For an authenticate action", () => {
      describe("when the payload is correct", () => {
        it("should return a 200 status and a generated token", () => {
          return request(api)
            .post("/api/users?action=authenticate")
            .send({
              username: "user1",
              password: "test1",
            })
            .expect(200)
            .then((res) => {
              expect(res.body.success).to.be.true;
              expect(res.body.token).to.not.be.undefined;
              user1token = res.body.token.substring(7);
            });
        });
      });
    });
  });
});
