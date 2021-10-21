import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Breadcrumb from './Breadcrumb'
import { OptionsProvider } from './options-context'
import { BreadcrumbProvider } from './breadcrumb-context'

const Separator = () => {
  return (
    <div>
      <span>/</span>
    </div>
  )
}

const props = {
  breadcrumb: {
    crumbs: [
      {
        crumbLabel: 'Home',
        pathname: '/',
      },
      {
        crumbLabel: 'long',
        pathname: '/long',
      },
      {
        crumbLabel: 'test',
        pathname: '/long/test',
      },
    ],
    location: '/long/test',
  },
  crumbLabel: 'testLabel',
  crumbSeparator: ' - ',
  crumbSeparatorComponent: <Separator />,
  title: 'Breadcrumb',
}

const useAutoGen = true
const usePathPrefix = null

afterEach(cleanup)

describe('Breadcrumb Click Tracking', () => {
  it('Should Render autogen breadcrumb', () => {
    const { getByText } = render(
      <OptionsProvider useAutoGen={useAutoGen} usePathPrefix={usePathPrefix}>
        <BreadcrumbProvider defaultCrumb={null}>
          <Breadcrumb
            title={props.title}
            crumbs={props.breadcrumb.crumbs}
            crumbLabel={props.crumbLabel}
            crumbSeparator={props.crumbSeparatorComponent}
          />
        </BreadcrumbProvider>
      </OptionsProvider>,
    )
    expect(getByText('Home')).toBeTruthy()
    expect(getByText('long')).toBeTruthy()
    expect(getByText('testLabel')).toBeTruthy()
    expect(getByText('Breadcrumb')).toBeTruthy()
  })
  it('Should Render autogen breadcrumb with no title', () => {
    const { getByText, queryByText } = render(
      <OptionsProvider useAutoGen={useAutoGen} usePathPrefix={usePathPrefix}>
        <BreadcrumbProvider defaultCrumb={null}>
          <Breadcrumb
            crumbs={props.breadcrumb.crumbs}
            crumbLabel={props.crumbLabel}
            crumbSeparator={props.crumbSeparator}
          />
        </BreadcrumbProvider>
      </OptionsProvider>,
    )
    expect(getByText('Home')).toBeTruthy()
    expect(getByText('long')).toBeTruthy()
    expect(getByText('testLabel')).toBeTruthy()
    expect(queryByText('Breadcrumb')).toBeNull()
  })
  it('Should render autogen breadcrumb, with disabled long crumb', () => {
    const { container, getByText } = render(
      <OptionsProvider useAutoGen={useAutoGen} usePathPrefix={usePathPrefix}>
        <BreadcrumbProvider defaultCrumb={null}>
          <Breadcrumb
            title={props.title}
            crumbs={props.breadcrumb.crumbs}
            crumbLabel={props.crumbLabel}
            crumbSeparator={props.crumbSeparator}
            disableLinks={['/long']}
          />
        </BreadcrumbProvider>
      </OptionsProvider>,
    )
    expect(getByText('Home')).toBeTruthy()
    expect(getByText('long')).toBeTruthy()
    expect(getByText('testLabel')).toBeTruthy()
    expect(getByText('Breadcrumb')).toBeTruthy()
    expect(container.querySelectorAll('a')).toHaveLength(2)
  })
  it('Should render autogen breadcrumb, with long crumb hidden', () => {
    const { container, getByText, queryByText } = render(
      <OptionsProvider useAutoGen={useAutoGen} usePathPrefix={usePathPrefix}>
        <BreadcrumbProvider defaultCrumb={null}>
          <Breadcrumb
            title={props.title}
            crumbs={props.breadcrumb.crumbs}
            crumbLabel={props.crumbLabel}
            crumbSeparator={props.crumbSeparator}
            hiddenCrumbs={['/long']}
          />
        </BreadcrumbProvider>
      </OptionsProvider>,
    )
    expect(getByText('Home')).toBeTruthy()
    expect(queryByText('long')).toBeNull()
    expect(getByText('testLabel')).toBeTruthy()
    expect(getByText('Breadcrumb')).toBeTruthy()
    expect(container.querySelectorAll('a')).toHaveLength(2)
  })

  it('Should Render autogen breadcrumb using class names', () => {
    const { container, getByText } = render(
      <OptionsProvider useAutoGen={useAutoGen} usePathPrefix={usePathPrefix}>
        <BreadcrumbProvider defaultCrumb={null}>
          <Breadcrumb
            title={props.title}
            crumbs={props.breadcrumb.crumbs}
            crumbLabel={props.crumbLabel}
            crumbSeparator={props.crumbSeparator}
          />
        </BreadcrumbProvider>
      </OptionsProvider>,
    )
    expect(getByText('Home')).toBeTruthy()
    expect(getByText('long')).toBeTruthy()
    expect(getByText('Breadcrumb')).toBeTruthy()
    expect(getByText('testLabel')).toBeTruthy()
    container
      .querySelectorAll('a')
      .forEach((a) => expect(a.getAttribute('style')).toBeNull())
  })

  it('Should Render autogen breadcrumb using class names, with disabled links', () => {
    const { container, getByText } = render(
      <OptionsProvider useAutoGen={useAutoGen} usePathPrefix={usePathPrefix}>
        <BreadcrumbProvider defaultCrumb={null}>
          <Breadcrumb
            title={props.title}
            crumbs={props.breadcrumb.crumbs}
            crumbLabel={props.crumbLabel}
            crumbSeparator={props.crumbSeparator}
            disableLinks={['/long']}
          />
        </BreadcrumbProvider>
      </OptionsProvider>,
    )
    expect(getByText('Home')).toBeTruthy()
    expect(getByText('long')).toBeTruthy()
    expect(getByText('Breadcrumb')).toBeTruthy()
    expect(getByText('testLabel')).toBeTruthy()
    container
      .querySelectorAll('a')
      .forEach((a) => expect(a.getAttribute('style')).toBeNull())
  })
})
