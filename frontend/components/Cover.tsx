interface CoverProps {
  url: string
  alt: string
}

const Cover = ({ url, alt }: CoverProps) => {
  return (
    <div className="aspect-square overflow-hidden rounded-lg transition duration-300 hover:drop-shadow-xl">
      <img src={url} alt={alt} className="h-full w-full object-cover" />
    </div>
  )
}

export default Cover
