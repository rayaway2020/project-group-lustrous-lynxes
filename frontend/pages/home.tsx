import type { NextPage } from 'next'
import Header from '../components/Header'
import Playbar from '../components/Playbar'
import PlaylistRow from '../components/PlaylistRow'

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col w-full max-w-screen-xl gap-8 px-6 mx-auto mt-24 mb-8">
        {[...Array(5)].map((_, i) => (
          <PlaylistRow />
        ))}
      </div>
      <Playbar />
    </>
  )
}
export default Home
