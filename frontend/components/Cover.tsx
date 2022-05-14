interface CoverProps {
  url: string
  alt: string
}

const Cover = ({ url, alt }: CoverProps) => {
  return (
    <div className="aspect-square overflow-hidden rounded-lg transition duration-300 hover:drop-shadow-xl">
      <img
        src={url}
        alt={alt}
        className="h-full w-full object-cover"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null // prevents looping
          currentTarget.src =
            'https://pro2-bar-s3-cdn-cf4.myportfolio.com/dbea3cc43adf643e2aac2f1cbb9ed2f0/f14d6fc4-2cea-41a2-9724-a7e5dff027e8_rw_600.jpg?h=99cbed677113851ef5b0af352fa8a5b1'
        }}
      />
    </div>
  )
}

export default Cover
