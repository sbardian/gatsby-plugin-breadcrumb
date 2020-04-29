import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Breadcrumb from './Breadcrumb'
import { OptionsProvider } from './options-context'
import { BreadcrumbProvider } from './breadcrumb-context'

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

const homeProps = {
  title: 'homeTitle',
  location: {
    href: 'http://localhost:8000/',
    origin: 'http://localhost:8000',
    protocol: 'http:',
    host: 'localhost:8000',
    hostname: 'localhost',
    port: '8000',
    pathname: '/',
    search: '',
    hash: '',
    state: null,
    key: 'initial',
  },
  crumbLabel: 'Home',
  crumbSeparator: ' - ',
}

const defaultCrumb = {
  location: {
    pathname: '/',
  },
  crumbLabel: 'HomeCustom',
  crumbSeparator: ' / ',
}

const useAutoGen = false
const usePathPrefix = null

afterEach(() => {
  cleanup()
})

describe('Breadcrumb Click Tracking', () => {
  it('Should render click tracking breadcrumb with default crumb', () => {
    const { getByText } = render(
      <OptionsProvider useAutoGen={useAutoGen} usePathPrefix={usePathPrefix}>
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
    expect(getByText('testTitle')).toBeTruthy()
    expect(getByText('HomeCustom')).toBeTruthy()
    expect(getByText('testLabel')).toBeTruthy()
  })
  it('should only render one HomeCustom crumb while using defaultCrumb', () => {
    const { getByText, queryByText } = render(
      <OptionsProvider useAutoGen={useAutoGen} usePathPrefix={usePathPrefix}>
        <BreadcrumbProvider defaultCrumb={defaultCrumb}>
          <Breadcrumb
            title={homeProps.title}
            location={homeProps.location}
            crumbLabel={homeProps.crumbLabel}
            crumbSeparator={homeProps.crumbSeparator}
          />
        </BreadcrumbProvider>
      </OptionsProvider>,
    )
    expect(getByText('homeTitle')).toBeTruthy()
    expect(getByText('HomeCustom')).toBeTruthy()
    expect(queryByText('Home')).toBeNull()
  })
  it('Should Render click tracking breadcrumb without default crumb', () => {
    const { getByText, queryByText } = render(
      <OptionsProvider useAutoGen={useAutoGen} usePathPrefix={usePathPrefix}>
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
    expect(getByText('testTitle')).toBeTruthy()
    expect(queryByText('HomeCustom')).toBeNull()
    expect(getByText('testLabel')).toBeTruthy()
  })
  it('Should render click tracking breadcrumb with default crumb and path prefix', () => {
    const { getByText } = render(
      <OptionsProvider useAutoGen={useAutoGen} usePathPrefix="/blog">
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
    expect(getByText('testTitle')).toBeTruthy()
    expect(getByText('HomeCustom')).toBeTruthy()
    expect(getByText('testLabel')).toBeTruthy()
  })
  it('Should render click tracking breadcrumb with default crumb and using class names', () => {
    const { container, getByText, queryByText } = render(
      <OptionsProvider useAutoGen={useAutoGen} usePathPrefix={usePathPrefix}>
        <BreadcrumbProvider defaultCrumb={defaultCrumb}>
          <Breadcrumb
            location={props.location}
            crumbLabel={props.crumbLabel}
            crumbSeparator={props.crumbSeparator}
          />
        </BreadcrumbProvider>
      </OptionsProvider>,
    )
    expect(queryByText('testTitle')).toBeNull()
    expect(getByText('HomeCustom')).toBeTruthy()
    expect(getByText('testLabel')).toBeTruthy()
    container
      .querySelectorAll('a')
      .forEach((a) => expect(a.getAttribute('a')).toBeNull())
  })
})
