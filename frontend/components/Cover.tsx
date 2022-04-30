const Cover = () => {
  return (
    <div className="overflow-hidden rounded-lg aspect-square">
      <img
        src="https://images.unsplash.com/photo-1648817860770-dacc62d8cb18?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
        alt="Picture of the cover"
        className="object-cover w-full h-full"
      />
    </div>
  )
}

export default Cover
