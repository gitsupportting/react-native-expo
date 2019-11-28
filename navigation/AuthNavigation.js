import { createStackNavigator } from 'react-navigation-stack'
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import ReportWorking from '../screens/ReportWorking'

const AuthNavigation = createStackNavigator(
  {
    Login: { screen: Login },
    Signup: { screen: Signup },
    ReportWorking: { screen: ReportWorking },
  },
  {
    // initialRouteName: 'Login',
    initialRouteName: 'ReportWorking',    
    headerMode: 'none'
  }
)

export default AuthNavigation
