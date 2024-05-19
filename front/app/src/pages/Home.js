import React from 'react';
import ImageMain from '../components/main/img'
import ContentMain from '../components/main/ContentMain';
import './CSS/main.css';
import { Container, Stack } from "react-bootstrap";
import MainAbout from '../components/main/MainAbout';

const Home = () => {
    return(
        <>
    <Stack className="position-relative contentMain" >
      <ImageMain />
      <Container style={{ position: "absolute" }}>
      <ContentMain />
      </Container>
    </Stack>
    <MainAbout />
        </>
    )
};

export default Home;