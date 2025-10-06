declare module '@expo/vector-icons' {
  import { ComponentProps } from 'react';
  import { TextProps } from 'react-native';

  export type IconProps<T extends string> = {
    name: T;
    size?: number;
    color?: string;
  } & Omit<TextProps, 'style'> & {
    style?: TextProps['style'];
  };

  export class Ionicons extends React.Component<IconProps<string>> {}
  export class MaterialIcons extends React.Component<IconProps<string>> {}
  export class FontAwesome extends React.Component<IconProps<string>> {}
  export class Entypo extends React.Component<IconProps<string>> {}
  export class Feather extends React.Component<IconProps<string>> {}
  export class AntDesign extends React.Component<IconProps<string>> {}
  export class MaterialCommunityIcons extends React.Component<IconProps<string>> {}
}
