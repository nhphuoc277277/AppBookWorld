import { useAppDispatch, useAppSelector } from '@hooks';
import { changeTimeReducer } from '@redux/reducerNew';
import Toast from 'react-native-simple-toast';

export const CustomToast = string => {
    Toast.show(string);
};

export const CustomToastDev = () => {
    Toast.show('Chức năng đang phát triển');
};

export const convertCurrency = value => {
    if (value == null) {
        return 0;
    }
    if (typeof value !== 'string') {
        value = value.toString();
    }
    if (value === '0') {
        return '0';
    }
    let result = '';
    if (value.length >= 3) {
        result = value;
    }
    if (value.length >= 4) {
        result = `${value.substr(0, value.length - 3)}.${value.substr(
            value.length - 3,
            value.length,
        )}`;
    }
    if (value.length >= 7) {
        result = `${value.substr(0, value.length - 6)}.${value.substr(
            value.length - 6,
            3,
        )}.${value.substr(value.length - 3, value.length)}`;
    }
    if (value.length >= 10) {
        result = `${value.substr(0, value.length - 9)}.${value.substr(
            value.length - 9,
            3,
        )}.${value.substr(value.length - 6, 3)}.${value.substr(
            value.length - 3,
            value.length,
        )}`;
    }

    return result;
};

export const convertHTML = str => {
    return str.replace(/font-family:[^;]+;?|font-weight:[^;]+;?/g, '');
};

export const convertHTMLtoText = str => {
    return str
        .replace(/<style([\s\S]*?)<\/style>/gi, ' ')
        .replace(/<script([\s\S]*?)<\/script>/gi, ' ')
        .replace(/(<(?:.|\n)*?>)/gm, ' ')
        .replace(/\s+/gm, ' ');
};

export const convertCart = (cart = []) => {
    return JSON.stringify(
        cart?.map(value => {
            const {
                item_id,
                option_id,
                quantity,
                price,
                price_buy,
                combo_id,
                combo_info,
            } = value;
            return {
                item_id,
                option_id,
                quantity,
                price,
                price_buy,
                combo_id: combo_id || '0',
                combo_info: combo_info || '',
            };
        }),
    );
};

export const formatDay = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  let dayString = day.toString();
  let monthString = month.toString();
  let yearString = year.toString();

  if (day < 10) {
    dayString = '0' + dayString;
  }
  if (month < 10) {
    monthString = '0' + monthString;
  }
  return dayString + '/' + monthString + '/' + yearString;
};


export const convertOption = (arr_option_tmp, option1, option2, option3) => {
    return arr_option_tmp?.find(value => {
        const checkOption1 = value.Option1 === option1;
        const checkOption2 = value.Option2 === option2;
        const checkOption3 = value.Option3 === option3;
        return checkOption1 && checkOption2 && checkOption3;
    });
};

const objColors = {
    0: '#FFA1CF',
    1: '#E3FDFD',
    2: '#F9F7F7',
    3: '#F8C4B4',
    4: '#FF97FA',
    5: '#C8FFD4',
    6: '#FFE6F7',
    7: '#EEF1FF',
    8: '#FFA8A7',
    9: '#A7ACFF',
};

export const randomColor = number => {
    const n = Math.floor(Math.random() * number);
    return objColors[n];
};

export const formatDate = _day => {
    const day = _day.getDate();
    const month = _day.getMonth() + 1;
    const year = _day.getFullYear();
    const hour = _day.getHours();
    const miniutes = _day.getMinutes();

    let dayString = day.toString();
    let monthString = month.toString();
    let yearString = year.toString();
    let hourString = hour.toString();
    let miniuteString = miniutes.toString();

    if (day < 10) {
        dayString = '0' + dayString;
    }
    if (month < 10) {
        monthString = '0' + monthString;
    }
    if (hour < 10) {
        hourString = '0' + hourString;
    }
    if (miniutes < 10) {
        miniuteString = '0' + miniuteString;
    }

    return (
        hourString +
        ':' +
        miniuteString +
        ' - ' +
        dayString +
        '/' +
        monthString +
        '/' +
        yearString
    );
};
