import { api } from "@/services/api"

import styles from './styles.module.scss'
import { ListTracks } from "@/components/ListTracks"

export interface Track {
  id: number
  name: string
  cover: string
  music: string
}

export default async function Feed() {
  const response = await api.get<Track[]>('tracks')
  
  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}></header>
        <ListTracks tracks={response.data} />
      </div>
    </>
  )
}
