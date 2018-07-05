import React, { Component } from 'react'
import { StyleSheet, ScrollView, View, Button } from 'react-native'
import QRCode from 'react-native-qrcode-svg'

const PATH_TO_LOGO = './logo.jpg'

type Props = {}
export default class App extends Component<Props> {
  handlePress = () => {
    this.qrcode.toDataURL(this.callback)
  }
  callback = (dataURL) => {
    console.log(dataURL)
  }
  render () {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.section}>
          <QRCode value='hello world' />
        </View>
        <View style={styles.section}>
          <QRCode
            value='hello world'
            size={200}
          />
        </View>
        <View style={styles.section}>
          <QRCode
            value='hello world'
            color='blue'
            backgroundColor='yellow'
          />
        </View>
        <View style={styles.section}>
          <QRCode
            value='hello world'
            logo={require(PATH_TO_LOGO)}
          />
        </View>
        <View style={styles.section}>
          <QRCode
            value='hello world'
            logo={require(PATH_TO_LOGO)}
            logoSize={50}
          />
        </View>
        <View style={styles.section}>
          <QRCode
            value='hello world'
            logo={require(PATH_TO_LOGO)}
            logoMargin={10}
          />
        </View>
        <View style={styles.section}>
          <QRCode
            value='hello world'
            logo={require(PATH_TO_LOGO)}
            logoBorderRadius={15}
          />
        </View>
        <View style={styles.section}>
          <QRCode
            value='hello world'
            logo={require(PATH_TO_LOGO)}
            logoBackgroundColor='blue'
            getRef={(c) => (this.qrcode = c)}
          />
          <Button title={'getDataURL'} onPress={this.handlePress} />
        </View>
        <View style={styles.section}>
          <QRCode
            value='hello world'
            ecl='H'
          />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 15,
    paddingBottom: 15
  },
  section: {
    marginTop: 15,
    marginBottom: 15
  }
})
