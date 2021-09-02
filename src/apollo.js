import { ApolloClient,InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://localhost:4000/",
    cache: new InMemoryCache(),
    resolvers: {
        Movie: {
          isLiked: () => false
        },
        Mutation: {
            likeMovie: (_, { id, isLiked}, { cache }) => {
                const myMovie = {
                  __typename: 'Movie',
                  id: `${id}`,
                  isLiked: `${isLiked}`,
                };
                cache.modify({
                  id: cache.identify(myMovie),
                  fields: {
                    isLiked() {
                      return !isLiked;
                    },
                  },
                });
            }
        }
    }
});

export default client;