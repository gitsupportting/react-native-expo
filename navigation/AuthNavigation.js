import { createStackNavigator } from 'react-navigation-stack'
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import ReportTab from '../screens/ReportTab'

const AuthNavigation = createStackNavigator(
  {
    Login: { screen: Login },
    Signup: { screen: Signup },
    ReportTab: { screen: ReportTab },
  },
  {
    // initialRouteName: 'Login',
    initialRouteName: 'ReportTab',    
    headerMode: 'none'
  }
)

export default AuthNavigation
