[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=for-the-badge)](https://github.com/semantic-release/semantic-release)
[![Version](https://img.shields.io/npm/v/gatsby-plugin-breadcrumb.svg?style=for-the-badge)](https://www.npmjs.com/package/gatsby-plugin-breadcrumb)
[![Downloads](https://img.shields.io/npm/dt/gatsby-plugin-breadcrumb.svg?style=for-the-badge)](https://www.npmjs.com/package/gatsby-plugin-breadcrumb)
[![License](https://img.shields.io/npm/l/gatsby-plugin-breadcrumb.svg?style=for-the-badge)](https://www.npmjs.com/package/gatsby-plugin-breadcrumb)
[![Issues](https://img.shields.io/github/issues-raw/sbardian/gatsby-plugin-breadcrumb.svg?style=for-the-badge)](https://github.com/sbardian/gatsby-plugin-breadcrumb/issues)
[![Release Date](https://img.shields.io/github/release-date/sbardian/gatsby-plugin-breadcrumb.svg?style=for-the-badge)](https://github.com/sbardian/gatsby-plugin-breadcrumb)
![](https://img.shields.io/coveralls/github/sbardian/gatsby-plugin-breadcrumb/develop.svg?style=for-the-badge)

# gatsby-plugin-breadcrumb

### Breadcrumbs for Gatsby

- [Installation](https://github.com/sbardian/gatsby-plugin-breadcrumb#installation)
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

## Usage

There are two ways to use `gatsby-plugin-breadcrumb` to add breadcrumbs to your
Gatsby site: Click Tracking and AutoGen.

### Click Tracking

Click tracking creates a breadcrumb of out of the path taken (clicked) by the
user. The two ways to use click tracking are:

- Using the `<Breadcrumb />` component:

  - Add the plugin `gatsby-plugin-breadcrumb` to your `gatsby-config.js`
  - Import and use the `<Breadcrumb />` component, passing the required props,
    on pages you wish to see the breadcrumb.

    - [Click Tracking example](#click-tracking-example)
    - [Breadcrumb props](#breadcrumb-props-with-click-tracking)
    - [Breadcrumb with Layout component](#click-tracking-layout-component-example)
    - [Breadcrumb with default crumb](#click-tracking-defaultcrumb-example)
    - [Breadcrumb using classes](#useclassnames-example-with-click-tracking)

- Using the `useBreadcrumb` hook: The `useBreadcrumb` hook enables you to
  control your own breadcrumbs, by calling `useBreadcrumb` and passing the
  required object properties. Using the hook enables you to pass the breadcrumbs
  to your own custom Breadcrumb component, but still take advantage of
  `gatsby-plugin-breadcrumbs` click tracking logic.

  - Add the plugin `gatsby-plugin-breadcrumb` to your `gatsby-config.js`
  - Import and use the `useBreadcrumb` hook, passing the required object
    properties.

    - [useBreadcrumb example](#usebreadcrumb-example)
    - [useBreadcrumb props/returns](#usebreadcrumb-arguments-and-returns)

### AutoGen

AutoGen (Auto Generated) will generate breadcrumbs for each page and inject them
into Gatsby page `pageContext` prop under the `breadcrumb` property.

- Add the plugin `gatsby-plugin-breadcrumb` to your `gatsby-config.js` and
  define the `useAutoGen` plugin option to `true`
- Get `crumbs` array from `breadcrumb` object in `pageContext`
- Import and use the `<Breadcrumb />` component, passing the required props on
  pages you wish to see the breadcrumb

  - [AutoGen example](#autogen-example)
  - [Breadcrumb props](#breadcrumb-props-with-autogen)
  - [Breadcrumb using classes](#useclassnames-example-with-autogen)

> Use of the `<Breadcrumb />` component is not a requirement. If you want to
> create your own breadcrumb component, and pass it the breadcrumb data from
> `pageContext`, this is always an option.

## Click Tracking example:

CodeSandbox.io [Demo](https://codesandbox.io/s/50o4zwm91l)

gatsby-config.js

```javascript
{
  // optional: if you are using path prefix, see plugin option below
  pathPrefix: '/blog',
  plugins: [
    {
      resolve: `gatsby-plugin-breadcrumb`,
      options: {
        // optional: To create a default crumb
        // see Click Tracking default crumb example below
        defaultCrumb: {
          location: {
            pathname: "/",
          },
          crumbLabel: "HomeCustom",
          crumbSeparator: " / ",
          crumbStyle: { color: "#666" },
          crumbActiveStyle: { color: "orange" },
        },
        // optional: switch to className styling
        // see `useClassNames example with Click Tracking` below
        useClassNames: true,
        // optional: if you are using path prefix
        usePathPrefix: '/blog',
      }
    }
  ],
}
```

/pages/aboutus.js

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

### Breadcrumb component with Click Tracking

The `<Breadcrumb />` component provides default breadcrumbs, while also allowing
you to customize those breadcrumbs if you wish.

### Breadcrumb Props with Click Tracking

| prop              | type   | description                                     | examples                                                        | required | useClassNames disables |
| ----------------- | ------ | ----------------------------------------------- | --------------------------------------------------------------- | -------- | ---------------------- |
| location          | object | Reach Router location prop                      | See Reach Router location prop, passed by Gatsby to every page. | required |                        |
| crumbLabel        | string | Name for the breadcrumb                         | `"About Us"`                                                    | required |                        |
| title             | string | Title preceding the breadcrumbs                 | `"Breadcrumbs: "`, `">>>"`                                      | optional |                        |
| crumbSeparator    | string | Separator between each breadcrumb               | `" / "`                                                         | optional |                        |
| crumbWrapperStyle | object | CSS object applied to breadcrumb wrapper        | `{ border: '1px solid white' }`                                 | optional | x                      |
| crumbStyle        | object | CSS object applied to the current crumb         | `{ color: 'orange' }`                                           | optional | x                      |
| crumbActiveStyle  | object | CSS object applied to current crumb when active | `{ color: 'cornflowerblue'}`                                    | optional | x                      |

### Other Click Tracking options

Instead of adding the `<Breadcrumb />` component to every page, another option
would be to add it to a layout component.

### Click Tracking Layout component example

CodeSandbox.io [Demo](https://codesandbox.io/s/breadcrumb-with-layout-ce0rp)

/pages/aboutus.js

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

/pages/contact.js

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

/components/layout.js

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

### Click Tracking defaultCrumb example

While using the Click Tracking option with the `<Breadcrumb />` component, if a
user goes directly to a page, your breadcrumb will start with that page. You may
want to always provide a default or "Home" breadcrumb. You can do this by adding
a `defaultCrumb` plugin option. We must structure the `defaultCrumb` breadcrumb
we provide in a way our context is expecting, see below for an example using all
available options.

```javascript
  {
    resolve: `gatsby-plugin-breadcrumb`,
    options: {
      defaultCrumb: {
        // location: required and must include the pathname property
        location: {
          pathname: "/",
        },
        // crumbLabel: required label for the default crumb
        crumbLabel: "Home",
        // all other properties optional
        crumbSeparator: " / ",
        crumbStyle: { color: "#666" },
        crumbActiveStyle: { color: "orange" },
      },
    },
  },
```

### useClassNames example with Click Tracking

By default `gatsby-plugin-breadcrumb` uses CSS in JS. Allowing you to pass
styles as props to the `Breadcrumb` component. You can disable this behavior
(and default styles) by passing the `useClassNames: true` plugin option. This
will disable any default styling of the component and allow you to use CSS to
style your breadcrumbs. Here is a list of the classes used with the
`<Breadcrumb />` component:

| class                      | description                                    |
| -------------------------- | ---------------------------------------------- |
| `breadcrumb__title`        | Applied to the breadcrumb title (if supplied)  |
| `breadcrumb`               | Applied to the breadcrumb wrapping div         |
| `breadcrumb__link`         | Applied to the link of the breadcrumb          |
| `breadcrumb__link__active` | Applied to the link when active (current link) |

gatsby-config.js

```javascript
{
  siteMetadata: {
    // siteUrl: required (Gotcha: do not include a trailing slash at the end)
    siteUrl: "http://localhost:8000",
  },
  plugins: [
    {
      resolve: `gatsby-plugin-breadcrumb`,
      options: {
        defaultCrumb: {
          location: {
            pathname: "/",
          },
          crumbLabel: "Home",
          crumbSeparator: " - ",
      },
        // required to enable classNames
        useClassNames: true,
     },
  ]
}
```

### useBreadcrumb example:

gatsby-config.js

```javascript
{
  plugins: [
    `gatsby-plugin-breadcrumb`,
  ],
}
```

/pages/about-us.js

```jsx
import React from 'react'
import MyCustomBreadcrumb from './my-custom-breadcrumb'
import { useBreadcrumb } from 'gatsby-plugin-breadcrumb'

export const AboutUs = ({ location }) => {
  const { crumbs } = useBreadcrumb({
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

### useBreadcrumb arguments and returns

The `useBreadcrumb` hook takes an object with the following properties:

| prop             | type   | description                                     | examples                                                        | required |
| ---------------- | ------ | ----------------------------------------------- | --------------------------------------------------------------- | -------- |
| location         | object | Reach Router location prop                      | See Reach Router location prop, passed by Gatsby to every page. | required |
| crumbLabel       | string | Name for the breadcrumb                         | `"About Us"`                                                    | required |
| crumbSeparator   | string | Separator between each breadcrumb               | `" / "`                                                         | optional |
| crumbStyle       | object | CSS object applied to the current crumb         | `{ color: 'orange' }`                                           | optional |
| crumbActiveStyle | object | CSS object applied to current crumb when active | `{ color: 'cornflowerblue'}`                                    | optional |

`useBreadcrumb` returns the following:

| value  | type  | description                      |
| ------ | ----- | -------------------------------- |
| crumbs | array | Array of the current breadcrumbs |

The `useBreadcrumb` hook will determine if it needs to add, remove, or do
nothing with the breadcrumbs based on the location you pass. You only need to
pass it the required props (`location`, `crumbLabel`).

## AutoGen example

Codesandbox.io [Demo](https://codesandbox.io/s/auto-generated-breadcrumbs-m5p5t)

AutoGen (Auto Generated, previously Sitemap) used to rely on
`gatsby-plugin-sitemap`, which creates a sitmap XML file in the `/public` folder
of your site at the end of the site build. This caused problems when deploying
to services like Netlify, as the XML file was not created when we needed to try
to read from it, causing the build to fail. Now AutoGen generates the
breadcrumbs as pages are created. We also no longer require the
`gatsby-plugin-remove-trailing-slashes` plugin.

Add the following to your gatsby-config

gatsby-config.js

```javascript
{
  // optional: if you are using path prefix, see plugin option below
  pathPrefix: '/blog',
  siteMetadata: {
    // siteUrl: required (Gotcha: do not include a trailing slash at the end)
    siteUrl: "http://localhost:8000",
  },
  plugins: [
    {
      resolve: `gatsby-plugin-breadcrumb`,
      options: {
        // useAutoGen: required 'true' to use autogen
        useAutoGen: true,
        // autoGenHomeLabel: optional 'Home' is default
        autoGenHomeLabel: `Root`,
        // exlude: optional, include to overwrite these default excluded pages
        exclude: [
          `/dev-404-page`,
          `/404`,
          `/404.html`,
          `/offline-plugin-app-shell-fallback`,
        ],
        // updateCrumbLabels: optional, update specific crumbLabels in the path
        updateCrumbLabels: [
          {
            pathname: '/book',
            crumbLabel: 'Books'
          }
        ]
        // optional: switch to className styling
        // see `useClassNames example with `AutoGen` below
        useClassNames: true,
        // optional: if you are using path prefix
        usePathPrefix: '/blog',
     },
  ]
}
```

### Breadcrumb component example with AutoGen

/pages/about-us.js

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

### Breadcrumb Props with AutoGen

Note: The crumbStyle prop will apply to all the crumbs in the breadcrumb instead
of to individual crumbs, as with Click Tracking.

| prop              | type   | description                                   | examples                        | required | useClassNames disables |
| ----------------- | ------ | --------------------------------------------- | ------------------------------- | -------- | ---------------------- |
| crumbs            | array  | Array of crumbs return from pageContext       | n/a                             | required |                        |
| title             | string | Title preceding the breadcrumbs               | `"Breadcrumbs: "`, `">>>"`      | optional |                        |
| crumbSeparator    | string | Separator between each breadcrumb             | `" / "`                         | optional |                        |
| crumbLabel        | string | Override crumb label from xml path            | `"About Us"`                    | optional |                        |
| crumbWrapperStyle | object | CSS object applied to breadcrumb wrapper      | `{ border: '1px solid white' }` | optional | x                      |
| crumbStyle        | object | CSS object applied to all the crumbs          | `{ color: 'orange' }`           | optional | x                      |
| crumbActiveStyle  | object | CSS object applied to crumb when active       | `{ color: 'cornflowerblue'}`    | optional | x                      |
| hiddenCrumbs      | array  | pathnames of crumbs to hide                   | `['/books']`                    | optional |                        |
| disableLinks      | array  | pathnames of crumbs to show, but not be links | `['/books']`                    | optional |                        |
| ...rest           | object | Any other props you may pass                  | n/a: spread accross crumb Link  | optional |                        |

> For an example on using `disableLinks/hiddenCrumbs` see
> https://github.com/sbardian/books

### useClassNames example with AutoGen

By default `gatsby-plugin-breadcrumb` uses CSS in JS. Allowing you to pass
styles as props to the `Breadcrumb` component. You can disable this behavior
(and default styles) by passing the `useClassNames: true` plugin option. This
will disable any default styling of the component and allow you to use CSS to
style your breadcrumbs. Here is a list of the classes used with the
`<Breadcrumb />` component:

| class                        | description                                    |
| ---------------------------- | ---------------------------------------------- |
| `breadcrumb__title`          | Applied to the breadcrumb title (if supplied)  |
| `breadcrumb`                 | Applied to the breadcrumb wrapping div         |
| `breadcrumb__link`           | Applied to the link of the breadcrumb          |
| `breadcrumb__link__active`   | Applied to the link when active (current link) |
| `breadcrumb__link__disabled` | Applied to crumbs that have links disabled     |

gatsby-config.js

```javascript
{
  siteMetadata: {
    // siteUrl: required (Gotcha: do not include a trailing slash at the end)
    siteUrl: "http://localhost:8000",
  },
  plugins: [
    {
      resolve: `gatsby-plugin-breadcrumb`,
      options: {
        useAutoGen: true,
        useClassNames: true,
     },
  ]
}
```

## Gotchas

Here are a few gotchas. If you notice any more you think should be mentioned
here submit a PR or create an issue.

- In your `gatsby-config.js` option `siteMetaData.siteUrl` be sure to remove any
  trailing slashes

- The `<Link />'s` throughout your site need to have `to` properties that match
  your breadcrumb `to` properties for activeStyles to be applied.
