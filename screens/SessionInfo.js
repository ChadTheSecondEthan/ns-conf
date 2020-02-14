import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { StorageConsumer } from '../storage/StorageProvider';
import styles from '../styles/styles';
import { extractSessionDay } from '../utils/sessions';

SessionInfo.navigationOptions = { title: "Session Info" };

export default function SessionInfo({
    navigation: {
        goBack,
        navigate,
    },
    route: {
        params: {
            sessionName = '',
            id,
        },
    },
}) {
    return (
        <StorageConsumer>
            {({
                allSessions: {
                    [id]: {
                        sessiontime = '',
                        title = '',
                        description = '',
                        demographic = '',
                        speakername = '',
                        speakerbio = '',
                        speakerphoto = '',
                        room = '',
                    } = {},
                },
                scheduleArray,
                addToSchedule,
                removeFromSchedule,
            }) => (
                    <ScrollView>
                        <View style={styles.view} >
                            <Text style={[
                                styles.h1,
                                styles.marginBottomXLarge,
                            ]} >{title}</Text>
                            <TouchableOpacity
                                onPress={() => navigate('SpeakerInfo', {
                                    speakername,
                                    speakerbio,
                                    speakerphoto,
                                })}
                            >
                                <Image
                                    style={styles.speakerphoto}
                                    source={{
                                        uri: speakerphoto
                                            ||
                                            'https://www.nycc.edu/themes/nycc/images/default_profile.jpg',
                                    }}
                                />
                                <Text style={[
                                    styles.h2,
                                    styles.marginBottomMedium,
                                ]}>{speakername}</Text>
                            </TouchableOpacity>
                            <Text style={[
                                styles.h4,
                                styles.marginBottomXxSmall,
                            ]} >{extractSessionDay({ sessiontype: sessionName })} {sessiontime}</Text>
                            <Text style={[
                                styles.h4,
                                styles.marginBottomXxSmall,
                            ]} >{room}</Text>
                            <Text style={[
                                styles.h4,
                                styles.marginBottomLarge,
                            ]} >{demographic}</Text>
                            <Text style={[
                                styles.text,
                                styles.marginBottomXxLarge,
                            ]} >{description || 'No description'}</Text>
                            <Text style={[
                                styles.h3,
                                styles.marginBottomLarge,
                            ]} >About The Speaker{speakername.match(/,|and/) ? 's' : ''}</Text>
                            <Text style={[
                                styles.text,
                                styles.marginBottomXLarge
                            ]} >{speakerbio}</Text>

                            {scheduleArray.some(({
                                selectedSession: {
                                    id: selectedId,
                                } = {},
                            }) => selectedId === id) ? (
                                    <>
                                        <TouchableOpacity
                                            style={[
                                                styles.button,
                                                styles.marginTopMedium,
                                            ]}
                                            onPress={async () => {
                                                await removeFromSchedule(id);
                                                goBack();
                                            }}
                                        >
                                            <Text style={[
                                                styles.buttonText,
                                            ]} >Remove From Schedule</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[
                                                styles.button,
                                                styles.marginTopMedium,
                                            ]}
                                            onPress={() => navigate('SelectBreakout', { sessionName })}
                                        >
                                            <Text style={[
                                                styles.buttonText,
                                            ]} >View Other Breakouts</Text>
                                        </TouchableOpacity>
                                    </>
                                ) : (
                                    <TouchableOpacity
                                        style={[
                                            styles.button,
                                            styles.marginTopMedium,
                                        ]}
                                        onPress={async () => {
                                            await addToSchedule(id);
                                            goBack();
                                        }}
                                    >
                                        <Text style={[
                                            styles.buttonText,
                                        ]} >Add To Schedule</Text>
                                    </TouchableOpacity>
                                )}
                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    styles.marginTopMedium,
                                ]}
                                onPress={() => navigate("Map", { room })}
                            >
                                <Text style={[
                                    styles.buttonText,
                                ]} >View {room} Map</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    styles.marginTopMedium,
                                ]}
                                onPress={() => navigate("Feedback", { id, sessionName })}
                            >
                                <Text style={[
                                    styles.buttonText,
                                ]} >Provide Feedback</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                )}
        </StorageConsumer>
    );
}