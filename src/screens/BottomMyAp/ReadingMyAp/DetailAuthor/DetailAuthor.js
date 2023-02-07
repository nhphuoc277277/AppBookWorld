import { Block, Container, Text } from '@components';
import { useAppSelector } from '@hooks';
import React from 'react';
import { withNamespaces } from 'react-i18next';
import { Image, ScrollView, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTheme } from 'themeNew';
import BookOfAuthor from '../components/BookOfAuthor';
import TopBar from '../components/TopBar';

const DetailAuthor = ({ route, t }) => {
    let item = route.params.item;
    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const themeNew = useTheme(themeStore);

    return (
        <Container
            statusColor={themeNew.colors.background}
            edges={['left', 'right']}>
            <TopBar isBackHeader />

            <ScrollView showsVerticalScrollIndicator={false}>
                <Block backgroundColor={themeNew.colors.background} flex>
                    <Block
                        width="100%"
                        height={150}
                        backgroundColor={themeNew.colors.textInBox}
                    />
                    <Block absolute width="100%" height="40%">
                        <Block width={'70%'} height={'60%'} top={50} left={90}>
                            <FastImage
                                style={styles.imgAuthor}
                                source={{
                                    uri: item.avatar,
                                    priority: FastImage.priority.high,
                                }}
                            />
                        </Block>
                        <Text
                            flexGrow={1}
                            fontType="bold1"
                            color={themeNew.colors.textInBox}
                            style={styles.nameAuthor}>
                            {item.name}
                        </Text>
                    </Block>

                    <Block paddingHorizontal={24} marginTop={300}>
                        <Block>
                            <Text
                                fontType="bold1"
                                color={themeNew.colors.textInBox}
                                style={styles.textIntro}>
                                {t('aboutAuthor')}
                            </Text>
                            <Text
                                fontType="medium1"
                                color={themeNew.colors.textInBox}
                                style={styles.IntroduceAuthor}
                                numberOfLines={2}>
                                {item.aboutAuthor.introduce}
                            </Text>
                        </Block>
                        <Block marginTop={18}>
                            <Text
                                fontType="bold1"
                                color={themeNew.colors.textInBox}
                                style={styles.textIntro}>
                                {t('overview')}
                            </Text>
                            <Text
                                fontType="medium1"
                                color={themeNew.colors.textInBox}
                                style={styles.IntroduceAuthor}>
                                {item.aboutAuthor.details}
                            </Text>
                        </Block>
                        <Block marginTop={18}>
                            <Text
                                fontType="bold1"
                                color={themeNew.colors.textInBox}
                                style={styles.textIntro}>
                                {t('contactInfo')}
                            </Text>
                            <Text
                                fontType="medium1"
                                color={themeNew.colors.textInBox}
                                style={styles.IntroduceAuthor}>
                                Facebook: {item.aboutAuthor.faceBook}
                            </Text>
                            <Text
                                fontType="medium1"
                                color={themeNew.colors.textInBox}
                                style={styles.IntroduceAuthor}>
                                Youtube: {item.aboutAuthor.youtube}{' '}
                            </Text>
                            <Text
                                fontType="medium1"
                                color={themeNew.colors.textInBox}
                                style={styles.IntroduceAuthor}>
                                Instagram: {item.aboutAuthor.instagram}
                            </Text>
                        </Block>
                    </Block>
                </Block>

                <Block
                    paddingTop={50}
                    paddingBottom={20}
                    backgroundColor={themeNew.colors.background}>
                    <Text
                        marginHorizontal={20}
                        fontType="bold1"
                        color={themeNew.colors.textInBox}
                        style={styles.textBook}>
                        {t('bookOfAuthor')}
                    </Text>
                    <BookOfAuthor idAuthor={item?._id} />
                    {/* <TabSceneReadingStatus /> */}
                </Block>
            </ScrollView>
        </Container>
    );
};

export default withNamespaces()(DetailAuthor);

const styles = StyleSheet.create({
    imgAuthor: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
    },
    textBook: {
        lineHeight: 36,
        fontSize: 24,
    },
    IntroduceAuthor: {
        lineHeight: 21,
        fontWeight: '400',
        fontSize: 14,
        marginTop: 6,
    },
    textIntro: {
        fontSize: 18,
        lineHeight: 27,
    },
    nameAuthor: {
        position: 'absolute',
        fontSize: 24,
        lineHeight: 36,
        left: '32%',
        top: '75%',
        width: 250,
    },
    iconBack: {
        position: 'absolute',
        top: '10%',
        left: '6%',
    },
});
