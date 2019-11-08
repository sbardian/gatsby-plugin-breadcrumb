import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Breadcrumb from './Breadcrumb'
import { OptionsProvider } from './options-context'
import { BreadcrumbProvider } from './BreadcrumbContext'

const props = {
  title: 'testTitle',
  location: {
    href: 'http://localhost:8000/page-3/',
    origin: 'http://localhost:8000',
    protocol: 'http:',
    host: 'localhost:8000',
    hostname: 'localhost',
    port: '8000',
    pathname: '/page-3/',
    search: '',
    hash: '',
    state: null,
    key: 'initial',
  },
  crumbLabel: 'testLabel',
  crumbSeparator: ' - ',
}

const useAutoGen = false
const useClassNames = false
const usePathPrefix = null

describe('Breadcrumb Click Tracking', () => {
  it('Should render click tracking breadcrumb with default home', () => {
    const { debug, container } = render(
      <OptionsProvider
        useAutoGen={useAutoGen}
        useClassNames={useClassNames}
        usePathPrefix={usePathPrefix}
      >
        <BreadcrumbProvider>
          <Breadcrumb
            title={props.title}
            location={props.location}
            crumbLabel={props.crumbLabel}
            crumbSeparator={props.crumbSeparator}
          />
        </BreadcrumbProvider>
      </OptionsProvider>,
    )
    debug()
    expect(container).toBeTruthy()
  })
})
