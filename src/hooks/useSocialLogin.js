// import {appleAuth} from '@invertase/react-native-apple-authentication';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
// import jwt_decode from 'jwt-decode';
import {useState} from 'react';

GoogleSignin.configure();

const useSocialLogin = () => {
  const [fetching, setFetching] = useState(false);
  const [data, setData] = useState(null);

  const handleLoginGoogle = async () => {
    setFetching(true);
    try {
      await GoogleSignin.hasPlayServices();
      const value = await GoogleSignin.signIn();
      setFetching(false);
      setData({value, type: 'google'});
    } catch (error) {
      console.error(error);
      setFetching(false);
    }
  };

  // const handleLoginApple = async () => {
  //   setFetching(true);
  //   try {
  //     const appleAuthRequestResponse = await appleAuth.performRequest({
  //       requestedOperation: appleAuth.Operation.LOGIN,
  //       requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  //     });
  //     const {identityToken} = appleAuthRequestResponse;
  //     let value = jwt_decode(identityToken);
  //     setFetching(false);
  //     setData({value, type: 'apple'});
  //   } catch (error) {
  //     console.error(error);
  //     setFetching(false);
  //   }
  // };

  return {
    fetching,
    data,
    handleLoginGoogle,
    // handleLoginApple,
  };
};

export default useSocialLogin;
