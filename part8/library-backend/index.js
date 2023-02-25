const { ApolloServer, gql, UserInputError } = require('apollo-server');
const mongoose = require('mongoose');

const Author = require('./models/author');
const Book = require('./models/book');


const MONGODB_URI = "mongodb+srv://fullstack:kungp00@cluster0.ep6ddza.mongodb.net/testApp?retryWrites=true&w=majority"

mongoose.connect(MONGODB_URI)
  .then(()=>console.log('Connected to mongodb'))
  .catch(err => console.log('Failed to connect mongodb server, error: ', err.message));

/*let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]*/

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
*/

/*let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]*/

const typeDefs = gql`
  type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book!]!
      allAuthors: [AuthorInformation!]!
  }

  type Book {
      title: String!
      published: Int!
      author: Author!
      genres: [String!]!
  }

  type AuthorInformation {
      name: String!
      bookCount: Int!
      born: Int
  }

  type Author {
      name: String!
      born: Int
  }

  type Mutation {
      addBook(
        title: String!
        author: String!
        published: Int!
        genres: [String!]!
      ): Book
      editAuthor(
          name: String!
          setBornTo: Int!
      ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (_root, args) => {
        if (!args.author && !args.genre) {
            return await Book.find({});
        }
        if (args.author && args.genre) {
            const author = await Author.findOne({name: args.author})
            if (!author) {
              return []
            }
            const books = await Book.find({ author: author._id })
            return books.filter(obj => obj.genres.includes(args.genre))
        } else if (args.author) {
            const author = await Author.findOne({name: args.author})
            if (!author) {
              return []
            }
            return await Book.find({ author: author._id });
        } else {
            return await Book.find({ genres: { $in: [ args.genre ] } });
        }
    },
    allAuthors: async () => {
        const authors = await Author.find({});
        const books = await Book.find({});
        const allAuthors = authors.reduce((car,val) => { 
            return [...car, {name: val.name, bookCount: books.filter(obj => obj.author.toString()===val._id.toString()).length, born: val.born}]
        }, [])
        return allAuthors
    }
  },
  Mutation: {
      addBook: async (_root, args) => {
        let author  = await Author.findOne({ name: args.author })
        if (!author) {
          author = new Author({ name: args.author });
          try {
            await author.save()

          } catch (err) {
            throw new UserInputError(err.message, { invalidArgs: args.author});
          }
        }
        const newBook = {title: args.title,
          published: args.published,
          genres: args.genres,
          author: author._id.toString()}
        const book = new Book(newBook);
        try {
           await book.save();
           return {...newBook, author: {name: args.author}}
        } catch(err) {
          throw new UserInputError(err.message, {
            invalidArgs: args
          });
        }   
      },
      editAuthor: async (_root, args) => {
          const author = await Author.findOne({name: args.name});
          author.born = args.setBornTo;
          try {
            return author.save();
          } catch (error) {
            throw new UserInputError(error.message,{
              invalidArgs: args
            });
          }
      }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})