import React from 'react'
import { render, cleanup } from '@testing-library/react'
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

const defaultCrumb = {
  location: {
    pathname: '/',
  },
  crumbLabel: 'HomeCustom',
  crumbSeparator: ' / ',
  crumbStyle: { color: '#666' },
  crumbActiveStyle: { color: 'orange' },
}

const useAutoGen = false
const useClassNames = false
const usePathPrefix = null

afterEach(cleanup)

describe('Breadcrumb Click Tracking', () => {
  it('Should render click tracking breadcrumb with default crumb', () => {
    const { getByText } = render(
      <OptionsProvider
        useAutoGen={useAutoGen}
        useClassNames={useClassNames}
        usePathPrefix={usePathPrefix}
      >
        <BreadcrumbProvider defaultCrumb={defaultCrumb}>
          <Breadcrumb
            title={props.title}
            location={props.location}
            crumbLabel={props.crumbLabel}
            crumbSeparator={props.crumbSeparator}
          />
        </BreadcrumbProvider>
      </OptionsProvider>,
    )
    expect(getByText('HomeCustom')).toBeTruthy()
    expect(getByText('testLabel')).toBeTruthy()
  })
  it('Should Render click tracking breadcrumb without default crumb', () => {
    const { getByText, queryByText } = render(
      <OptionsProvider
        useAutoGen={useAutoGen}
        useClassNames={useClassNames}
        usePathPrefix={usePathPrefix}
      >
        <BreadcrumbProvider defaultCrumb={null}>
          <Breadcrumb
            title={props.title}
            location={props.location}
            crumbLabel={props.crumbLabel}
            crumbSeparator={props.crumbSeparator}
          />
        </BreadcrumbProvider>
      </OptionsProvider>,
    )
    expect(queryByText('HomeCustom')).toBeNull()
    expect(getByText('testLabel')).toBeTruthy()
  })
})
