import {
    Image,
    StyleSheet,
    TextInput,
    Dimensions,
    ToastAndroid,
} from 'react-native';
import { Block, Text, Button } from '@components';
import React, { useState, useEffect } from 'react';
import { theme } from '@theme';
import { icons } from '@assets';
import ItemComment from './ItemComment';
import * as Progress from 'react-native-progress';
import Icon from '@components/Icon';
import {
    usePostCommentMutation,
    useGetAllCommentQuery,
    useLazyGetAllCommentQuery,
} from '@redux/servicesNew';
import { useAppSelector } from '@hooks';
import { makeStyles, useTheme } from 'themeNew';
import { withNamespaces } from 'react-i18next';
const _renderStar = num => {
    let star = [];
    for (let i = 0; i < num; i++) {
        star.push(
            <Icon
                component={'AntDesign'}
                name="star"
                color={theme.colors.yellow}
                size={20}
            />,
        );
    }
    return star;
};

const EvaluateBook = ({ idChapter, t }) => {
    const [evaluate, setEvaluate] = useState(0);
    const [comment, setComment] = useState('');
    const [postComment] = usePostCommentMutation();
    const [getAllComment, status, error] = useLazyGetAllCommentQuery();
    const [listComment, setListComment] = useState([]);
    const myInfo = useAppSelector(state => state.root.auth);
    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const themeNew = useTheme(themeStore);
    const styles = useStyles(themeStore);
    // console.log("listComment----------------------", getAllComment);
    useEffect(() => {
        const getDataComment = async () => {
            const dataComment = await getAllComment({
                params: idChapter,
                token: myInfo.token,
            });
            let listReverse = [];
            if (dataComment?.data) {
                dataComment.data.data.map(item => {
                    listReverse = [item, ...listReverse];
                });
                setListComment(listReverse);
            }
        };
        getDataComment();
    }, []);

    const handleSubmitComment = async () => {
        try {
            if (evaluate > 0 && comment.length != 0) {
                const body = {
                    idChapter: idChapter,
                    content: comment,
                    idUser: myInfo._id,
                    userName: myInfo.name,
                    evaluate: evaluate,
                };
                await postComment({ body, token: myInfo.token });
                ToastAndroid.show(
                    'Đăng bình luận thành công!',
                    ToastAndroid.SHORT,
                );
                setEvaluate(0);
                setComment('');
                const dataComment = await getAllComment({
                    params: idChapter,
                    token: myInfo.token,
                });
                let listReverse = [];
                if (dataComment?.data) {
                    dataComment.data.data.map(item => {
                        listReverse = [item, ...listReverse];
                    });
                    console.log(
                        'listComment----------------------',
                        dataComment?.data?.data,
                    );
                    setListComment(listReverse);
                }
            } else {
                if (evaluate <= 0) {
                    ToastAndroid.show('Bạn chưa đánh giá!', ToastAndroid.SHORT);
                } else {
                    ToastAndroid.show(
                        'Bạn chưa viết bình luận!',
                        ToastAndroid.SHORT,
                    );
                }
            }
        } catch (error) {
            ToastAndroid.show(
                'Bình luận không thành công!',
                ToastAndroid.SHORT,
            );
        }
    };

    return (
        <Block
            backgroundColor={themeNew.colors.background}
            marginHorizontal={10}
            marginTop={40}>
            <Text
                center
                marginTop={30}
                color={themeNew.colors.textInBox}
                size={18}>
                {t('ratingStarReview')}
            </Text>
            <Text
                center
                marginTop={20}
                fontType={'bold'}
                color={themeNew.colors.textInBox}
                size={50}>
                4.3
            </Text>
            {/* Star */}
            <Block row alignCenter justifyCenter width={'100%'}>
                {_renderStar(4)}
            </Block>
            <Text color={themeNew.colors.textInBox} center marginTop={10}>
                1000
            </Text>
            {/* Danh gia progress */}
            <Block row marginLeft={40} alignCenter marginTop={20}>
                <Text color={themeNew.colors.textInBox} size={14}>
                    5
                </Text>
                <Block marginLeft={10}>
                    <Progress.Bar
                        color={theme.colors.black}
                        height={12}
                        progress={0.8}
                        width={Dimensions.get('window').width - 200}
                    />
                </Block>
                <Text
                    color={themeNew.colors.textInBox}
                    marginLeft={10}
                    size={14}>
                    75%
                </Text>
            </Block>

            <Block row marginLeft={40} alignCenter marginTop={10}>
                <Text ccolor={themeNew.colors.textInBox} size={14}>
                    4
                </Text>
                <Block marginLeft={10}>
                    <Progress.Bar
                        color={theme.colors.black}
                        height={12}
                        progress={0.05}
                        width={Dimensions.get('window').width - 200}
                    />
                </Block>
                <Text
                    marginLeft={10}
                    color={themeNew.colors.textInBox}
                    size={14}>
                    4%
                </Text>
            </Block>
            <Block row marginLeft={40} alignCenter marginTop={10}>
                <Text color={themeNew.colors.textInBox} size={14}>
                    3
                </Text>
                <Block marginLeft={10}>
                    <Progress.Bar
                        color={theme.colors.black}
                        height={12}
                        progress={0.2}
                        width={Dimensions.get('window').width - 200}
                    />
                </Block>
                <Text
                    marginLeft={10}
                    color={themeNew.colors.textInBox}
                    size={14}>
                    25%
                </Text>
            </Block>
            <Block row marginLeft={40} alignCenter marginTop={10}>
                <Text color={themeNew.colors.textInBox} size={14}>
                    2
                </Text>
                <Block marginLeft={10}>
                    <Progress.Bar
                        color={theme.colors.black}
                        height={12}
                        progress={0.1}
                        width={Dimensions.get('window').width - 200}
                    />
                </Block>
                <Text
                    color={themeNew.colors.textInBox}
                    marginLeft={10}
                    size={14}>
                    15%
                </Text>
            </Block>
            <Block row marginLeft={40} alignCenter marginTop={10}>
                <Text color={themeNew.colors.textInBox} size={14}>
                    1
                </Text>
                <Block marginLeft={10}>
                    <Progress.Bar
                        color={theme.colors.black}
                        height={12}
                        progress={0.09}
                        width={Dimensions.get('window').width - 200}
                    />
                </Block>
                <Text
                    marginLeft={10}
                    color={themeNew.colors.textInBox}
                    size={14}>
                    13%
                </Text>
            </Block>
            <Text
                center
                color={themeNew.colors.textInBox}
                size={18}
                marginTop={30}>
                {t('bookReviews')}
            </Text>
            <Text center color={themeNew.colors.textInBox} size={14}>
                {t('yourThink')}
            </Text>
            {/* Star cua người đánh giá */}
            <Block row justifyCenter>
                <Button style={styles.btn_star} onPress={() => setEvaluate(0)}>
                    <Image
                        source={
                            evaluate >= 1 ? icons.star_happy : icons.star_sad
                        }
                        style={styles.start}
                    />
                </Button>
                <Button style={styles.btn_star} onPress={() => setEvaluate(2)}>
                    <Image
                        source={
                            evaluate >= 2 ? icons.star_happy : icons.star_sad
                        }
                        style={styles.start}
                    />
                </Button>
                <Button style={styles.btn_star} onPress={() => setEvaluate(3)}>
                    <Image
                        source={
                            evaluate >= 3 ? icons.star_happy : icons.star_sad
                        }
                        style={styles.start}
                    />
                </Button>
                <Button style={styles.btn_star} onPress={() => setEvaluate(4)}>
                    <Image
                        source={
                            evaluate >= 4 ? icons.star_happy : icons.star_sad
                        }
                        style={styles.start}
                    />
                </Button>
                <Button style={styles.btn_star} onPress={() => setEvaluate(5)}>
                    <Image
                        source={
                            evaluate >= 5 ? icons.star_happy : icons.star_sad
                        }
                        style={styles.start}
                    />
                </Button>
            </Block>

            <TextInput
                value={comment}
                onChangeText={setComment}
                placeholder={t('fillInHere')}
                style={styles.tip_comment}
                placeholderTextColor={themeNew.colors.textDark}
                multiline={true}
                maxLength={400}
                textAlignVertical="top"
            />

            <Block width={'100%'} alignCenter marginVertical={20}>
                <Button
                    style={styles.btn_submit_comment}
                    onPress={handleSubmitComment}>
                    <Text center color={theme.colors.gray3} size={16}>
                        {' '}
                        {t('comment')}{' '}
                    </Text>
                </Button>
            </Block>

            {/* List comment */}
            {listComment.map((item, index) => (
                <ItemComment index={index} key={index} item={item} />
            ))}
        </Block>
    );
};

const useStyles = makeStyles()(({ colors }) => ({
    start: {
        height: 35,
        width: 35,
    },
    btn_star: {
        marginLeft: 5,
    },
    tip_comment: {
        backgroundColor: colors.text,
        borderRadius: 10,
        paddingHorizontal: 15,
        height: 160,
        fontSize: 16,
        paddingVertical: 15,
        marginTop: 20,
        color: colors.black,
    },
    btn_submit_comment: {
        backgroundColor: theme.colors.dark1,
        borderRadius: 10,
        width: '70%',
        paddingVertical: 10,
        alignItems: 'center',
    },
}));

export default withNamespaces()(EvaluateBook);
