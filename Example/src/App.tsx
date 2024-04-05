import React from 'react';
import {
    SafeAreaView,
    StatusBar,
    Text,
    View
} from 'react-native';
import QRCode from "react-native-qrcode-svg";

const App = () => {

    return (
        <SafeAreaView>
            <StatusBar barStyle='dark-content' />
            <View style={{alignItems: 'center'}}>
                <Text style={{fontSize: 24}}>react-native-qrcode-svg example</Text>

                <QRCode
                    value={"https://www.google.com/"}
                    size={200}
                />

            </View>
        </SafeAreaView>
    );
};
export default App;
