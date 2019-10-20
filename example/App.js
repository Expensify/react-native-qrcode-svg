/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react'
import {
  StyleSheet,
  View
} from 'react-native'

import QR from 'react-native-qrcode-svg'

const App: () => React$Node = () => {
  return (
    <View style={styles.container}>
      <QR />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default App
