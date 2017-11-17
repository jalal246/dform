import React from 'react'

import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
// import { linkTo } from '@storybook/addon-links'

// import { Button, Welcome } from '@storybook/react/demo'
import DevForm from '../src'

// storiesOf('Welcome', module).add('to Storybook', () => (
//   <Welcome showApp={linkTo('Button')} />
// ))

storiesOf('dynamic form', module).add('main component', () => <DevForm />)
// .add('with text', () => (
//   <Button onClick={action('clicked')}>Hello Button</Button>
// ))
// .add('with some emoji', () => (
//   <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
// ))
