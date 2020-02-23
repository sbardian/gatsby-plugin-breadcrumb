/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import PropTypes from 'prop-types'

export const OptionsContext = React.createContext('Options')

export const OptionsProvider = ({
  children,
  useAutoGen = false,
  usePathPrefix = null,
}) => {
  const options = {
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
  useAutoGen: false,
  usePathPrefix: null,
}

OptionsProvider.propTypes = {
  children: PropTypes.node.isRequired,
  useAutoGen: PropTypes.bool,
  usePathPrefix: PropTypes.string,
}
