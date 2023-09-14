import React from 'react';
import { View, StyleSheet, Text, Linking, TouchableHighlight, ScrollView } from 'react-native';
import PageLayout from './page-layout';
import { iconsMap } from '../helpers/icon-helpers';

import {
  LINK_COLOR,
  TOUCHABLE_UNDERLAY_COLOR
} from '../styles/colors';

const InfoContainer = ({ navigation }) => {
  const WEB_URL = 'https://beniconfusionfest.es/es/inicio';
  const INSTAGRAM_URL = 'https://www.instagram.com/benimacletconfusion/';
  const YOUTUBE_URL = 'https://www.youtube.com/c/conFusi%C3%B3nfest/featured';

  return (
    <PageLayout navigation={navigation}>
      <ScrollView style={styles.mainScrollView}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            conFusión
          </Text>
        </View>
        <View style={styles.linksContainer}>
          <TouchableHighlight
            activeOpacity={0.9}
            underlayColor={TOUCHABLE_UNDERLAY_COLOR}
            onPress={() => Linking.openURL(WEB_URL)}
          >
            <View style={styles.linkContainer}>
              <Text> {iconsMap.get('web', { color: LINK_COLOR })} </Text>
              <Text style={styles.link}> beniconfusionfest.es </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            activeOpacity={0.9}
            underlayColor={TOUCHABLE_UNDERLAY_COLOR}
            onPress={() => Linking.openURL(INSTAGRAM_URL)}
          >
            <View style={styles.linkContainer}>
              <Text> {iconsMap.get('instagram', { color: LINK_COLOR })} </Text>
              <Text style={styles.link}> @benimacletconfusion </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            activeOpacity={0.9}
            underlayColor={TOUCHABLE_UNDERLAY_COLOR}
            onPress={() => Linking.openURL(YOUTUBE_URL)}
          >
            <View style={styles.linkContainer}>
              <Text> {iconsMap.get('youtube', { color: LINK_COLOR })} </Text>
              <Text style={styles.link}> Benimaclet conFusión </Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.normalText}>
            conFusión es una plataforma de encuentro y diálogo abierta a todas las personas, una posibilidad para quien quiera transmitir y un estímulo para quien quiera escuchar.
          </Text>
          <Text style={styles.normalText}>
            Es un evento sin ánimo de lucro. Las actividades tienen un carácter gratuito y no aceptamos publicidad. Funcionamos a través de colaboraciones y donativos de la gente que nos rodea para hacer posible cada edición. Todo el dinero obtenido se utiliza exclusivamente para cubrir los gastos de producción.
          </Text>
          <Text style={styles.subtitle}>
            Principios:
          </Text>
          <View style={styles.listContainer}>
            {
              [
                'Compartir',
                'Expresión Libre',
                'Inclusión total',
                'Igualdad',
                'Participación',
                'Comunidad',
                'Responsabilidad civil',
                'Cooperación'
              ].map(el => <Text key={el} style={styles.bulletList}> {el} </Text>)
            }
          </View>
        </View>
      </ScrollView>
    </PageLayout>
  );
};

const generalTextStyle = {
  fontSize: 18,
  marginBottom: 8
};

const styles = StyleSheet.create({
  textContainer: {
    paddingHorizontal: 16
  },
  normalText: {
    ...generalTextStyle
  },
  title: {
    fontSize: 22,
    marginBottom: 8,
    fontWeight: 'bold',
    paddingTop: 12
  },
  link: {
    fontWeight: 'bold',
    color: LINK_COLOR,
    fontSize: 14
  },
  linksContainer: {
    paddingHorizontal: 12,
    marginBottom: 12
  },
  linkContainer: {
    flexDirection: 'row',
    paddingVertical: 4,
    alignItems: 'center'
  },
  subtitle: {
    fontSize: 18
  },
  bulletList: {
    fontSize: 18
  },
  listContainer: {
    paddingBottom: 32
  }
});

export default InfoContainer;
