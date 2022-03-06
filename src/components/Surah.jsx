import React, { Component, useState } from 'react'
import '../styles/surah.css'
import { useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { getSurahAudio } from '../services/api/surah.service'
import ReactAudioPlayer from 'react-audio-player'
import { Button, CardActionArea, CardActions } from '@mui/material'

function Surah(props) {
  const navigate = useNavigate()
  const { index, name, count, image } = props
  const [value, setValue] = useState('')
  const [style, setStyle] = useState({ display: 'none' })
  const [audio, setAudio] = useState('')
  const [showAudio, setShowAudio] = useState(false)

  const surahPage = (name) => {
    navigate(`/surah/${name}/${index}`)
  }

  const getSurahSound = async () => {
    await getSurahAudio(index).then((res) => {
      setAudio(res.audio_file.audio_url)
    })
  }

  const listen = () => {
    getSurahSound()
    setShowAudio(!showAudio)
  }
  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          ':hover': {
            cursor: 'pointer',
            transform: 'scale(1.05)',
          },
          transition: 'transform 0.1s',
        }}
      >
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image="https://i0.wp.com/www.eurasiareview.com/wp-content/uploads/2019/05/b-138.jpg?resize=800%2C445&ssl=1"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <p>
              <strong>{count}</strong>
              <small> Ayah </small>
            </p>
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={(e) => surahPage(name)}>
            قراءة السورة
          </Button>
          <Button size="small" onClick={(e) => listen()}>
            الإستماع للسورة
          </Button>
        </CardActions>
        {showAudio ? (
          <div>
            <ReactAudioPlayer
              className="surah-sound"
              src={audio}
              autoPlay={false}
              controls
            />
          </div>
        ) : null}
      </Card>
    </>
  )
}
export default Surah
