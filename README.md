# gatsby-plugin-breadcrumb

### Breadcrumbs for Gatsby

## Installation

```bash
yarn add gatsby-plugin-breadcrumb
```

or

```bash
npm install gatsby-plugin-breadcrumb
```

### Warning

These docs are for release v2.0.0-alpha.x. If you are still on v1.3.5 or less
please only use `Click Tracking` or `useBreadcrumb`

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

    [Click Tracking example](https://github.com/sbardian/gatsby-plugin-breadcrumb#click-tracking-example)

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

    [Sitemap example](https://github.com/sbardian/gatsby-plugin-breadcrumb#sitemap-example)

- `useBreadcrumb`: The `useBreadcrumb` hook enables you to control your own
  breadcrumbs, by calling `useBreadcrumb` and passing the required object
  properties

  - Add the plugin `gatsby-plugin-breadcrumb`
  - Import and use the `useBreadcrumb` hook, passing the required props object

    [useBreadcrumb example](https://github.com/sbardian/gatsby-plugin-breadcrumb#usebreadcrumb-example)

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

```javascript
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

### Breadcrumb Props for `Click Tracking`

| prop              | type   | description                                     | examples                                                        | required |
| ----------------- | ------ | ----------------------------------------------- | --------------------------------------------------------------- | -------- |
| location          | object | Reach Router location prop                      | See Reach Router location prop, passed by Gatsby to every page. | required |
| crumbLabel        | string | Name for the breadcrumb                         | `"About Us"`                                                    | required |
| title             | string | Title proceeding the breadcrumbs                | `"Breadcrumbs: "`, `">>>"`                                      | optional |
| crumbSeparator    | string | Separator between each breadcrumb               | `" / "`                                                         | optional |
| crumbWrapperStyle | object | CSS object applied to breadcrumb wrapper        | `{ border: '1px solid white' }`                                 | optional |
| crumbStyle        | object | CSS object applied to the current crumb         | `{ color: 'orange' }`                                           | optional |
| crumbActiveStyle  | object | CSS object applied to current crumb when active | `{ color: 'cornflowerblue'}`                                    | optional |

### Other `Click Tracking` options

Instead of adding the `<Breadcrumb>` component to every page, another option
would be to add it to a layout component.

## `Click Tracking` Layout Component Example

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

### SitemapCrumbs Props for `Sitemap`

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
