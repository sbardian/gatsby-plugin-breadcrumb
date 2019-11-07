/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import PropTypes from 'prop-types'

export const OptionsContext = React.createContext('Options')

export const OptionsProvider = ({
  children,
  useClassNames = false,
  useAutoGen = false,
  usePathPrefix = null,
}) => {
  const options = {
    useClassNames,
    useAutoGen,
    usePathPrefix,
  }

  return (
    <OptionsContext.Provider value={options}>
      {children}
    </OptionsContext.Provider>
  )
}

export const OptionsConsumer = OptionsContext.Consumer

OptionsProvider.defaultProps = {
  useClassNames: false,
  useAutoGen: false,
  usePathPrefix: null,
}

OptionsProvider.propTypes = {
  children: PropTypes.node.isRequired,
  useClassNames: PropTypes.bool,
  useAutoGen: PropTypes.bool,
  usePathPrefix: PropTypes.string,
}
