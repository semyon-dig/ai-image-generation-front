// packages
import PropTypes from 'prop-types'

// styles
import classes from './Slider.module.scss'

const { slider } = classes

const Slider = ({ value, onChange, min, max, step, disabled }) => {
  // functions
  const handleChange = (e) => onChange(+e.target.value)

  return (
    <div>
      <input type="range" className={slider} onChange={handleChange} {...{ value, min, max, step, disabled }} />
    </div>
  )
}

Slider.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number,
  disabled: PropTypes.bool,
}

export default Slider
