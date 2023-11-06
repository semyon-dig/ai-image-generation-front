// packages
import { useState } from 'react'

// components
import ImageEditor from './components/ImageEditor'
import AIGenerator from './components/AIGenerator'

const App = () => {
  // state
  const [file, setFile] = useState(null)

  return (
    <div>
      <ImageEditor {...{ file, setFile }} />

      <AIGenerator {...{ setFile }} />
    </div>
  )
}

export default App
