import React from 'react'
import { StyleSheet, View } from 'react-native'
import QRCode from 'react-native-qrcode-svg'

export default class App extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <QRCode value='hello world' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
