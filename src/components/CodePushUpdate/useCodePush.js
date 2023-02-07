import {useEffect, useState} from 'react';
import CodePush from 'react-native-code-push';
const useCodePush = () => {
  const [dataProgress, setDataProgress] = useState({
    progress: {},
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isProcess, setIsProcess] = useState(false);
  const [messenger, setMessenger] = useState('Kiểm tra trạng thái ứng dụng');
  function codePushStatusDidChange(syncStatus) {
    switch (syncStatus) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        setMessenger('Kiểm tra trạng thái ứng dụng');
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        setIsVisible(true);
        setMessenger('Đang tải về ứng dụng.');
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        setMessenger('Đang cài đặt ứng dụng.');
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        setMessenger('Đang cập nhật ứng dụng.');
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        setIsProcess(true);
        setMessenger('Đã hoàn tất cập nhật.');
        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        setIsProcess(true);
        setMessenger('Đã sảy ra lỗi vui lòng khởi động lại app');
        break;
      default:
        break;
    }
  }
  function codePushDownloadDidProgress(progress) {
    setDataProgress(progress);
  }

  function restartApp() {
    CodePush.restartApp();
  }
  const percentUpdated = Math.ceil(
    (dataProgress?.receivedBytes / dataProgress?.totalBytes) * 100,
  );
  useEffect(() => {
    CodePush.sync({}, codePushStatusDidChange, codePushDownloadDidProgress);
  }, []);

  return {
    percentUpdated,
    restartApp,
    isVisible,
    isProcess,
    messenger,
  };
};

export default useCodePush;
