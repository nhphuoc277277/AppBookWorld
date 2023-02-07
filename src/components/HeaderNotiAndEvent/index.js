import {Block, Button, Text} from '@components';
import {handleSearch} from '@redux/actions/HandlerSearchAction';
import {theme} from '@theme';
import React from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {useDispatch} from 'react-redux';
const Title = ({title}) => {
  return (
    <Text
      flex
      size={24}
      color={theme.colors.white}
      paddingBottom={20}
      fontType="bold">
      {title}
    </Text>
  );
};

const HeaderNotiAndEvent = props => {
  const {children, title, search = false} = props;
  // const dispatch = useDispatch();
  // const handlerSearch = () => {
  //   dispatch(handleSearch());
  // };
  return (
    <Block flex paddingTop={57} backgroundColor={theme.colors.orange}>
      <Block row paddingHorizontal={20}>
        <Title title={title} />
        {search && (
          <Button>
            <Icon name="search" size={20} color={theme.colors.white} />
          </Button>
        )}
      </Block>
      <Block
        flex
        backgroundColor={theme.colors.white}
        borderTopLeftRadius={30}
        borderTopRightRadius={30}
        paddingTop={16}
        paddingHorizontal={20}>
        {children}
      </Block>
    </Block>
  );
};

export default HeaderNotiAndEvent;
