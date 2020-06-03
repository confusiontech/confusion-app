import React, { Component } from 'react';
import { Container, Header, Content, Left, Body, Right, Title, Subtitle } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import ProgramContainer from './src/containers/program-container';
import ProgramUpdater from './src/services/program-updater';
import { ProgramContextProvider } from './src/services/program-context';

export default function App() {
  return (
      <Container>
        <Header>
            <Body>
              <Title>Hello conFusión 2020</Title>
              <Subtitle>o 2021?</Subtitle>
            </Body>
      </Header>
      <Content>
        <ProgramContextProvider>
          <ProgramUpdater/>
          <ProgramContainer/>
      </ProgramContextProvider>
      </Content>
      </Container>

  );
}

const styles = StyleSheet.create({
  text: {
    color: '#fff'
  },
  container: {
    flex: 1,
    color: '#fff',
    backgroundColor: '#8C1D98',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
