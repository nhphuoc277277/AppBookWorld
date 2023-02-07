import React, { memo } from 'react';
import { NameIconComponents } from './config';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';
function IconView(props) {
  const { name, component, color, size } = props;

  const showIcon = () => {
    let colorConfig = color ? color : 'black';

    switch (component) {
      case NameIconComponents.AntDesign:
        return <AntDesign name={name} size={size} color={colorConfig} />;
      case NameIconComponents.Entypo:
        return <Entypo name={name} size={size} color={colorConfig} />;
      case NameIconComponents.EvilIcons:
        return <EvilIcons name={name} size={size} color={colorConfig} />;
      case NameIconComponents.Feather:
        return <Feather name={name} size={size} color={colorConfig} />;
      case NameIconComponents.FontAwesome:
        return <FontAwesome name={name} size={size} color={colorConfig} />;
      case NameIconComponents.FontAwesome5:
        return <FontAwesome5 name={name} size={size} color={colorConfig} />;
      case NameIconComponents.Fontisto:
        return <Fontisto name={name} size={size} color={colorConfig} />;
      case NameIconComponents.Foundation:
        return <Foundation name={name} size={size} color={colorConfig} />;
      case NameIconComponents.Ionicons:
        return <Ionicons name={name} size={size} color={colorConfig} />;
      case NameIconComponents.MaterialCommunityIcons:
        return (
          <MaterialCommunityIcons name={name} size={size} color={colorConfig} />
        );
      case NameIconComponents.MaterialIcons:
        return <MaterialIcons name={name} size={size} color={colorConfig} />;
      case NameIconComponents.Octicons:
        return <Octicons name={name} size={size} color={colorConfig} />;
      case NameIconComponents.SimpleLineIcons:
        return <SimpleLineIcons name={name} size={size} color={colorConfig} />;
      case NameIconComponents.Zocial:
        return <Zocial name={name} size={size} color={colorConfig} />;
      default:
        return <AntDesign name={name} size={size} color={colorConfig} />;
    }
  };

  return showIcon();
}

export default memo(IconView);
