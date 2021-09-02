import React from "react";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import Suggestion from "../components/Suggestion";

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      medium_cover_image
      language
      rating
      description_intro
    }
    suggestions(id: $id) {
        id
        medium_cover_image
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items:center;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  height: 100vh;
`;

const Movie = styled.div`
  height: 80%;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 45px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 25px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 20px;
`;

const Poster = styled.div`
  width: 15%;
  height: 60%;
  background-color: transparent;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 7px;
`;

const Suggestions = styled.div`
    width: 100%;
    color: white;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 25px;
    width: 60%;
    position: relative;
    top: -50px;
`;


export default () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: +id }
  });
  return (
    <Container>
      <Movie>
        <Column>
            <Title>{loading ? `Loading...` : data.movie.title}</Title>
            <Subtitle>
              {data?.movie?.language} · {data?.movie?.rating}
            </Subtitle>
            <Description>{data?.movie?.description_intro}</Description>
        </Column>
        {data?.movie?.medium_cover_image?<Poster bg={data?.movie?.medium_cover_image}></Poster>:""}
      </Movie>
      <Suggestions>
        {data?.suggestions?.map(s => <Suggestion key={s.id} id={s.id} bg={s.medium_cover_image} />)}
      </Suggestions>
    </Container>
  );
  
};