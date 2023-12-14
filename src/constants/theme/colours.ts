import Color from 'color'
import { ColourThemeMap } from './types'
import { generateShades } from './utils'

const colourTheme: ColourThemeMap<string> = (() => {
  const accent1 = Color('#55b38b')
  const accent2 = Color('#296bd3')
  const accent3 = Color('#21d052')
  const danger = Color('hsl(344, 100%, 50%)')
  const grey = Color('hsl(200, 4%, 54%)')
  const info = Color('#21a8a0')
  const primary = Color('hsl(162, 77%, 44%)')
  const secondary = Color('#007c66')
  const success = Color('#00be37')
  const warning = Color('#fbcb00').hsl()

  return {
    accent1: accent1.string(),
    accent2: accent2.string(),
    accent3: accent3.string(),
    danger: danger.string(),
    dark: '#202423',
    grey: grey.string(),
    info: info.string(),
    light: '#e8ebeb',
    primary: primary.string(),
    secondary: secondary.string(),
    success: success.string(),
    warning: warning.string(),
    white: '#f8f8f5',
    ...generateShades('accent1', accent1),
    ...generateShades('accent2', accent2),
    ...generateShades('accent3', accent3),
    ...generateShades('danger', danger),
    ...generateShades('grey', grey),
    ...generateShades('info', info),
    ...generateShades('primary', primary),
    ...generateShades('secondary', secondary),
    ...generateShades('success', success),
    ...generateShades('warning', warning),
  }
})()

const extraColours = {
  grey150: Color(colourTheme.grey).lightness(90).toString(),
}

export const colours = { ...colourTheme, ...extraColours }
