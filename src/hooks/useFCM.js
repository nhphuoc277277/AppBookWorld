import messaging from '@react-native-firebase/messaging';
import Storage from '@utils/storage';
import { useEffect } from 'react';
import PushNotification, { Importance } from 'react-native-push-notification';
import { Linking } from 'react-native';

PushNotification.createChannel({
    channelId: 'notification-channel-id',
    channelName: 'notification-channel',
    soundName: 'default',
    importance: Importance.HIGH,
});

PushNotification.configure({
    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
});
const useFCM = () => {
    const requestUserPermission = async () => {
        const authorizationStatus = await messaging().requestPermission();
        if (authorizationStatus) {
            // console.log('Permission status:', authorizationStatus);
        }
    };

    const getDeviceToken = async () => {
        const token = await messaging().getToken();
        Storage.setItem('fcmToken', token);
        return token;
    };

    useEffect(() => {
        //When the application in the foreground
        messaging().onMessage(remoteMessage => {
            console.log(
                'A new FCM message arrived!',
                JSON.stringify(remoteMessage),
            );
            PushNotification.localNotification({
                channelId: 'notification-channel-id',
                bigText: remoteMessage.notification.body,
                subText: new Date().toTimeString().slice(0, 9),
                title: remoteMessage.notification.title,
                message: 'Nhấn để mở rộng',
                ignoreInForeground: false,
                smallIcon: 'ic_launcher',
                largeIconUrl:
                    'https://instagram.fsgn2-7.fna.fbcdn.net/v/t51.2885-19/314356835_643869527396192_2092739808220765190_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fsgn2-7.fna.fbcdn.net&_nc_cat=108&_nc_ohc=H_bP0q3dIlwAX8V-L9v&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfBK8nguVGLUPTnrnThUtECLB1sNnC2jujirP1yb7c85eg&oe=636BE72E&_nc_sid=8fd12b',
                when: new Date(Date.now() + 60 * 1000),
                ...remoteMessage,
            });
        });

        //When the application is running, but in the background.
        messaging().onNotificationOpenedApp(remoteMessage => {
            if (remoteMessage) {
                Linking.openURL(remoteMessage.data.link);
            }
        });

        //When the application is opened from a quit state.
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    setTimeout(() => {
                        Linking.openURL(remoteMessage.data.link);
                    }, 1000);
                }
            });
    }, []);

    return { requestUserPermission, getDeviceToken };
};

export default useFCM;
