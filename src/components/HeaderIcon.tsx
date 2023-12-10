import MCIcon from '@expo/vector-icons/MaterialCommunityIcons'
import { Href, Link } from 'expo-router'
import { FC } from 'react'
import { Pressable } from 'react-native'

interface HeaderIconProps {
  color?: string
  href: Href<string>
  name: keyof typeof MCIcon.glyphMap
}

const HeaderIcon: FC<HeaderIconProps> = ({ color, name, href }) => {
  return (
    <Link href={href} asChild>
      <Pressable>
        {({ pressed }) => (
          <MCIcon
            name={name}
            size={25}
            color={color}
            style={{ marginHorizontal: 16, opacity: pressed ? 0.5 : 1 }}
            type="material-community"
          />
        )}
      </Pressable>
    </Link>
  )
}

export default HeaderIcon
