// packages
import { useState } from 'react'

// components
import ImageEditor from './components/ImageEditor'
import AIGenerator from './components/AIGenerator'

const App = () => {
  // state
  const [file, setFile] = useState(null)

  return <div>{!file ? <AIGenerator {...{ setFile }} /> : <ImageEditor {...{ file, setFile }} />}</div>
}

export default App
