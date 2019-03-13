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

- `Sitemap`: Sitemap will use a sitemap xml file (gererated using
  `gatsby-plugin-sitemap`) to create the breadcrumb.

  - Add the plugin `gatsby-plugin-remove-trailing-slashes`
  - Add the plugin `gatsby-plugin-sitemap` and define the `output` plugin option
  - Run `gatsby build && gatsby serve` to generate the sitemap xml file
  - Add the plugin `gatsby-plugin-breadcrumb` and define the `sitemapPath`
    plugin option
  - Get `crumbs` array from `breadcrumb` object in `pageContext`
  - Import and use the `<SitemapCrumbs>` component, passing the required props
    on pages you wish to see the breadcrumb

    - [Sitemap example](#sitemap-example)
    - [SitemapCrumbs component props](#sitemapcrumbs-props-for-sitemap)

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
    `gatsby-plugin-breadcrumb`,
  ],
}
```

`/pages/aboutus.js`

```jsx
import React from 'react'
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'

export const AboutUs = ({ location, data: { allPageJson } }) => {
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

### Breadcrumb Props

| prop              | type   | description                                     | examples                                                        | required |
| ----------------- | ------ | ----------------------------------------------- | --------------------------------------------------------------- | -------- |
| location          | object | Reach Router location prop                      | See Reach Router location prop, passed by Gatsby to every page. | required |
| crumbLabel        | string | Name for the breadcrumb                         | `"About Us"`                                                    | required |
| title             | string | Title proceeding the breadcrumbs                | `"Breadcrumbs: "`, `">>>"`                                      | optional |
| crumbSeparator    | string | Separator between each breadcrumb               | `" / "`                                                         | optional |
| crumbWrapperStyle | object | CSS object applied to breadcrumb wrapper        | `{ border: '1px solid white' }`                                 | optional |
| crumbStyle        | object | CSS object applied to the current crumb         | `{ color: 'orange' }`                                           | optional |
| crumbActiveStyle  | object | CSS object applied to current crumb when active | `{ color: 'cornflowerblue'}`                                    | optional |

## Other `Click Tracking` options

Instead of adding the `<Breadcrumb>` component to every page, another option
would be to add it to a layout component.

### `Click Tracking` Layout component example

`aboutus.js`

```jsx
import React from 'react'
import Layout from './layout'
...

export const AboutUs = ({location}) => {
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

### `Click Tracking` default crumb example

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

## `Sitemap` example

Add the following plugins to your gatsby-config

`gatsby-config.js`

```javascript
{
  plugins: [
    `gatsby-plugin-remove-trailing-slashes`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/my-site-map.xml`,
      },
    },
  ];
}
```

Run `gatsby build && gatsby serve` to build out the xml sitemap file in the site
`public/` folder. Then add the `gatsby-plugin-breadcrumb` plugin to your
gatsby-config.

`gatsby-config.js`

```javascript
{
  plugins: [
    `gatsby-plugin-remove-trailing-slashes`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/my-site-map.xml`,
      },
    },
    {
      resolve: `gatsby-plugin-breadcrumb`,
      options: {
        sitemapPath: `/my-site-map.xml`,
      },
    },
  ];
}
```

`aboutus.js`

```jsx
import React from 'react'
import { SitemapCrumbs } from 'gatsby-plugin-breadcrumb'

export const Layout = ({pageContext, location, crumbLabel}) => {

  const {
    breadcrumb: { crumbs },
  } = pageContext;

  return (
    <div>
      <Header>
        <main>
          <SitemapCrumbs crumbs={crumbs} crumbSeparator=" - " />
          ...
        </main>
      </Header>
    </div>
  }
}
```

### SitemapCrumbs Props

`Note`: The crumbStyle prop will apply to all the crumbs in the breadcrumb
instead of to individual crumbs, as with `Click Tracking`.

| prop              | type   | description                              | examples                        | required |
| ----------------- | ------ | ---------------------------------------- | ------------------------------- | -------- |
| crumbs            | array  | Array of crumbs return from pageContext  | n/a                             | required |
| title             | string | Title proceeding the breadcrumbs         | `"Breadcrumbs: "`, `">>>"`      | optional |
| crumbSeparator    | string | Separator between each breadcrumb        | `" / "`                         | optional |
| crumbWrapperStyle | object | CSS object applied to breadcrumb wrapper | `{ border: '1px solid white' }` | optional |
| crumbStyle        | object | CSS object applied to all the crumbs     | `{ color: 'orange' }`           | optional |
| crumbActiveStyle  | object | CSS object applied to crumb when active  | `{ color: 'cornflowerblue'}`    | optional |
| ...rest           | object | Any other props you may pass             | n/a: spread accross crumb Link  | optional |

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
import React from 'react';
import MyCustomBreadcrumb from './my-custom-breadcrumb';
import { useBreadcrumb } from 'gatsby-plugin-breadcrumb';

export const AboutUs = ({ location }) => {
  const { crumbs, updateCrumbs } = useBreadcrumb({
    location,
    crumbLabel: 'Home',
    title: '>>>',
    crumbSeparator: ' / ',
  });
  return (
    <div>
      <MyCustomBreadcrumb crumbs={crumbs} />
      ...
    </div>
  );
};
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
- When using `Sitemap` breadcrumbs you must add a page then run
  `gatsby build && gatsby serve` before trying to access the breadcrumb object
  from pageContext. The breadcrumb object builds off the sitemap generated by
  this command. If you try to access the object before running it, it will not
  exist for the new page
- The `<Link>'s` throughout your site need to have `to` properties that match
  your breadcrumb `to` properties for activeStyles to be applied.
