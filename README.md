# gatsby-plugin-breadcrumb

### Breadcrumbs for Gatsby

## Instalation

```
yarn add gatsby-plugin-breadcrumb
```

or

```
npm install gatsby-plugin-breadcrub
```

## Usage

### Built-in Breadcrumb component

There are two ways to use `gatsby-plugin-breadcrumb` to add breadcrumbs to your
Gatsby site:

- Basic use of the `gatsby-plugin-breadcrumb` plugin consists of: - Adding the
  plugin to your `gatsby-config.js`. - Importing and using the `<Breadcrumb>`
  component on pages you wish to have breadcrumbs.

- Custom breadcrumb using `useBreadcrumb` hook: - Adding the plugin to your
  `gatsby-config.js`. - Importing and using the `useBreadcrumb` hook to get and
  update breadcrumbs

### Basic use example:

`gatsby-config.js`

```
{
  plugins: [
    ...
    ...
    ...
    `gatsby-plugin-breadcrumb`,
    ...
    ...
    ...
  ],
}
```

`/pages/index.js`

```javascript
import React from 'react'
import Breadcrumb from 'gatsby-plugin-breadcrumb'

export const AboutUs = ({ location, data: { allPageJson } }) => {
	  ...
    ...
    ...
    return(
    	<div>
        	  ...
            ...
            ...
            <Breadcrumb location={location} crumbLabel="About Us" />
            ...
            ...
            ...
        </div>
    )
}
```

## Breadcrumb component

The `<Breadcrumb>` component provides default breadcrumbs, while also allowing
you to customize those breadcrumbs if you wish.

### Props

| Prop              | type   | description                                     | examples                        | required |
| ----------------- | ------ | ----------------------------------------------- | ------------------------------- | -------- |
| location          | object | Reach Router location prop                      | See Reach Router location prop  | required |
| crumbLabel        | string | Name for the breadcrumb                         | `"About Us"`                    | required |
| title             | string | Title proceeding the breadcrumbs                | `"Breadcrumbs: "`, `">>>"`      | optional |
| crumbSeparator    | string | Separator between each breadcrumb               | `" / "`                         | optional |
| crumbWrapperStyle | object | CSS object applied to breadcrumb wrapper        | `{ border: '1px solid white' }` | optional |
| crumbStyle        | object | CSS object applied to the current crumb         | `{ color: 'orange' }`           | optional |
| crumbActiveStyle  | object | CSS object applied to current crumb when active | `{ color: 'cornflowerblue'}`    | optional |

## Other options

Instead of adding the `<Breadcrumb>` component to every page would be to add it
to a layout component.

### Layout Component Example

`aboutus.js`

```javascript
import React from 'react'
import Layout from './layout'
...

export const AboutUs = ({location}) => {
	return (
    	<Layout location={location} crumbLabel="About Us" >
        ...
        ...
        ...
      </Layout>
  }
}
```

`contact.js`

```javascript
import React from 'react'
import Layout from './layout'
...

export const Contact = ({location}) => {
	return (
    <Layout location={location} crumbLabel="Contact" >
        ...
        ...
        ...
    </Layout>
  }
}
```

`layout.js`

```javascript
import React from 'react'
import Breadcrumb from 'gatsby-plugin-breadcrumb'
...

export const Layout = ({location, crumbLabel}) => {
	return (
    <div>
        <Header>
            <main>
                <Breadcrumb location={location} crumbLabel={crumbLabel} />
                ...
                ...
                ...
            </main>
        </Header>
    </div>
    }
}
```

### Custom breadcrumb use example:

`gatsby-config.js`

```
{
  plugins: [
    ...
    ...
    ...
    `gatsby-plugin-breadcrumb`,
    ...
    ...
    ...
  ],
}
```

`/pages/home.js`

```javascript
import React from 'react'
import MyCustomBreadcrumb from './my-custom-breadcrumb'
import useBreadcrumb from 'gatsby-plugin-breadcrumb'

export const AboutUs = ({ location, data: { allPageJson } }) => {
    ...
    ...
    ...
    const { crumbs, updateCrumbs } = useBreadcrumb({
        location,
        crumbLabel: 'Home',
        title: '>>>',
        crumbSeparator: ' / ',
    });
    ...
    ...
    ...
    return(
    	<div>
        ...
        <MyCustomBreadcrumb crumbs={crumbs} />
        ...
        ...
        ...
        ...
    </div>
    )
}
```

The `useBreadcrumb` hook takes an object with all the same props as the
`<Breadcrumb>` component, and returns the following:

| value        | type     | description                                                          |
| ------------ | -------- | -------------------------------------------------------------------- |
| crumbs       | array    | Array of the current breadcrumbs                                     |
| updateCrumbs | function | function to enable you to manually update crumbs (WIP: wouldn't use) |

The `useBreadcrumb` hook will determine if it needs to add a breadcrumb, remove
a breadcrumb(s), or do nothing, you only need to pass it the required props
(`location`, `crumbLabel`).
