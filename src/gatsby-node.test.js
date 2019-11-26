import { onCreatePage } from './gatsby-node'

const actions = {
  createPage: jest.fn(),
  deletePage: jest.fn(),
}

const mockPageShortPath = {
  path: '/test',
  context: {},
}

const mockPageEmptyPath = {
  path: '/test//',
}

const mockPageLongPath = {
  path: '/long/test',
}

const calledWithShort = {
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

const calledWithEmptyPath = {
  path: '/test//',
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
      location: '/test//',
    },
  },
}

const calledWithLong = {
  path: '/long/test',
  context: {
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
  },
}

afterEach(() => {
  actions.createPage.mockClear()
  actions.deletePage.mockClear()
})

describe('AutoGen crumbs: ', () => {
  it('should generate autogen crumbs short path', () => {
    onCreatePage(
      { page: mockPageShortPath, actions },
      {
        useAutoGen: true,
      },
    )
    expect(actions.deletePage).toHaveBeenCalledTimes(1)
    expect(actions.deletePage).toHaveBeenCalledWith(mockPageShortPath)
    expect(actions.createPage).toHaveBeenCalledTimes(1)
    expect(actions.createPage).toHaveBeenCalledWith(calledWithShort)
  })
  it('should generate autogen crumbs excluding empty crumb', () => {
    onCreatePage(
      { page: mockPageEmptyPath, actions },
      {
        useAutoGen: true,
      },
    )
    expect(actions.deletePage).toHaveBeenCalledTimes(1)
    expect(actions.deletePage).toHaveBeenCalledWith(mockPageEmptyPath)
    expect(actions.createPage).toHaveBeenCalledTimes(1)
    expect(actions.createPage).toHaveBeenCalledWith(calledWithEmptyPath)
  })
  it('should generate autogen crumbs long path', () => {
    onCreatePage(
      { page: mockPageLongPath, actions },
      {
        useAutoGen: true,
      },
    )
    expect(actions.deletePage).toHaveBeenCalledTimes(1)
    expect(actions.deletePage).toHaveBeenCalledWith(mockPageLongPath)
    expect(actions.createPage).toHaveBeenCalledTimes(1)
    expect(actions.createPage).toHaveBeenCalledWith(calledWithLong)
  })
  it('should generage crumbs using pathPrefix', () => {
    onCreatePage(
      { page: mockPageShortPath, actions, pathPrefix: '/blog' },
      {
        useAutoGen: true,
      },
    )
    expect(actions.deletePage).toHaveBeenCalledTimes(1)
    expect(actions.deletePage).toHaveBeenCalledWith(mockPageShortPath)
    expect(actions.createPage).toHaveBeenCalledTimes(1)
    expect(actions.createPage).toHaveBeenCalledWith(calledWithShort)
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
