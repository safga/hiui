import React from 'react'

export * from './basic.stories'

export default {
  title: 'Tag',
  decorators: [(story: Function) => <div>{story()}</div>],
}
