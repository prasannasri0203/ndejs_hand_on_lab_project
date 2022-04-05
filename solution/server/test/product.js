let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require('../index');
let host = "http://localhost:8081";
let request = require('request');
const { send } = require("process");

//assertion style
chai.should();

chai.use(chaiHttp);

//test the get route
describe("GET /productservice", () => {
  it("It should GET all the products", (done) => {
    chai.request(host)
      .get("/productservice")
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        done();
      });
  });

  it("It should GET not all the products", (done) => {
    chai.request(host)
      .get("/productservice")
      .end((err, response) => {
        console.log(response.body);
        response.should.have.status(400);
        response.body.should.property('status');
        response.body.should.property('message');
        response.body.should.property('data');
        done();
      });
  });
});

// //test the get route 
describe("GET /productservice/edit/:id", () => {
  it("It should GET a product by Id", (done) => {
    chai.request(host)
      .get("/productservice/edit/1")
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        console.log(response.body.data);
        response.body.should.property("data");
        done();
      });
  });

  it("It should NOT GET a product by Id", (done) => {
    chai.request(host)
      .get("/productservice/edit/111")
      .end((err, response) => {
        console.log(response.body);
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.should.property('status');
        response.body.should.property('message');
        response.body.should.property('data');
        done();
      });
  });
});

// //test the post route
describe("POST /productservice/add", () => {
  it("It should POST new product", (done) => {
    const data = {
      "productId": "10",
      "productName": "name",
      "productCode": "GSA-0001",
      "releaseDate": "April 18,2016",
      "description": "this is test purpose data.",
      "price": "300",
      "starRating": "3",
      "imageUrl": "C:/Users/91900/Downloads/simbu.jpg"
    }
    chai.request(host)
      .post("/productservice/add")
      .send(data)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('status');
        response.body.should.have.property('message');
        response.body.should.have.property('data');
        done();
      });
  });


  it("It should NOT POST new product without the productId property", (done) => {
    const data = {
      "productName": "name",
      "productCode": "GSA-0001",
      "releaseDate": "April 18,2016",
      "description": "this is test purpose data.",
      "price": "300",
      "starRating": "3",
      "imageUrl": "C:/Users/91900/Downloads/simbu.jpg"
    }
    chai.request(host)
      .post("/productservice/add")
      .send(data)
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.should.have.property('status');
        response.body.should.have.property('message');
        response.body.should.have.property('data');
        done();
      });
  });
});

// test the put route
describe("PUT /productservice/update/:id", () => {
  it("It should PUT an existing product", (done) => {
    const data = {
      "productName": "test123",
      "productCode": "GGG-0002",
      "releaseDate": "March 18,2022",
      "description": "testtest",
      "price": "300",
      "starRating": "5",
      "imageUrl": "C:/Users/91900/Downloads/simbu.jpg"
    };
    chai.request(host)
      .put("/productservice/update/1")
      .send(data)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('status');
        response.body.should.have.property('message');
        response.body.should.have.property('data');
        done();
      });
  });

  it("It should NOT PUT a product that is not in the file", (done) => {
    const data = {
      "productName": "test",
      "productCode": "GGG-0002",
      "releaseDate": "March 18,2022",
      "description": "testtest",
      "price": "300",
      "starRating": "5",
      "imageUrl": "C:/Users/91900/Downloads/simbu.jpg"
    };
    chai.request(host)
      .put("/productservice/update/111")
      .send(data)
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.should.have.property('status');
        response.body.should.have.property('message');
        response.body.should.have.property('data');
        done();
      });
  });
});

//test for delete 
describe("DELETE /productservice/delete/:id", () => {
  it("It should DELETE an existing product", (done) => {
    chai.request(host)
      .delete("/productservice/delete/6")
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });

  it("It should NOT DELETE a product that is not in the file", (done) => {
    chai.request(host)
      .delete("/productservice/delete/6")
      .end((err, response) => {
        response.should.have.status(400);
        done();
      });
  });
});
