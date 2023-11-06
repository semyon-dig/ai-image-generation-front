// packages
import { useState } from 'react'
import PropTypes from 'prop-types'

// assets
import testImage from '../../assets/test.jpg'

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

      const response = {
        created: 1699273224,
        data: [
          {
            url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-X4oNJltYT1oRxpXTJWQ5QQCz/user-ThLvWmrgvQEySTN7KjxmToCT/img-mXYcGOGduU9LjFsEy08vPhiU.png?st=2023-11-06T11%3A20%3A24Z&se=2023-11-06T13%3A20%3A24Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-11-06T11%3A27%3A07Z&ske=2023-11-07T11%3A27%3A07Z&sks=b&skv=2021-08-06&sig=zHppXH4E0ULAT7c7WjOdrnw7XTZ2Do6/AIVdnI/%2B42U%3D',
          },
          {
            url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-X4oNJltYT1oRxpXTJWQ5QQCz/user-ThLvWmrgvQEySTN7KjxmToCT/img-pAorzRC4GAUgQQWevYt2zFLx.png?st=2023-11-06T11%3A20%3A24Z&se=2023-11-06T13%3A20%3A24Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-11-06T11%3A27%3A07Z&ske=2023-11-07T11%3A27%3A07Z&sks=b&skv=2021-08-06&sig=0%2BEfmx77reJPsqMhz9MK1k9EIzMlMYV9CSQtziZJzaQ%3D',
          },
          {
            url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-X4oNJltYT1oRxpXTJWQ5QQCz/user-ThLvWmrgvQEySTN7KjxmToCT/img-3xirade5VwmNDFNzTYJRp4y2.png?st=2023-11-06T11%3A20%3A24Z&se=2023-11-06T13%3A20%3A24Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-11-06T11%3A27%3A07Z&ske=2023-11-07T11%3A27%3A07Z&sks=b&skv=2021-08-06&sig=bf6zQX%2B7/xOd%2BykYLHiehNCvzrlvxtVX6P0W00ZiG4M%3D',
          },
          {
            url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-X4oNJltYT1oRxpXTJWQ5QQCz/user-ThLvWmrgvQEySTN7KjxmToCT/img-wtd9P7VmY70hpUpcGxoWOr3R.png?st=2023-11-06T11%3A20%3A24Z&se=2023-11-06T13%3A20%3A24Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-11-06T11%3A27%3A07Z&ske=2023-11-07T11%3A27%3A07Z&sks=b&skv=2021-08-06&sig=Sk8DIA8oF4FBXCMsvm8PnhhgJDFOAD/xCO9N0hcc/XQ%3D',
          },
        ],
      }

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
    return 'image/png'
  }

  const editImage = async (imageUrl) => {
    // TODO: Substitute testImage with imageUrl
    const image = await fetch(testImage)
    // const { data: buffer } = await response.json()
    // console.log('buffer', buffer)
    // const uint8Array = new Uint8Array(buffer)
    // const type = getImageType(buffer)
    // const blob = new Blob([uint8Array], { type })

    // Create a new File object from the blob
    const file = new File([image], image?.title || 'upsiide_ai_generated_idea.png', { type: 'image/png' })

    const reader = new FileReader()

    reader.onload = () => {
      const dataUrl = reader.result

      Object.assign(file, {
        preview: dataUrl,
      })

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
          {images?.map(({ url }, i) => (
            <div key={i} className={imageWrapper}>
              <img src={url} alt="" />

              <div className={backdrop}>
                <Button color="secondary" size="sm" onClick={() => editImage(url)}>
                  Edit
                </Button>

                <Button size="sm" onClick={() => useImage(url)}>
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
