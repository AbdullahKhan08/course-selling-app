import React from 'react'
import '../Styles/Home.css'
import bannerImage from '../assets/home_img.png'
import { Container, Grid, Typography, Button } from '@mui/material'
import { Image } from 'mui-image'

function Home() {
  return (
    <div>
      <Container>
        <div className="containerDiv">
          <Typography variant="h4" gutterBottom>
            Welcome to LearnHub. Worlds most popular learning platform
          </Typography>
        </div>

        {/* <Grid container spacing={20}>
          <Grid item xs={12} md={6}> */}
        <Image src={bannerImage} width={'400px'} height={'400px'} />
        <Typography variant="h2" gutterBottom>
          Learn Anything, Anytime
        </Typography>
        <Typography variant="body1" gutterBottom>
          Our courses cover a wide range of topics, so you can find the perfect
          one to help you reach your goals.
        </Typography>

        <Button size="large" variant="contained" color="primary">
          Sign up for a course today!
        </Button>
        {/* </Grid>
        </Grid> */}
      </Container>
    </div>
  )
}

export default Home
