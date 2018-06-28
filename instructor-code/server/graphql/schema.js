const { buildSchema } = require('graphql');
const axios = require('axios');

let users = require('./model');

function getFilms(url) {
  return axios.get(url).then(({ data }) => new Film(data));
}

class Person {
  constructor({ id, name, height, films, homeworld }, req) {
    this.id = id;
    this.name = name;
    this.height = height;
    this.films = this.getFilms(films);
    this.homeworld = this.getHomeworld(homeworld);
  }
  getFilms(films) {
    return films[0] ? films.map(getFilms) : [];
  }
  getHomeworld(homeworld) {
    return axios.get(homeworld).then(({ data }) => new Homeworld(data));
  }
}

class Homeworld {
  constructor({ name, population }) {
    this.name = name;
    this.population = population;
  }
}

class Film {
  constructor({ title, release_date }) {
    this.title = title;
    this.releaseDate = release_date;
  }
}

const schema = buildSchema(
  `
    type Person {
        id: Int!
        name: String
        height: Int
        films: [Film]!
        homeworld: Homeworld
    }
    type Homeworld {
        name: String
        population: String
    }
    type Film {
        title: String
        releaseDate: String
    }
    type Query {
        people: [Person!]!
        person(id: Int!): Person
    }
    type Mutation {
      deletePerson(id: Int!): Int
    }
    `
);

const root = {
  people(_, req) {
    // const users = await req.app.get('db').getUsers();
    return users.map(user => new Person(user, req));
  },
  person({ id }, req) {
    const selected = users.filter(val => val.id === id)[0];
    if (!selected) throw new Error(`No Person Matching id: ${id}`);
    return selected;
  },
  deletePerson({ id }) {
    users = users.filter(user => user.id !== id);
    return id;
  }
};

module.exports = {
  root,
  schema
};
