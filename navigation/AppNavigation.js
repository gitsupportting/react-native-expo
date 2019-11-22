import { createStackNavigator } from 'react-navigation-stack'
import Home from '../screens/Home'
import Vehicles from '../screens/Vehicles'
import Machines from '../screens/Machines'
import Employees from '../screens/Employees'
import EmployeesAdd from '../screens/EmployeesAdd'
import StockAdd from '../screens/StockAdd'
import Stock from '../screens/Stock'
import ReportWorking from '../screens/ReportWorking'
import ReportTab from '../screens/ReportTab'


const AppNavigation = createStackNavigator(
  {
    Home: { screen: Home },
    Vehicles: { screen: Vehicles },
    Machines: { screen: Machines },
    Employees: { screen: Employees },
    EmployeesAdd: { screen: EmployeesAdd },
    Stock: { screen: Stock },
    StockAdd: { screen: StockAdd },
    ReportWorking: {screen: ReportWorking},
    ReportTab: {screen: ReportTab}
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none'
  }
)

export default AppNavigation
