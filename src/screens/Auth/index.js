import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { routes } from '@navigation/routes';
import Welcome from './Welcome';
import Login from './Login';
import Register from './Register';
const Stack = createStackNavigator();

const screenOptionStyle = {
    headerShown: false,
};

export { Welcome, Login, Register };

// const UserNavigator = ({navigation, route}) => {
//   // navigation.setOptions({tabBarVisible: false});
//   return (
//     <Stack.Navigator screenOptions={screenOptionStyle}>
//       <Stack.Screen name={routes.WELCOME_SCREEN} component={Welcome} />
//       <Stack.Screen name={routes.REGISTER_SCREEN} component={Register} />
//       <Stack.Screen name={routes.LOGIN_SCREEN} component={Login} />
//     </Stack.Navigator>
//   );
// };

// export default UserNavigator;
