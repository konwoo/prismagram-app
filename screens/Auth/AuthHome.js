import React from 'react';
import styled from "styled-components";
import { TouchableOpacity } from "react-native-gesture-handler";
import constants from '../../constants';
import AuthButton from '../../components/AuthButton';

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const Text = styled.Text``;

const Image = styled.Image`
    width: ${constants.width / 2.5};
    margin-bottom: 10px;
`;

const Touchable = styled.TouchableOpacity``;


const LoginLink = styled.View`

`;

const LoginLinkText = styled.Text`
    color: ${props => props.theme.blueColor};
    margin-top: 20px;
`;

export default ({ navigation }) => (
    <View>
        <Image resizeMode={"contain"} source={require("../../assets/images/logo.png")} />
        <AuthButton onPress={() => navigation.navigate("Signup")} text={"Create New Account"}/>
        <Touchable onPress={() => navigation.navigate("Login")}>
            <LoginLink>
                <LoginLinkText>Log In</LoginLinkText>
            </LoginLink>
        </Touchable>
    </View>
)