[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=for-the-badge)](https://github.com/semantic-release/semantic-release)
[![Version](https://img.shields.io/npm/v/gatsby-plugin-breadcrumb.svg?style=for-the-badge)](https://www.npmjs.com/package/gatsby-plugin-breadcrumb)
[![Downloads](https://img.shields.io/npm/dt/gatsby-plugin-breadcrumb.svg?style=for-the-badge)](https://www.npmjs.com/package/gatsby-plugin-breadcrumb)
[![License](https://img.shields.io/npm/l/gatsby-plugin-breadcrumb.svg?style=for-the-badge)](https://www.npmjs.com/package/gatsby-plugin-breadcrumb)
[![Issues](https://img.shields.io/github/issues-raw/sbardian/gatsby-plugin-breadcrumb.svg?style=for-the-badge)](https://github.com/sbardian/gatsby-plugin-breadcrumb/issues)
[![Release Date](https://img.shields.io/github/release-date/sbardian/gatsby-plugin-breadcrumb.svg?style=for-the-badge)](https://github.com/sbardian/gatsby-plugin-breadcrumb)

# gatsby-plugin-breadcrumb

### Breadcrumbs for Gatsby

Add Breadcrumbs to your Gatsby Site!

- [Installation](https://github.com/sbardian/gatsby-plugin-breadcrumb#installation)
- [Demo](https://github.com/sbardian/gatsby-plugin-breadcrumb#demo)
- [Usage](https://github.com/sbardian/gatsby-plugin-breadcrumb#usage)
- [Gotchas](https://github.com/sbardian/gatsby-plugin-breadcrumb#gotchas)

## Installation

```bash
yarn add gatsby-plugin-breadcrumb
```

or

```bash
npm install gatsby-plugin-breadcrumb
```

## Demo

CodeSandbox.io [Demo](https://codesandbox.io/s/50o4zwm91l)

# \* Warning: `<SitemapCrumbs />` component has been deprecated and replaced by the `<Breadcrumb />`

The `<SitemapCrumbs />` component has been deprecated and will be removed in
version 6. This will simplify the API so you always use the `<Breadcrumb />`
component, reguardless of the way you are using `gatsby-plugin-breadcrumb`
(Click Tracking or AutoGen (new Sitemap method)). Please update using the
`<Breadcrumb />` component if you are currently using the `<SitemapCrumbs />`
component or AutoGen method method of populating your breadcrumbs.

## Usage

There are three ways to use `gatsby-plugin-breadcrumb` to add breadcrumbs to
your Gatsby site:

- `Click Tracking`: Click tracking creates a breadcrumb of out of the path taken
  (clicked) by the user.

  - Add the plugin to your `gatsby-config.js`
  - Import and use the `<Breadcrumb>` component, passing the required props on
    pages you wish to see the breadcrumb.

    - [Click Tracking example](#click-tracking-example)
    - [Breadcrumb props](#breadcrumb-props)
    - [Breadcrumb with Layout component](#click-tracking-layout-component-example)
    - [Breadcrumb with default crumb](#click-tracking-default-crumb-example)

- `AutoGen` (Auto Generated): AutoGen will generate breadcrumbs for each page
  and inject them into pages `pageContext` prop under the `breadcrumb` property.

  - Add the plugin `gatsby-plugin-remove-trailing-slashes`
  - Add the plugin `gatsby-plugin-breadcrumb` and define the `useAutoGen` plugin
    option to `true`
  - Get `crumbs` array from `breadcrumb` object in `pageContext`
  - Import and use the `<AutoGenCrumb>` component, passing the required props on
    pages you wish to see the breadcrumb

    - [AutoGen example](#autogen-example)
    - [AutoGenCrumb component props](#autogencrumb-props-for-autogen)

- `useBreadcrumb`: The `useBreadcrumb` hook enables you to control your own
  breadcrumbs, by calling `useBreadcrumb` and passing the required object
  properties

  - Add the plugin `gatsby-plugin-breadcrumb`
  - Import and use the `useBreadcrumb` hook, passing the required props object

    - [useBreadcrumb example](#usebreadcrumb-example)
    - [useBreadcrumb props/returns](#useBreadcrumb-props-and-returns)

## `Click Tracking` example:

`gatsby-config.js`

```javascript
{
  plugins: [
    {
      resolves: `gatsby-plugin-breadcrumb`,
      options: {
        // optional: To create a defaul crumb
        // see Click Tracking default crumb example below
        defaultCrumb: {
          location: {
            state: { crumbClicked: false },
            pathname: "/",
          },
          crumbLabel: "HomeCustom",
          crumbSeparator: " / ",
          crumbStyle: { color: "#666" },
          crumbActiveStyle: { color: "orange" },
        },
        // optional: switch to className styling
        // see Click Tracking useClassNames example below
        useClassNames: true,
      }
    }
  ],
}
```

`/pages/aboutus.js`

```jsx
import React from 'react'
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'

export const AboutUs = ({ location }) => {
  ...
  return(
    <div>
      <Breadcrumb location={location} crumbLabel="About Us" />
      ...
    </div>
  )
}
```

### Breadcrumb component with `Click Tracking`

The `<Breadcrumb>` component provides default breadcrumbs, while also allowing
you to customize those breadcrumbs if you wish.

### Breadcrumb Props with `Click Tracking`

| prop              | type   | description                                     | examples                                                        | required | useClassNames disables |
| ----------------- | ------ | ----------------------------------------------- | --------------------------------------------------------------- | -------- | ---------------------- |
| location          | object | Reach Router location prop                      | See Reach Router location prop, passed by Gatsby to every page. | required |                        |
| crumbLabel        | string | Name for the breadcrumb                         | `"About Us"`                                                    | required |                        |
| title             | string | Title proceeding the breadcrumbs                | `"Breadcrumbs: "`, `">>>"`                                      | optional |                        |
| crumbSeparator    | string | Separator between each breadcrumb               | `" / "`                                                         | optional |                        |
| crumbWrapperStyle | object | CSS object applied to breadcrumb wrapper        | `{ border: '1px solid white' }`                                 | optional | x                      |
| crumbStyle        | object | CSS object applied to the current crumb         | `{ color: 'orange' }`                                           | optional | x                      |
| crumbActiveStyle  | object | CSS object applied to current crumb when active | `{ color: 'cornflowerblue'}`                                    | optional | x                      |

## Other `Click Tracking` options

Instead of adding the `<Breadcrumb>` component to every page, another option
would be to add it to a layout component.

### `Click Tracking` Layout component example

`aboutus.js`

```jsx
import React from 'react'
import Layout from './layout'
...

export const AboutUs = ({ location }) => {
  return (
    <Layout location={location} crumbLabel="About Us" >
      ...
    </Layout>
  }
}
```

`contact.js`

```jsx
import React from 'react'
import Layout from './layout'

export const Contact = ({location}) => {
  return (
    <Layout location={location} crumbLabel="Contact" >
    ...
    </Layout>
  }
}
```

`layout.js`

```jsx
import React from 'react'
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'

export const Layout = ({location, crumbLabel}) => {
  return (
    <div>
      <Header>
        <main>
          <Breadcrumb location={location} crumbLabel={crumbLabel} />
          ...
        </main>
      </Header>
    </div>
  }
}
```

### Click Tracking `defaultCrumb` example

While using the `Click Tracking` option with the `<Breadcrumb>` component, if a
user goes directly to a page, your breadcrumb will start with that page. You may
want to always provide a default or `Home` breadcrumb. You can do this by adding
options to the plugin. We must structure the `default` breadcrumb we provide in
the plugin options in a way our context is expecting, see below for an example
using all available options.

```javascript
  {
    resolve: `gatsby-plugin-breadcrumb`,
    options: {
      defaultCrumb: {
        location: {
          state: { crumbClicked: false },
          pathname: "/",
        },
        crumbLabel: "Home",
        crumbSeparator: " / ",
        crumbStyle: { color: "#666" },
        crumbActiveStyle: { color: "orange" },
      },
    },
  },
```

### `useClassNames` example with `Click Tracking`

By default `gatsby-plugin-breadcrumb` uses CSS in JS. Allowing you to pass
styles as props to the `Breadcrumb` component. You can disable this behavior
(and default styles) by passing the `useClassNames: true` plugin option. This
will disable any default styling of the component and allow you to use CSS to
style your breadcrumbs. Here is a list of the classes used with the `Breadcrumb`
component:

| class                      | description                                    |
| -------------------------- | ---------------------------------------------- |
| `breadcrumb__title`        | Applied to the breadcrumb title (if supplied)  |
| `breadcrumb`               | Applied to the breadcrumb wrapping div         |
| `breadcrumb__link`         | Applied to the link of the breadcrumb          |
| `breadcrumb__link__active` | Applied to the link when active (current link) |

`gatsby-config.js` example

```javascript
{
  siteMetadata: {
    // siteUrl: required (Gotcha: do not include a trailing slash at the end)
    siteUrl: "http://localhost:8000",
  },
  plugins: [
    `gatsby-plugin-remove-trailing-slashes`,
    {
      resolve: `gatsby-plugin-breadcrumb`,
      options: {
        defaultCrumb: {
          location: {
            state: { crumbClicked: false },
            pathname: "/",
          },
          crumbLabel: "Home",
          crumbSeparator: " - ",
      },
        useClassNames: true,
     },
  ]
}
```

## `AutoGen` example

`AutoGen` (Auto Generated, previously `Sitemap`) used to rely on
`gatsby-plugin-sitemap`, which creates a sitmap XML file in the `/public` folder
of your site at the end of the site build. This caused problems when deploying
to services like Netlify, as the XML file was not created when we needed to try
to read from it, causing the build to fail. Now `AutoGen` generates the
breadcrumbs as pages are created.

Install `gatsby-plugin-remove-trailing-slashes`

npm

```bash
npm install gatsby-plugin-remove-trailing-slashes
```

yarn

```bash
yarn add gatsby-plugin-remove-trailing-slashes
```

Add the following to your gatsby-config

`gatsby-config.js`

```javascript
{
  siteMetadata: {
    // siteUrl: required (Gotcha: do not include a trailing slash at the end)
    siteUrl: "http://localhost:8000",
  },
  plugins: [
    `gatsby-plugin-remove-trailing-slashes`,
    {
      resolve: `gatsby-plugin-breadcrumb`,
      options: {
        // useAutoGen: required 'true' to use autogen
        useAutoGen: true,
        // autoGenHomeLabel: optional 'Home' is default
        autoGenHomeLabel: `Root`,
        // exlude: optional, include to overwrite default excluded pages
        exclude: [
          `/dev-404-page`,
          `/404`,
          `/404.html`,
          `/offline-plugin-app-shell-fallback`,
        ],
        // optional: switch to className styling
        // see AutoGenCrumb useClassNames example below
        useClassNames: true,
     },
  ]
}
```

### `Breadcrumb` component example with `AutoGen`

`/pages/about-us.js`

```jsx
import React from 'react'
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'

export const AboutUs = ({ pageContext, location }) => {
  const {
    breadcrumb: { crumbs },
  } = pageContext

  // Example of dynamically using location prop as a crumbLabel
  const customCrumbLabel = location.pathname.toLowerCase().replace('-', ' ')

  return (
    <div>
      <Header>
        <main>
          <Breadcrumb
            crumbs={crumbs}
            crumbSeparator=" - "
            crumbLabel={customCrumbLabel}
          />
          ...
        </main>
      </Header>
    </div>
  )
}
```

### `Breadcrumb` Props with `AutoGen`

`Note`: The crumbStyle prop will apply to all the crumbs in the breadcrumb
instead of to individual crumbs, as with `Click Tracking`.

| prop              | type   | description                              | examples                        | required | useClassNames disables |
| ----------------- | ------ | ---------------------------------------- | ------------------------------- | -------- | ---------------------- |
| crumbs            | array  | Array of crumbs return from pageContext  | n/a                             | required |                        |
| title             | string | Title proceeding the breadcrumbs         | `"Breadcrumbs: "`, `">>>"`      | optional |                        |
| crumbSeparator    | string | Separator between each breadcrumb        | `" / "`                         | optional |                        |
| crumbLabel        | string | Override crumb label from xml path       | `"About Us"`                    | optional |                        |
| crumbWrapperStyle | object | CSS object applied to breadcrumb wrapper | `{ border: '1px solid white' }` | optional | x                      |
| crumbStyle        | object | CSS object applied to all the crumbs     | `{ color: 'orange' }`           | optional | x                      |
| crumbActiveStyle  | object | CSS object applied to crumb when active  | `{ color: 'cornflowerblue'}`    | optional | x                      |
| ...rest           | object | Any other props you may pass             | n/a: spread accross crumb Link  | optional |                        |

### `useClassNames` example with `AutoGen`

By default `gatsby-plugin-breadcrumb` uses CSS in JS. Allowing you to pass
styles as props to the `Breadcrumb` component. You can disable this behavior
(and default styles) by passing the `useClassNames: true` plugin option. This
will disable any default styling of the component and allow you to use CSS to
style your breadcrumbs. Here is a list of the classes used with the `Breadcrumb`
component:

| class                      | description                                    |
| -------------------------- | ---------------------------------------------- |
| `breadcrumb__title`        | Applied to the breadcrumb title (if supplied)  |
| `breadcrumb`               | Applied to the breadcrumb wrapping div         |
| `breadcrumb__link`         | Applied to the link of the breadcrumb          |
| `breadcrumb__link__active` | Applied to the link when active (current link) |

`gatsby-config.js` example

```javascript
{
  siteMetadata: {
    // siteUrl: required (Gotcha: do not include a trailing slash at the end)
    siteUrl: "http://localhost:8000",
  },
  plugins: [
    `gatsby-plugin-remove-trailing-slashes`,
    {
      resolve: `gatsby-plugin-breadcrumb`,
      options: {
        useAutoGen: true,
        useClassNames: true,
     },
  ]
}
```

## `useBreadcrumb` example:

`gatsby-config.js`

```javascript
{
  plugins: [
    `gatsby-plugin-breadcrumb`,
  ],
}
```

`/pages/home.js`

```jsx
import React from 'react'
import MyCustomBreadcrumb from './my-custom-breadcrumb'
import { useBreadcrumb } from 'gatsby-plugin-breadcrumb'

export const AboutUs = ({ location }) => {
  const { crumbs, updateCrumbs } = useBreadcrumb({
    location,
    crumbLabel: 'About Us',
    crumbSeparator: ' / ',
  })
  return (
    <div>
      <MyCustomBreadcrumb crumbs={crumbs} />
      ...
    </div>
  )
}
```

### `useBreadcrumb` props and returns

The `useBreadcrumb` hook takes an object with the following props:

| prop             | type   | description                                     | examples                                                        | required |
| ---------------- | ------ | ----------------------------------------------- | --------------------------------------------------------------- | -------- |
| location         | object | Reach Router location prop                      | See Reach Router location prop, passed by Gatsby to every page. | required |
| crumbLabel       | string | Name for the breadcrumb                         | `"About Us"`                                                    | required |
| crumbSeparator   | string | Separator between each breadcrumb               | `" / "`                                                         | optional |
| crumbStyle       | object | CSS object applied to the current crumb         | `{ color: 'orange' }`                                           | optional |
| crumbActiveStyle | object | CSS object applied to current crumb when active | `{ color: 'cornflowerblue'}`                                    | optional |

`useBreadcrumb` returns the following:

| value        | type     | description                                                                                                             |
| ------------ | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| crumbs       | array    | Array of the current breadcrumbs                                                                                        |
| updateCrumbs | function | function to enable you to manually update crumbs (The hook should handle this, only use if you know what you are doing) |

The `useBreadcrumb` hook will determine if it needs to add, remove, or do
nothing with the breadcrumbs based on the location you pass. You only need to
pass it the required props (`location`, `crumbLabel`).

## Gotchas

Here are a few gotchas we have noticed. If you notice any more you think should
be mentioned here submit a PR, or just let us know!

- In your `gatsby-config.js` option `siteMetaData.siteUrl` be sure to remove any
  trailing slashes

- The `<Link>'s` throughout your site need to have `to` properties that match
  your breadcrumb `to` properties for activeStyles to be applied.
