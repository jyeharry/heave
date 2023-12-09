export type Colour =
  | 'accent1'
  | 'accent2'
  | 'accent3'
  | 'danger'
  | 'grey'
  | 'info'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'

export type Shade = 'light' | 'white' | 'dark'

export type BaseColour = Colour | Shade

export type ColourVariant<T extends Colour> = `${T}${
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900}`

export type ThemeColour = BaseColour | ColourVariant<Colour>

export type BaseColourMap<T = any> = Record<BaseColour, T>

export type SingleColourVariantMap<K extends Colour, T> = Record<
  ColourVariant<K>,
  T
>

export type ColourVariantMap<T> = Record<ColourVariant<Colour>, T>

export type ColourThemeMap<T> = BaseColourMap<T> & ColourVariantMap<T>
