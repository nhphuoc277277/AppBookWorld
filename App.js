import { useFCM } from '@hooks';
import React, { useEffect } from 'react';
import RootStack from './src/navigation/RootStack';
import { RootNavigationNew } from './src/navigation/RootNavigationNew';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { Loading } from '@components';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from '@redux/storeNew';
import { StripeProvider } from '@stripe/stripe-react-native';

const App = () => {
    const fcm = useFCM();
    useEffect(() => {
        fcm.requestUserPermission();
        fcm.getDeviceToken()
            .then(device_token => {
                console.log('device_token----->', device_token);
            })
            .catch(e => console.log('error get token firebase -----> ', e));
    }, [fcm]);

    return <RootNavigationNew />;
};

const AppWrapper = () => {
    return (
        <SafeAreaProvider
            initialMetrics={{
                frame: { x: 0, y: 0, width: 0, height: 0 },
                insets: { top: 0, left: 0, right: 0, bottom: 0 },
            }}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <StripeProvider publishableKey="pk_test_51LksFaBV28KdDJtD2M1w8WjYtDm8HGnb3KG4GGRPK31114970YssBRsc6KNft4I6iQSYC4U0DH89kODj2Lh82pUM00zEio45Oq">
                        <App />
                        <Loading />
                    </StripeProvider>
                </PersistGate>
            </Provider>
        </SafeAreaProvider>
    );
};

export default AppWrapper;

//trong dự án, một là dùng yarn hai là dùng npm
//đừng dùng cả hai
//bây giờ bên react người ta chủ yếu dùng yarn vì, nó chỉ update nhưng cái thiếu, còn npm thì chạy lại từ đầu nên thưo
//chốt lại là dùng yarn nhé
//anh dung macOs nên ko quen bên win lắm
