import chai from "chai";
import request from "supertest";
import api from "../../../../index";  // Express API application 


const expect = chai.expect;

describe("Movies endpoint", () => {
    describe("GET /movies ", () => {
      it("should return movies and a status 200", (done) => {
        request(api)
          .get("/api/movies")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.be.ok;
            done();
          });
      });
    });
});