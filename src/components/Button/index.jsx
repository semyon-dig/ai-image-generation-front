// packages
import PropTypes from 'prop-types'
import clsx from 'clsx'

// components
import LoadingIndicator from '../LoadingIndicator'

// styles
import classes from './Button.module.scss'

const { button, startAdornmentWrapper, endAdornmentWrapper, primary, secondary, small, large, loading, isFullWidth } = classes

const Button = ({
  size = 'lg',
  color = 'primary',
  isLoading,
  children,
  disabled,
  type = 'button',
  fullWidth,
  startAdornment,
  endAdornment,
  ...props
}) => (
  <button
    className={clsx(button, {
      [primary]: color === 'primary',
      [secondary]: color === 'secondary',
      [small]: size === 'sm',
      [large]: size === 'lg',
      [loading]: isLoading,
      [isFullWidth]: fullWidth,
    })}
    disabled={disabled || isLoading}
    {...{ type, ...props }}
  >
    {isLoading && <LoadingIndicator />}

    {startAdornment && <div className={startAdornmentWrapper}>{startAdornment}</div>}

    <p>{children}</p>

    {endAdornment && <div className={endAdornmentWrapper}>{endAdornment}</div>}
  </button>
)

Button.propTypes = {
  size: PropTypes.oneOf(['sm', 'lg']),
  color: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  fullWidth: PropTypes.bool,
  startAdornment: PropTypes.node,
  endAdornment: PropTypes.node,
}

export default Button
