import React, { Component } from 'react'
import '../styles/home.css'
import Surah from './Surah'

import { Grid } from '@mui/material'

import { getSurahAll } from '../services/api/surah.service'

function Home() {
  const [swr, setSwr] = React.useState([])

  const [style, setStyle] = React.useState({ display: 'none' })

  const getAllSurah = async () => {
    await getSurahAll().then((res) => {
      setSwr(res.data)
    })
  }

  React.useEffect(async () => {
    getAllSurah()
  }, [])

  React.useEffect(() => {
    console.log(style)
  }, [style])
  const surahList = swr.map((surah, index) => (
    <Grid key={(surah, index)} item xs={3}>
      <Surah
        index={surah.number}
        name={surah.name}
        count={surah.numberOfAyahs}
      />
    </Grid>
  ))
  return (
    <>
      <div className="home">
        <div className="home-container">
          <Grid container spacing={24}>
            {surahList}
          </Grid>
        </div>
      </div>
    </>
  )
}

export default Home
