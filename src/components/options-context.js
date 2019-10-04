/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import PropTypes from 'prop-types'

export const OptionsContext = React.createContext('Options')

export const OptionsProvider = ({
  children,
  useClassNames = false,
  useAutoGen = false,
}) => {
  const options = {
    useClassNames,
    useAutoGen,
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
}

OptionsProvider.propTypes = {
  children: PropTypes.node.isRequired,
  useClassNames: PropTypes.bool,
  useAutoGen: PropTypes.bool,
}
