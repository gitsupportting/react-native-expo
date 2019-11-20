import { createStackNavigator } from 'react-navigation-stack'
import Home from '../screens/Home'
import Vehicles from '../screens/Vehicles'

const AppNavigation = createStackNavigator(
  {
    Home: { screen: Home },
    Vehicles: { screen: Vehicles }
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none'
  }
)

export default AppNavigation
