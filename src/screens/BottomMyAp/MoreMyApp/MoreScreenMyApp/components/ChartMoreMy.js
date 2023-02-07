import { Block, Text } from '@components';
import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';

const screenWidth = Dimensions.get('window').width;

import { useAppSelector } from '@hooks';
import { withNamespaces } from 'react-i18next';
import { makeStyles, useTheme } from 'themeNew';

import { useGetReadTimeBookQuery } from '@redux/servicesNew';
import { MONTHS } from '@utils/constants';
import { VictoryBar, VictoryChart, VictoryLabel } from 'victory-native';
import EmptyIcon from '@assets/svgs/EmptyIcon';

const thisYear = new Date().getFullYear();
const thisMonth = MONTHS[new Date().getMonth() + 1];

const ChartMoreMy = props => {
    const [data, setData] = useState([]);
    const [index, setIndex] = useState(1);
    const myInfo = useAppSelector(state => state.root.auth);
    const { data: dataReadTime } = useGetReadTimeBookQuery({
        params: myInfo._id,
        token: myInfo.token,
    });
    //chay 1 lan

    const { t } = props;
    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const themeNew = useTheme(themeStore);
    const styles = useStyle(props, themeStore);

    // useEffect(() => {
    //     getReadTimeBook(myInfo._id);
    // }, []);

    useEffect(() => {
        if (dataReadTime) {
            handleDataMonth();
        }
    }, [dataReadTime]);

    const handleDataYear = useCallback(() => {
        setIndex(2);
        try {
            if (dataReadTime) {
                let handleData = [];

                for (const year in dataReadTime) {
                    let sum = 0;
                    for (const month in dataReadTime[year]) {
                        for (const day in dataReadTime[year][month]) {
                            sum += dataReadTime[year][month][day];
                        }
                    }
                    handleData.push({
                        x: year,
                        y: (sum / 60 / 60).toFixed(0),
                    });
                }

                setData(handleData);
            }
        } catch (e) {
            console.log('[Error handleDataMonth] ', e);
        }
    }, [dataReadTime]);

    const handleDataMonth = useCallback(() => {
        setIndex(1);
        try {
            if (dataReadTime) {
                let handleData = [];

                for (const month in dataReadTime[thisYear]) {
                    let sum = 0;

                    for (const day in dataReadTime[thisYear][month]) {
                        sum += dataReadTime[thisYear][month][day];
                    }
                    console.log('SUM NE ', sum, month);
                    handleData.push({
                        x: month,
                        y: (sum / 60 / 60).toFixed(0),
                    });
                }

                setData(handleData);
            }
        } catch (e) {
            console.log('[Error handleDataMonth] ', e);
        }
    }, [dataReadTime]);

    const handleDataDate = useCallback(() => {
        setIndex(0);

        try {
            if (dataReadTime) {
                let handleData = [];

                if (dataReadTime[thisYear][thisMonth]) {
                    for (const day in dataReadTime[thisYear][thisMonth]) {
                        handleData.push({
                            x: day,
                            y: dataReadTime[thisYear][thisMonth][day] / 60 / 60,
                        });
                    }
                    setData(handleData);
                }
            }
        } catch (e) {
            console.log('Error handle data date ', e);
        }
    }, [dataReadTime]);

    return (
        <Block marginTop={40} column justifyCenter>
            <Block
                style={styles.dateContainer}
                row
                justifyContent={'space-around'}
                marginBottom={30}>
                <TouchableOpacity
                    style={[
                        styles.itemChartContainer,
                        styles.shadowColor,
                        index === 0
                            ? { backgroundColor: themeNew.colors.green }
                            : {
                                  backgroundColor:
                                      themeNew.colors.backgroundDark2,
                              },
                    ]}
                    onPress={handleDataDate}
                    id="A">
                    <Text fontType={'medium1'} color={themeNew.colors.textDark}>
                        {t('day')}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.itemChartContainer,
                        styles.shadowColor,
                        index === 1
                            ? { backgroundColor: themeNew.colors.green }
                            : {
                                  backgroundColor:
                                      themeNew.colors.backgroundDark2,
                              },
                    ]}
                    onPress={handleDataMonth}
                    id="B">
                    <Text fontType={'medium1'} color={themeNew.colors.textDark}>
                        {t('month')}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.itemChartContainer,
                        styles.shadowColor,
                        index === 2
                            ? { backgroundColor: themeNew.colors.green }
                            : {
                                  backgroundColor:
                                      themeNew.colors.backgroundDark2,
                              },
                    ]}
                    onPress={handleDataYear}
                    id="C">
                    <Text fontType={'medium1'} color={themeNew.colors.textDark}>
                        {t('year')}
                    </Text>
                </TouchableOpacity>
            </Block>

            {data.length > 0 ? (
                <VictoryChart
                // style={{
                //     parent: {
                //     border: "1px solid #ccc"
                //     },
                //     background: {
                //     fill: "pink"
                //     }
                // }}
                >
                    <VictoryLabel
                        x={'40%'}
                        y={10}
                        style={styles.title}
                        text={t('readtime')}
                    />
                    <VictoryLabel
                        x={20}
                        y={30}
                        style={styles.labelOne}
                        text={t('hours')}
                    />
                    <VictoryBar
                        style={{
                            data: { fill: '#0D7EF9', width: 10 },
                        }}
                        alignment="start"
                        // animate={{
                        //     duration: 3000,
                        //     onLoad: {
                        //         duration: 3000,
                        //     },
                        // }}
                        animate={{
                            onExit: {
                                duration: 500,
                                before: () => ({
                                    _y: 0,
                                    label: '',
                                }),
                            },
                        }}
                        x={'x'}
                        y={'y'}
                        data={data}
                    />
                </VictoryChart>
            ) : (
                <Block alignCenter justifyCenter>
                    <EmptyIcon />
                </Block>
            )}
        </Block>
    );
};

export default withNamespaces()(ChartMoreMy);

const useStyle = makeStyles()(({ colors }) => ({
    shadowColor: {
        shadowColor: colors.grey12,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 4.65,
        elevation: 2,
    },
    itemChartContainer: {
        width: '25%',
        height: 32,
        backgroundColor: colors.backgroundDark2,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        color: 'red',
        fontFamily: 'Lato-Bold',
    },
    labelOne: {
        fontFamily: 'Lato-Regular',
    },
}));
