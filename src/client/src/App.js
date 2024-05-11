import React, { useEffect, useState } from 'react'

function App() {

  const [data, setData] = useState({})

  useEffect(() => {
    fetch("/").then(
      response => response.json()
    ).then(
      data => {
        setData(data)
      }
    )
  }, [])

  return (
    <div>

    </div>
  );
}

export default App;
