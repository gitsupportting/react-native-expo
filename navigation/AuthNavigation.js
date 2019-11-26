import { createStackNavigator } from 'react-navigation-stack'
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import Stock from '../screens/Stock'

const AuthNavigation = createStackNavigator(
  {
    Login: { screen: Login },
    Signup: { screen: Signup },
    Stock: { screen: Stock },
  },
  {
    // initialRouteName: 'Login',
    initialRouteName: 'Stock',    
    headerMode: 'none'
  }
)

export default AuthNavigation
