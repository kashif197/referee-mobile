import React, { useState, useCallback, useEffect, useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat'
import { LoginContext } from '../contexts/LoginContext';
import { Icon } from 'react-native-elements';


function SupportScreen({ route, navigation }) {
    const [messages, setMessages] = useState([]);
    const { data } = useContext(LoginContext)

    const sendMessage = (message) => {
        fetch('http://192.168.10.13:5000/watson/message', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'session_id': route.params.session_id,
            },
            body: JSON.stringify({
                input: message
            })
        })
            .then(res => res.json())
            .then(data => onReceive(data.text))
    }

    const otherUser = {
        _id: 2,
        name: 'React Native',
        name: 'Referee',
    }

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello from Referee! How can I help?',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'Referee',
                    // avatar: data.photoURL,
                },

            }
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        sendMessage(messages[0].text)
    }, [])

    const onReceive = useCallback((text, messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, [
            {
                _id: Math.round(Math.random() * 1000000),
                text,
                createdAt: new Date(),
                user: otherUser,
            },
        ]))
    }, [])

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#2EC4B6'
                    },
                    left: {
                        backgroundColor: '#fff'
                    }
                }}
            />
        );
    }

    const renderSend = (props) => {
        return (
            <Send {...props}>
                <View>
                    <Icon
                        name="md-send"
                        type='ionicon'
                        color='#2EC4B6'
                        containerStyle={{ marginBottom: 8, marginRight: 8 }}
                    />
                </View>
            </Send>
        );
    }


    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1,
            }}
            renderBubble={renderBubble}
            alwaysShowSend
            renderSend={renderSend}
        />
    );
}

export default SupportScreen