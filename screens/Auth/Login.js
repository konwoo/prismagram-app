import React, { useState } from 'react';
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import styled from "styled-components";
import AuthButton from '../../components/AuthButton';
import AuthInput from '../../components/AuthInput';
import useInput from '../../hooks/useInput';
import { Alert } from 'react-native';
import { useMutation } from 'react-apollo-hooks';
import { LOG_IN } from './AuthQuery';

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

export default ({ navigation }) => {
    const emailInput = useInput("");
    const [loading, setLoading] = useState(false);
    const [requestSecret] = useMutation(LOG_IN, {
        variables: {
            email: emailInput.value
        }
    });
    const handleLogin = async () => {
        const { value } = emailInput;
        const EmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(value === "") {
            return Alert.alert("Email can't be empty");
        }
        else if(!value.includes("@") || !value.includes(".")) {
            return Alert.alert("Please write email");
        } else if(!EmailRegex.test(value)) {
            return Alert.alert("That email is invalid");
        }
        try {
            setLoading(true);
            await requestSecret();
            Alert.alert("Check your email");
            navigation.navigate("Confirm");
        } catch (error) {
            Alert.alert("Can't login now");
        }
        finally {
            setLoading(false);
        }
        
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <AuthInput  {...emailInput} placeholder="Email" keyboardType="email-address" returnKeyType="send" />
                <AuthButton loading={loading} onPress={handleLogin} text="Log In" />
            </View>
        </TouchableWithoutFeedback>
    )
}