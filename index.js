import React, { Component } from 'react'
import { render } from 'react-dom'

export default class Main extends Component {
  constructor() {
    super()
    if (!navigator.bluetooth) throw new Error('your browser does not suppoert BLE')
  }

  async handleBLEConnect() {
    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['battery_service']
      })
      const server = await device.gatt.connect()
      console.log('server', server)
      const service = await server.getPrimaryService('battery_service')
      console.log('service', service)
      const characteristic = await service.getCharacteristic('battery_level')
      console.log('characteristic', characteristic)
      const rawBatteryLevel = await characteristic.readValue()
      const batteryLevel = rawBatteryLevel.getUint8(0)
      console.log('batteryLevel', batteryLevel)
    } catch (err) {
      console.log('error connecting to ble device', err)
    }
  }

  render() {
    return (
      <div style={ mainStyle }>
        <div style={ panelStyle }>
          <h3> BLE MESENGER </h3>
          <div
            onClick={this.handleBLEConnect}
            style={ buttonStyle }>
            CONNECT
          </div>
        </div>
      </div>
    )
  }
}

const mainStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'roboto'
}

const panelStyle ={
  width: 600,
  height: 400,
  borderRadius: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  flexDirection: 'column'
}

const buttonStyle = {
  width: 100,
  height: 30,
  borderRadius: 8,
  backgroundColor: 'whiteSmoke',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

render(
  <Main />,
  document.getElementById('app')
)
