import React from 'react'
import '../styles/ayah.css'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import { getAyahTafser, getAyahAudio } from '../services/api/surah.service'
import AyahAudio from './AyahAudio'

function Ayah(props) {
  const { text, number, surahNumber } = props
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [tafser, setTafser] = React.useState([])
  const [showTafser, setShowTafser] = React.useState(false)
  const [showAudio, setShowAudio] = React.useState(false)
  const [audio, setAudio] = React.useState('')

  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    setShowTafser(false)
    setShowAudio(false)
  }

  const getAllTafser = async (id, surahNumber, number) => {
    await getAyahTafser(id, surahNumber, number).then((res) => {
      setTafser(res)
    })
  }

  const getAyahSound = async (surahNumber, ayahNumber) => {
    await getAyahAudio(surahNumber, ayahNumber).then((res) => {
      setAudio(res.data.audio)
    })
  }

  const handleClose = (id) => {
    console.log(id)
    setAnchorEl(null)
    if (id === 1 || id === 2) {
      getAllTafser(id, surahNumber, number)
      setShowTafser(true)
      setShowAudio(false)
    }
    if (id === 3) {
      getAyahSound(surahNumber, number)
      setShowAudio(true)
      setShowTafser(false)
    }
  }
  return (
    <>
      <p className="ayah-text" onClick={(e) => handleClick(e)}>
        {text} {`{${number}}`}
      </p>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          id={1}
          onClick={(e) => {
            handleClose(e.target.id)
          }}
        >
          التفسير الميسر
        </MenuItem>
        <MenuItem
          id={2}
          onClick={(e) => {
            handleClose(e.target.id)
          }}
        >
          تفسير الجلالين
        </MenuItem>
        <MenuItem
          id={3}
          onClick={(e) => {
            handleClose(e.target.id)
          }}
        >
          سماع الأية
        </MenuItem>
      </Menu>
      {showTafser ? (
        <Card sx={{ minWidth: 275 }} justifyContent="center">
          <CardContent>
            <Typography variant="body1">
              <br />
              {tafser.text}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={(e) => setShowTafser(false)}>
              إغلاق
            </Button>
          </CardActions>
        </Card>
      ) : null}

      {showAudio ? <AyahAudio url={audio} /> : null}
    </>
  )
}

export default Ayah
