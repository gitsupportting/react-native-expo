import { createStackNavigator } from 'react-navigation-stack'
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import Vehicles from '../screens/Vehicles'

const AuthNavigation = createStackNavigator(
  {
    Login: { screen: Login },
    Signup: { screen: Signup },
    Vehicles: { screen: Vehicles }
  },
  {
    initialRouteName: 'Login',
    // initialRouteName: 'Vehicles',
    headerMode: 'none'
  }
)

export default AuthNavigation
