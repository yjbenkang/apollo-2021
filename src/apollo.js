import { ApolloClient,InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://localhost:4000/",
    cache: new InMemoryCache(),
    resolvers: {
        Movie: {
          isLiked: () => false
        }
    }
});

export default client;