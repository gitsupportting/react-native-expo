import { createStackNavigator } from 'react-navigation-stack'
import Home from '../screens/Home'
import Vehicles from '../screens/Vehicles'
import Employees from '../screens/Employees'
import EmployeesAdd from '../screens/EmployeesAdd'
import Stock from '../screens/Stock'
import ReportWorking from '../screens/ReportWorking'

const AppNavigation = createStackNavigator(
  {
    Home: { screen: Home },
    Vehicles: { screen: Vehicles },
    Employees: { screen: Employees },
    EmployeesAdd: { screen: EmployeesAdd },
    Stock: { screen: Stock },
    ReportWorking: {screen: ReportWorking}
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none'
  }
)

export default AppNavigation
