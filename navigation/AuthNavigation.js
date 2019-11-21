import { createStackNavigator } from 'react-navigation-stack'
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import EmployeesAdd from '../screens/EmployeesAdd'

const AuthNavigation = createStackNavigator(
  {
    Login: { screen: Login },
    Signup: { screen: Signup },
    EmployeesAdd: { screen: EmployeesAdd },
  },
  {
    initialRouteName: 'Login',
    // initialRouteName: 'EmployeesAdd',    
    headerMode: 'none'
  }
)

export default AuthNavigation
