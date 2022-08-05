import axios from 'axios'
import NoResult from '../components/NoResult'
import { VideoCard } from '../components/VideoCard'
import { Video } from '../types'

interface IProps {
  videos: Video[]
}

const Home = ({ videos }: IProps) => {
  return (
    <div className="videos flex h-full flex-col gap-10">
      {videos.length ? (
        videos.map((video: Video) => {
          return <VideoCard post={video} key={videos._id} />
        })
      ) : (
        <NoResult text={'No Videos'} />
      )}
    </div>
  )
}

export const getServerSideProps = async () => {
  const { data } = await axios.get(`http://localhost:3000/api/host`)

  return {
    props: { videos: data },
  }
}

export default Home
