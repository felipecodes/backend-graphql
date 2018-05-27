import { GraphQLObjectType } from 'graphql';
import BookType from './BookType';
// import { BookLoader } from '../loader';

export default new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    book: {
      type: BookType,
      // eslint-disable-next-line no-unused-vars
      resolve: (root, args, context) => ({
        _id: 'book123',
        title: 'Estruturas de dados e algoritmos em JavaScript',
        author: 'Loiane Groner',
        description: `Este livro apresenta o básico sobre a linguagem
         JavaScript e introduz a ECMAScript 7 antes de passar
         gradualmente para as implementações atuais da ECMAScript 6.
         Você vai adquirir um conhecimento profundo sobre como as
         tabelas hash e as estruturas de dados para conjuntos
         funcionam e de que modo as árvores e os mapas hash podem
         ser usados para buscar arquivos em um disco rígido ou
         representar um banco de dados.`,
      }),
    },
  }),
});
