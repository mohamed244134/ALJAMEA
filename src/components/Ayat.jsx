import React from 'react'
import { useParams } from 'react-router-dom'
import '../styles/ayat.css'
import { getSurahAyat } from '../services/api/surah.service'
import { Grid } from '@mui/material'
import Ayah from './Ayah'

function Ayat() {
  const { surah, number } = useParams()
  const [ayat, setAyat] = React.useState([])
  
  const getAllAyat = async () => {
    await getSurahAyat(number).then((res) => {
      setAyat(res.data.ayahs)
    })
  }

  React.useEffect(async () => {
    getAllAyat()
  }, [])

  // const ayatList = ayat.map((ayah, index) => {
  //   ayatWords = ayatWords.concat('  ', ayah.text.concat(`{${ayah.number}}`))
  // })
  const ayatList = ayat.map((ayah, index) => (
    <Ayah
      number={ayah.numberInSurah}
      text={ayah.text}
      page={ayah.page}
      surahNumber={number}
    />
  ))

  return (
    <>
      <p className="sura-name">{surah}</p>
      <div className="ayat-info" dir="rtl" style={{ whiteSpace: 'pre-line' }}>
        <Grid container spacing={0} justify="space-around">
          {ayatList}
        </Grid>
      </div>
    </>
  )
}

export default Ayat
