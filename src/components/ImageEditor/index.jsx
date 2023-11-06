// packages
import { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import clsx from 'clsx'

// components
import Slider from '../Slider'
import Button from '../Button'

// styles
import classes from './ImageEditor.module.scss'

const { imagePreview, imagesWrapper, imageWrapper, sliderWrapper, footer } = classes

const ImageEditor = ({ file, setFile }) => {
  // state
  const [rotate, setRotate] = useState(0)

  const cropperRef = useRef(null)

  // functions
  const handleCrop = async () => {
    if (!cropperRef.current?.cropper || !file) return
    const url = cropperRef.current.cropper?.getCroppedCanvas()?.toDataURL()
    const response = await fetch(url)
    const buffer = await response.arrayBuffer()
    const blob = new Blob([buffer])

    // Create a new File object from the blob
    const croppedFile = new File([blob], file?.name, { type: response.headers.get('Content-Type') ?? 'image/png' })

    const reader = new FileReader()
    reader.onload = () => {
      // Get the data URL from the FileReader result
      const dataUrl = reader.result

      // Set the preview property using the data URL
      Object.assign(croppedFile, {
        preview: dataUrl,
      })

      // Set the image file state
      setFile(croppedFile)
    }

    // Read the Blob as a data URL
    reader.readAsDataURL(blob)
  }

  const handleRotate = (deg) => {
    setRotate((prevVal) => {
      const diff = deg - prevVal
      cropperRef.current?.cropper.rotate(diff)
      return deg
    })
  }

  const onClose = () => {
    setRotate(0)
    setFile(null)
  }

  return (
    <>
      <div className={imagesWrapper}>
        <Cropper
          ref={cropperRef}
          responsive
          rotatable
          guides
          scalable
          className={imageWrapper}
          aspectRatio={1}
          preview={`.${imagePreview}`}
          src={file?.preview}
          viewMode={1}
          minCropBoxHeight={32}
          minCropBoxWidth={32}
          background
          autoCropArea={1}
          checkOrientation={false}
        />

        <div className={clsx(imageWrapper, imagePreview)} />
      </div>

      <div className={sliderWrapper}>
        <Slider value={rotate} onChange={handleRotate} min={-90} max={90} disabled={!file?.preview} />
      </div>

      <div className={footer}>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>

        <Button variant="solid" onClick={handleCrop}>
          Crop
        </Button>
      </div>
    </>
  )
}

ImageEditor.propTypes = {
  file: PropTypes.instanceOf(File),
  setFile: PropTypes.func.isRequired,
}

export default ImageEditor
