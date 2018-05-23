import React from 'react'
import {
  compose,
  setDisplayName,
  withStateHandlers,
  lifecycle,
  pure,
  withHandlers,
} from 'recompose'
import Contents from './Contents'
import Button from './Button'
import Layout from './Layout'

const Component = props => {
  return (
    <React.Fragment>
      <Layout>
        <input type="text" ref={props.onRef} />
        <button onClick={props.focus}>focus</button>
      </Layout>
      <Contents {...props} />
      <Button {...props} />
    </React.Fragment>
  )
}

const Enhance = compose(
  setDisplayName('App'),
  withHandlers(() => {
    let input = null
    return {
      onRef: () => ref => (input = ref),
      focus: () => () => input.focus(),
    }
  }),
  withStateHandlers(
    {
      text: '',
      show: false,
    },
    {
      setText: () => t => ({ text: t }),
      setShow: ({ show }) => () => ({ show: !show }),
    }
  ),
  lifecycle({
    componentDidMount() {
      this.props.setText('Hello React')
    },
  }),
  pure
)

export default Enhance(Component)
