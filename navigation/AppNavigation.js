import { createStackNavigator } from 'react-navigation-stack'
import Home from '../screens/Home'
import Vehicles from '../screens/Vehicles'
import Machines from '../screens/Machines'
import Employees from '../screens/Employees'
import EmployeesAdd from '../screens/EmployeesAdd'
import EmployeesEdit from '../screens/EmployeesEdit'
import StockAdd from '../screens/StockAdd'
import StockEdit from '../screens/StockEdit'
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
    EmployeesEdit: { screen: EmployeesEdit },
    Stock: { screen: Stock },
    StockAdd: { screen: StockAdd },
    StockEdit: { screen: StockEdit },
    ReportWorking: {screen: ReportWorking},
    ReportTab: {screen: ReportTab}
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none'
  }
)

export default AppNavigation
