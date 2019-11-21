import { createStackNavigator } from 'react-navigation-stack'
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import Employees from '../screens/Employees'

const AuthNavigation = createStackNavigator(
  {
    Login: { screen: Login },
    Signup: { screen: Signup },
    Employees: { screen: Employees },
  },
  {
    initialRouteName: 'Login',
    // initialRouteName: 'Employees',    
    headerMode: 'none'
  }
)

export default AuthNavigation
