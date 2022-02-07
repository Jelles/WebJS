import Controller from './Controllers/Controller.js'
import TruckCreateView from './Views/TruckCreateView.js'
import Model from './Models/Model.js'
import { TruckTypes } from './Models/Truck.js'

const app = new Controller(new Model(), new TruckCreateView(TruckTypes))