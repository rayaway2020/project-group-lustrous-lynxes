interface CoverProps {
  url: string
  alt: string
}

const Cover = ({ url, alt }: CoverProps) => {
  return (
    <div className="overflow-hidden transition duration-300 rounded-lg aspect-square hover:drop-shadow-xl">
      <img src={url} alt={alt} className="object-cover w-full h-full" />
    </div>
  )
}

export default Cover
