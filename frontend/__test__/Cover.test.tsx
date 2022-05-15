import { render } from '@testing-library/react'

import Cover from '../components/Cover'

it('Renders Cover correctly', () => {
  const { getByAltText } = render(<Cover url="url" alt="alt" />)

  const image = getByAltText('alt')
  expect(image.getAttribute('src')).toContain('url')
})
