import createGenerateClassName from '@material-ui/core/styles/createGenerateClassName'

export const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: false,
  productionPrefix: 'c'
})
