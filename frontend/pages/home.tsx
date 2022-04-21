import type { NextPage } from 'next'
import PlaylistRow from '../components/PlaylistRow'

const Home: NextPage = () => {
  return (
    <>
      <div className="flex flex-col w-full max-w-screen-xl gap-8 px-6 mx-auto my-24">
        {[...Array(5)].map((_, i) => (
          <PlaylistRow key={i} />
        ))}
      </div>
    </>
  )
}
export default Home
