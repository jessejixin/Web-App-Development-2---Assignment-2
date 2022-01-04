import chai from "chai";
import request from "supertest";
import api from "../../../../index";  // Express API application 


const expect = chai.expect;
const currentMovieId  = 527774
const currentMovieTitle = "Raya and the Last Dragon"
let newMovieId
const newMovie = {
  backdrop_path: "/5Iw7zQTHVRBOYpA0V6z0yypOPZh.jpg",
  genres: [
    {
      id: 14,
      name: "Fantasy"
    },
    {
      id: 12,
      name: "Adventure"
    },
    {
      id: 878,
      name: "Science Fiction"
    },
    {
      id: 28,
      name: "Action"
    }
  ],        
  id: 181808,
  original_language: "en",
  original_title: "Star Wars: The Last Jedi",
  overview:
    "Rey develops her newly discovered abilities with the guidance of Luke Skywalker, who is unsettled by the strength of her powers. Meanwhile, the Resistance prepares to do battle with the First Order.",
  popularity: 44.208,
  poster_path: "/kOVEVeg59E0wsnXmF9nrh6OmWII.jpg",
  release_date: "2017-12-13",
  tagline: "Darkness rises... and light to meet it",
  title: "Star Wars: The Last Jedi",
  video: false,
  vote_average: 7,
  vote_count: 9692
};

const newReview ={
    "author": "Xin Ji",
    "content": "I am doing my assignment."
}

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
          expect(res.body).to.be.a("object")
          done();
        });
    });
  });
  describe("GET /movies/:id", () => {
    describe("when the id is valid", () => {
      it("should return the matching movie", () => {
        return request(api)
          .get(`/api/movies/${currentMovieId}`)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(res.body).to.have.property("title", currentMovieTitle);
          });
      });
    });
    describe("when the id is invalid", () => {
      it("should return the NOT found message", () => {
        return request(api)
        .get("/api/movies/xxx")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect({
          success: false,
          status_code: 34,
          status_message: "The resource you requested could not be found.",
        });
    });
   });
  });
  describe("GET /movies/:id/images", () => {
      it("should return the matching movie's images", () => {
        return request(api)
          .get(`/api/movies/${currentMovieId}/images`)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(res.body).to.have.property("backdrops");
          });
      });
    });
  describe("GET /movies/:id/reviews", () => {
      it("should return the matching movie's reviews", () => {
        return request(api)
          .get(`/api/movies/${currentMovieId}/reviews`)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(res.body).to.be.a("array");
          });
      });
    });
  describe("POST /movies/:id/reviews", () => {
      it("should return the matching movie's reviews", () => {
        return request(api)
          .post(`/api/movies/${currentMovieId}/reviews`)
          .send(newReview)
          .expect(201)
          .then((res) => {
            expect(res.body).to.have.property("author","Xin Ji");
          });
      });
    });
});