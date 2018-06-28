const axois = require('axios')

const { buildSchema } = require('graphql')

let users = require('./model')

function getFilms(url){
    return axios.get(url).then(({data})=>new Film(data))
}

class Person {
    constructor({ id, name, height, films, homeworld }){
        this.id = id;
        this.name = name;
        this.height = height;
        this.films = this.getFilms(films)
        this.homeworld=this.getHomeworld(homeworld)
    }

    getFilms(films){
        return filems[0] ? films.map(getFilms): []
    }
    
    getHomeworld(homeworld){
        return axios.get(homeworld).then(({data})=>new Homeworld(data))
    }
}

class Homeworld {
    constructor({ name, population }){
        this.name = name;
        this.population= population
    }
}

class Film {
    constructor({title, release_date}){
        this.title = title;
        this.realeaseDate =release_date
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
        people: [Person]!
        person(id: Int!):Person
    }

    type Mutation {
        deletePerson(id: Int!): Int

    }
    `
);

const root = {
    people(_,req){  /////people resolver
        //const users = req.app.get()
        return users.map(user=>new Person(user))
    },
    person({ id },req){
        const selected = users.filter(val=>val.id===id)[0]
        if(!selected) throw new Error(`No person matching id: ${id}`)
        return selected;
    },
    deletePerson({ id }){
        users = users.filter(user => user.id!=id);
            return id;
        
    }
}

module.exports={
    root,
    schema
}