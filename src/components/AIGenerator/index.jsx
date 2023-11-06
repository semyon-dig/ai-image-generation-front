// packages
import { useState } from 'react'
import PropTypes from 'prop-types'

// assets
import testImage from '../../assets/test.jpg'
import testResponse from '../../assets/example.json'

// components
import Button from '../Button'
import LoadingIndicator from '../LoadingIndicator'

// styles
import classes from './AIGenerator.module.scss'

const { container, promptInput, loadingWrapper, imagesContainer, imageWrapper, backdrop } = classes

const AIGenerator = ({ setFile }) => {
  // state
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState([])

  // functions
  const handlePrompt = (e) => setPrompt(e.target.value)

  const generateImage = async () => {
    setIsLoading(true)
    try {
      // TODO: Use API call instead of mock data
      //   const response = await openai.createImage({
      //     prompt,
      //     n: 4,
      //     size: '256x256', // * 1024x1024: $0.020 / image; 512x512: $0.018 / image; 256x256: $0.016 / image)
      //   })

      const response = testResponse
      console.log('response', response)
      setImages(response.data)
      setTimeout(() => setIsLoading(false), 500)
    } catch (error) {
      setIsLoading(false)
    }
  }

  const useImage = (imageUrl) => {
    return imageUrl // TODO: Pass it forward to the ideas screen
  }

  const getImageType = (data) => {
    if (data[0] === 0x89 && data[1] === 0x50 && data[2] === 0x4e && data[3] === 0x47) return 'image/png'
    if (data[0] === 0xff && data[1] === 0xd8) return 'image/jpeg'
    if (data[0] === 0x47 && data[1] === 0x49 && data[2] === 0x46 && data[3] === 0x38) return 'image/gif'
    if (data[0] === 0x42 && data[1] === 0x4d) return 'image/bmp'
    return 'image/jpeg'
  }

  function base64ToFile(base64, fileName, mimeType) {
    // Remove the data URI prefix if it exists
    const base64Data = base64.replace(/^data:[^;]+;base64,/, '')

    // Create a Blob object from the base64 data
    const byteCharacters = atob(base64Data)
    const byteNumbers = new Array(byteCharacters.length)

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    const blob = new Blob([byteArray], { type: mimeType })

    // Create a File object from the Blob
    return new File([blob], fileName, { type: mimeType })
  }

  const editImage = async (base64) => {
    const type = getImageType(base64)

    // Create a new File object from the blob
    const file = base64ToFile(base64, 'upsiide_ai_generated_idea.jpeg', { type })

    const reader = new FileReader()

    reader.onload = () => {
      const dataUrl = reader.result

      Object.assign(file, {
        preview: dataUrl,
      })

      console.log('file', file)
      setFile(file)
    }

    reader.readAsDataURL(file)
  }

  return (
    <div className={container}>
      <h2>Describe the image</h2>

      <p>Include more details to get the best results</p>

      <textarea className={promptInput} placeholder="Enter your prompt" value={prompt} onChange={handlePrompt} rows="10" />

      <Button onClick={generateImage} fullWidth>
        {images?.length ? 'Regenerate' : 'Generate'}
      </Button>

      {isLoading ? (
        <div className={loadingWrapper}>
          <LoadingIndicator />
        </div>
      ) : (
        <div className={imagesContainer}>
          {images?.map(({ b64_json }, i) => (
            <div key={i} className={imageWrapper}>
              <img src={`data:image/png;base64, ${b64_json}`} alt="" />

              <div className={backdrop}>
                <Button color="secondary" size="sm" onClick={() => editImage(b64_json)}>
                  Edit
                </Button>

                <Button size="sm" onClick={() => useImage(b64_json)}>
                  Use
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

AIGenerator.propTypes = {
  setFile: PropTypes.func.isRequired,
}

export default AIGenerator
