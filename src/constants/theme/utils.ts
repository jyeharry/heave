import Color from 'color'
import { Colour, SingleColourVariantMap } from './types'

export const generateShades = <T extends Colour>(
  colourName: T,
  colour: Color,
): SingleColourVariantMap<T, string> => {
  const lightness = colour.round().lightness()
  const lightnesses = []

  for (let i = lightness; i < lightness + 100; i += 10) {
    lightnesses.push(i % 100)
  }

  lightnesses.sort((a, b) => b - a).pop()

  return lightnesses.reduce(
    (shades, light, i) => {
      const colourWithShade = `${colourName}${(i + 1) * 100}`
      return {
        ...shades,
        [colourWithShade]: colour.round().lightness(light).string(),
      }
    },
    // TODO: can't for the life of me figure out how to type this without using 'as'
    {} as SingleColourVariantMap<T, string>,
  )
}
