import React from 'react'
// import SimpleMDE from 'simplemde'
import PropTypes from 'prop-types'
import generateId from './generator-id'

const NOOP = () => {}

export default class Editor extends React.Component {
  constructor() {
    super()
    this.state = {
      keyChange: false,
    }
  }

  componentWillMount() {
    const { id } = this.props
    if (id) {
      this.id = id
    } else {
      this.id = generateId()
    }
  }

  componentDidMount() {
    this.createEditor()
    this.addEvents()
    this.addExtraKeys()
  }

  componentWillReceiveProps(nextProps) {
    const { keyChange } = this.state

    if (!keyChange && (nextProps.value !== this.simplemde.value())) {
      this.simplemde.value(nextProps.value)
    }

    this.setState({
      keyChange: false,
    })
  }

  componentWillUnmount() {
    this.removeEvents()
  }

  createEditor = () => {
    const SimpleMDE = require('simplemde') // eslint-disable-line
    const { value, options } = this.props
    const initialOptions = {
      element: document.getElementById(this.id),
      initialValue: value,
    }

    const allOptions = Object.assign({}, initialOptions, options)
    this.simplemde = new SimpleMDE(allOptions)
  }

  eventWrapper = () => {
    this.setState({
      keyChange: true,
    })
    const { onChange } = this.props
    onChange(this.simplemde.value())
  }

  removeEvents() {
    this.editorEl.removeEventListener('keyup', this.eventWrapper)
    if (this.editorToolbarEl) {
      this.editorToolbarEl.removeEventListener('click', this.eventWrapper)
    }
  }

  addEvents() {
    const wrapperId = `${this.id}-wrapper`
    const wrapperEl = document.getElementById(`${wrapperId}`)

    this.editorEl = wrapperEl.getElementsByClassName('CodeMirror')[0] // eslint-disable-line
    this.editorToolbarEl = wrapperEl.getElementsByClassName('editor-toolbar')[0] // eslint-disable-line

    this.editorEl.addEventListener('keyup', this.eventWrapper)
    if (this.editorToolbarEl) {
      this.editorToolbarEl.addEventListener('click', this.eventWrapper)
    }
  }

  addExtraKeys() {
    // https://codemirror.net/doc/manual.html#option_extraKeys
    const { extraKeys } = this.props
    if (extraKeys) {
      this.simplemde.codemirror.setOption(
        'extraKeys',
        extraKeys,
      )
    }
  }

  render() {
    const { className } = this.props
    const textarea = React.createElement('textarea', { id: this.id })
    return React.createElement('div', { id: `${this.id}-wrapper`, className }, textarea)
  }
}

Editor.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.object,
  value: PropTypes.string,
  extraKeys: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
}

Editor.defaultProps = {
  onChange: NOOP,
  options: {},
  value: '',
  extraKeys: '',
  className: '',
  id: '',
}
