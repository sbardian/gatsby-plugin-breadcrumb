import { onCreatePage } from './gatsby-node'

const actions = {
  createPage: jest.fn(),
  deletePage: jest.fn(),
}

const mockPage = {
  path: '/test',
  context: {},
}

const calledWith = {
  path: '/test',
  context: {
    breadcrumb: {
      crumbs: [
        {
          crumbLabel: 'Home',
          pathname: '/',
        },
        {
          crumbLabel: 'test',
          pathname: '/test',
        },
      ],
      location: '/test',
    },
  },
}

afterEach(() => {
  actions.createPage.mockClear()
  actions.deletePage.mockClear()
})

describe('AutoGen crumbs: ', () => {
  it('should generate autogen crumbs', () => {
    onCreatePage(
      { page: mockPage, actions },
      {
        useAutoGen: true,
      },
    )
    expect(actions.deletePage).toHaveBeenCalledTimes(1)
    expect(actions.deletePage).toHaveBeenCalledWith(mockPage)
    expect(actions.createPage).toHaveBeenCalledTimes(1)
    expect(actions.createPage).toHaveBeenCalledWith(calledWith)
  })
  it('should generage crumbs using pathPrefix', () => {
    onCreatePage(
      { page: mockPage, actions, pathPrefix: '/blog' },
      {
        useAutoGen: true,
      },
    )
    expect(actions.deletePage).toHaveBeenCalledTimes(1)
    expect(actions.deletePage).toHaveBeenCalledWith(mockPage)
    expect(actions.createPage).toHaveBeenCalledTimes(1)
    expect(actions.createPage).toHaveBeenCalledWith(calledWith)
  })
  it('should not generate auto crumbs, no useAutoGen', () => {
    onCreatePage(
      {
        page: {
          path: '/test',
          context: {},
        },
        actions,
      },
      {},
    )
    expect(actions.deletePage).not.toHaveBeenCalled()
    expect(actions.createPage).not.toHaveBeenCalled()
  })
  it('should not generate auto crumbs, exlude', () => {
    onCreatePage({ page: { path: '/404', context: {} }, actions }, {})
    expect(actions.deletePage).not.toHaveBeenCalled()
    expect(actions.createPage).not.toHaveBeenCalled()
  })
})
