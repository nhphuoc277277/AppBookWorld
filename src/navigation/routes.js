export const routes = {
  LOGIN_SCREEN: 'LOGIN_SCREEN',
  WELCOME_SCREEN: 'WELCOME_SCREEN',
  REGISTER_SCREEN: 'REGISTER_SCREEN',
  BOTTOM_TAB: 'BOTTOM_TAB',
  HOME_SCREEN: 'HOME_SCREEN',
  EVENT_SCREEN: 'EVENT_SCREEN',
  NOTIFICATION_SCREEN: 'NOTIFICATION_SCREEN',
  PROFILE_SCREEN: 'PRODUCT_SCREEN',
  MENU_DETAIL: 'MENU_DETAIL',

  //MyAp
  BOTTOM_TAB_MY_AP: 'BOTTOM_TAB_MY_AP',
  HOME_MY_AP: 'HOME_MY_AP',
  CHAT_MY_AP: 'CHAT_MY_AP',
  NOTIFICATION_SCREEN_MY_AP: 'NOTIFICATION_SCREEN_MY_AP',
  PROFILE_SCREEN_MY_AP: 'PROFILE_SCREEN_MY_AP',
  HOME_SCREEN_MY_AP: 'HOME_SCREEN_MY_AP',
  CHAT_SCREEN_MY_AP: 'CHAT_SCREEN_MY_AP',
  DETAIL_BOOK_MY_AP: 'DETAIL_BOOK_MY_AP',
  READING_MY_APP: 'READING_MY_APP',
  MORE_MY_APP: 'MORE_MY_APP',
  INFORM_MY_AP: 'INFORM_MY_AP',
  PLAY_BOOK_MY_AP: 'PLAY_BOOK_MY_AP',
  LISTEN_BOOK: 'LISTEN_BOOK',
  DETAIL_AUTHOR_MY_AP: 'DETAIL_AUTHOR_MY_AP',
  SCREEN_SETTINGS: 'SCREEN_SETTINGS',
  SCREEN_EDIT_SETTINGS: 'SCREEN_EDIT_SETTINGS',
  DETAIL_GROUP_CHAT_MY_APP: 'DETAIL_GROUP_CHAT_MY_APP',
  SCREEN_PAYMENT: 'SCREEN_PAYMENT',
  THEME_MODE: 'THEME_MODE',
  CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',
  PURCHASE_HISTORY: 'PURCHASE_HISTORY',
  CART_SCREEN_MY_AP: 'CART_SCREEN_MY_AP',
  CART_MY_AP: 'CART_MY_AP',
  PAYMENT_METHODS: 'PAYMENT_METHODS',
  DETAIL_CART: 'DETAIL_CART',
  EDIT_PROFILE_SCREEN: 'EDIT_PROFILE_SCREEN',
  BOOKS_BY_CATEGORY: 'BOOKS_BY_CATEGORY',
  SEARCH: 'SEARCH',
  SEE_MORE: 'SEE_MORE',
};

export const APP_PREFIX = ['emotion://', 'https://emotion.com'];

export const PATH_SCREENS = {
  screens: {
    [routes.BOTTOM_TAB_MY_AP]: {
      initialRouteName: routes.HOME_MY_AP,
      screens: {
        [routes.HOME_SCREEN_MY_AP]: {
          screens: {
            [routes]: 'home',
          },
        },
        [routes.EVENT_MAIN]: {
          screens: {
            [routes.EVENT_SCREEN]: 'event',
          },
        },
        [routes.NOTIFICATION_MAIN]: {
          screens: {
            [routes.NOTIFICATION_SCREEN]: 'notification',
          },
        },
        [routes.PROFILE_MAIN]: {
          screens: {
            [routes.PROFILE_SCREEN]: 'profile',
          },
        },
      },
    },
    [routes.LOGIN_SCREEN]: 'login',
    [routes.EVENT_DETAIL]: {
      path: 'even_detail/:id/:idNoti',
      parse: {
        id: id => `${id}`,
      },
    },
  },
};
