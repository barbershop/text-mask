import React, {PropTypes} from 'react'
import createTextMaskInputElement from '../../core/src/createTextMaskInputElement.js'

export const MaskedInput = React.createClass({
  propTypes: {
    mask: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.func,
      PropTypes.shape({
        mask: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
        pipe: PropTypes.func
      })
    ]).isRequired,
    guide: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    pipe: PropTypes.func,
    placeholderChar: PropTypes.string,
    onAccept: PropTypes.func,
    onReject: PropTypes.func,
    keepCharPositions: PropTypes.bool
  },

  componentDidMount() {
    const {props, props: {value}} = this

    this.textMaskInputElement = createTextMaskInputElement({inputElement: this.inputElement, ...props})
    this.textMaskInputElement.update(value)
  },

  componentDidUpdate() {
    this.textMaskInputElement.update(this.props.value)
  },

  render() {
    const props = {...this.props}

	console.log('RENDER');

    delete props.mask
    delete props.guide
    delete props.pipe
    delete props.placeholderChar
    delete props.onAccept
    delete props.onReject
    delete props.keepCharPositions
    delete props.value
    delete props.onChange

    return (
      <input
        {...props}
        onKeyUp={this.onChange}
        defaultValue={this.props.value}
		autoComplete={false}
        ref={(inputElement) => (this.inputElement = inputElement)}
		id="tinput"
      />
    )
  },

  onChange(event) {
	  console.log('ON CHANGE');
    this.textMaskInputElement.update()
	// this.inputElement.selectionStart = this.inputElement.value.length;
	// this.inputElement.selectionEnd = this.inputElement.value.length;

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(event)
    }
  }
})

export default MaskedInput
export {default as conformToMask} from '../../core/src/conformToMask.js'
