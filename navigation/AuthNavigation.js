import { createStackNavigator } from 'react-navigation-stack'
import Login from '../screens/Login'
import Signup from '../screens/Signup'
// import StockAdd from '../screens/StockAdd'

const AuthNavigation = createStackNavigator(
  {
    Login: { screen: Login },
    Signup: { screen: Signup },
    // StockAdd: { screen: StockAdd },
  },
  {
    initialRouteName: 'Login',
    // initialRouteName: 'StockAdd',    
    headerMode: 'none'
  }
)

export default AuthNavigation
