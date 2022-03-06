import { apiQuran, apiTafser, apiAudio } from './api.services'

export const getSurahAll = async () => apiQuran().get(`/v1/surah`)

export const getSurahAyat = async (index) =>
  apiQuran().get(`/v1/surah/${index}/ar`)

export const getAyahAudio = async (surahId, ayahId) =>
  apiQuran().get(
    `http://api.alquran.cloud/v1/ayah/${surahId}:${ayahId}/ar.alafasy`,
  )

export const getSurahAudio = async (surahId) =>
  apiAudio().get(`/chapter_recitations/1/${surahId}`)

export const getAyahTafser = async (tafserId, surahId, ayahId) =>
  apiTafser().get(`/tafseer/${tafserId}/${surahId}/${ayahId}`)

const surahService = {
  getSurahAll,
  getSurahAyat,
  getAyahTafser,
  getAyahAudio,
  getSurahAudio,
}

export default surahService
