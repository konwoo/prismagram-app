import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { AsyncStorage } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { persistCache } from 'apollo-cache-persist';
import { ApolloProvider } from "react-apollo-hooks";
import { ThemeProvider } from "styled-components";
import styles from "./styles";
import apolloClientOptions from './apollo';
import NavController from './components/Navcontroller';
import { AuthProvider } from './AuthContext';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const preLoad = async () => {
    try {
      await Font.loadAsync({
        ...Ionicons.font
      });
      await Asset.loadAsync([require("./assets/images/logo.png")]);
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: AsyncStorage
      });
      const client = new ApolloClient({
        cache,
        ...apolloClientOptions
      });

      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      if(!isLoggedIn || isLoggedIn === "false") {
        setIsLoggedIn(false);
      }
      else {
        setIsLoggedIn(true);
      }

      setLoaded(true);
      setClient(client);
     
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    preLoad()
  }, []);

  return loaded && client && isLoggedIn !== null ? (
    <ApolloProvider client={client}>
      <ThemeProvider theme={styles}>
        <AuthProvider isLoggedIn={isLoggedIn}>
          <NavController />
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  ) : (
    <AppLoading />
  );
}