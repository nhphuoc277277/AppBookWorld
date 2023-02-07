import PropTypes from 'prop-types';
import React, {memo, useCallback, useMemo, useState} from 'react';
import {RefreshControl, ScrollView, TouchableOpacity, View} from 'react-native';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import ListStudy from '@screens/BottomMyAp/HomeMyAp/HomeScreenMyAp/components/ListStudy';
import ListAcrivity from '@screens/BottomMyAp/HomeMyAp/HomeScreenMyAp/components/ListAcrivity';
import Tuition from '@screens/BottomMyAp/HomeMyAp/HomeScreenMyAp/components/Tuition';

export const optionTabar = {
    hoc_tap: 'Học tập',
    hoat_dong: 'Hoạt động',
    hoc_phi: 'Học phí',
};

function ScheduleContainer({colums}) {
    const [option, setOption] = useState(optionTabar.hoc_tap);
    const setOptionSchedule = useCallback(
      opt => {
      },
      [option],
);

const renderData = useMemo(() => {
    switch(option){
        case optionTabar.hoc_tap:
            return(
                <TouchableOpacity activeOpacity={1}>
                    <ListStudy />
                </TouchableOpacity>
            );
            break;
            case optionTabar.hoat_dong:
                return(
                    <TouchableOpacity activeOpacity={1}>
                        <ListAcrivity />
                    </TouchableOpacity>
                );
            break;
            case optionTabar.hoc_phi:
                return(
                    <TouchableOpacity activeOpacity={1}>
                        <Tuition />
                    </TouchableOpacity>
                );
            break;
            default:
                return(
                    <TouchableOpacity activeOpacity={1}>
                    </TouchableOpacity>
                );
            break;
    }
}, [option]);

    return(
        <ScrollableTabView
            renderTabBar={tabBarProps => {
                return <ScrollableTabBar />;
            }}
            tabBarPosition="top"
            onChangeTab={e => {
                setOptionSchedule(e.ref.props.tabLabel);
            }}
            initialPage={0}
            tabBarUnderlineStyle={{
                backgroundColor: 'red',
                height: 1,
            }}
            tabBarBackgroundColor={'white'}
            tabBarActiveTextColor={'red'}
            tabBarTextStyle={{fontSize: 14}}>
            {colums.map((item, index) => (
                <View key={index} tabLabel={item.title}>
                    {renderData}
                </View>
            ))}
        </ScrollableTabView>
    );
}

ScheduleContainer.propTypes = {
    colums: PropTypes.array,
};

export default memo(ScheduleContainer);
