import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Portal, Modal } from 'react-native-paper';
import { CROWDFUNDING_URL, CROWDFUNDING_START, CROWDFUNDING_END } from '../event-properties';
import { getNow } from '../helpers/program-helpers';
import { getEsMoment } from '../helpers/date-helpers';

import {
  TOUCHABLE_UNDERLAY_COLOR,
  LINK_COLOR
} from '../styles/colors';

import { iconsMap } from '../helpers/icon-helpers';

const Announcement = ({ navigationRef }) => {
  const [showAnnouncement, setShowAnnouncement] = useState(false);

  const openInfo = () => {
    setShowAnnouncement(false);
    navigationRef.current.navigate('Info', {});
  };

  useEffect(() => {
    const nowDt = getEsMoment(getNow());
    if (nowDt >= getEsMoment(CROWDFUNDING_START) && nowDt < getEsMoment(CROWDFUNDING_END)) {
      AsyncStorage.getItem('announcementHasBeenShown')
        .then((value) => {
          if (!value) {
            setShowAnnouncement(true);
            AsyncStorage.setItem('announcementHasBeenShown', 'true');
          }
        })
        .catch((error) => {
          console.error('Error getting announcement storage:', error);
        });
    }
  }, []);

  if (!showAnnouncement) {
    return null;
  }

  return (
    <View style={styles.modalOuter}>
      <Portal>
        <Modal
          visible={showAnnouncement}
          onDismiss={() => setShowAnnouncement(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <View style={styles.modalHeader}>
            <Text style={styles.headerText}>¡Tenemos crowdfunding!</Text>
          </View>
          <View style={styles.modalBody}>
            <Text style={styles.bodyText}>Todas las actividades son gratuitas, y no aceptamos publicidad. Así que tu apoyo hace posible conFusión.</Text>
            <TouchableHighlight
              activeOpacity={0.9}
              underlayColor={TOUCHABLE_UNDERLAY_COLOR}
              onPress={() => Linking.openURL(CROWDFUNDING_URL)}
            >
              <View style={styles.linkContainer}>
                <Text> {iconsMap.get('crowdfunding', { color: LINK_COLOR })} </Text>
                <Text style={styles.link}>Participa y elige tu recompensa </Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.modalFooter}>
            <Text style={styles.bodyText}>
              Si quieres apoyar más tarde, puedes hacerlo en la pestaña de <Text style={styles.inlineLink} onPress={() => openInfo()}>Info {iconsMap.get('info', { size: 14, color: LINK_COLOR })}</Text>
            </Text>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOuter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10
  },
  modalHeader: {
    marginBottom: 10
  },
  modalBody: {
    marginBottom: 20
  },
  modalFooter: {
    alignItems: 'flex-start'
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 22
  },
  bodyText: {
    fontSize: 18
  },
  buttonText: {
    color: LINK_COLOR,
    fontWeight: 'bold',
    letterSpacing: 0.5
  },
  linkContainer: {
    flexDirection: 'row',
    paddingTop: 6,
    paddingBottom: 2,
    marginVertical: 10,
    alignItems: 'center',
    maxWidth: '98%'
  },
  link: {
    fontWeight: 'bold',
    color: LINK_COLOR,
    fontSize: 18
  },
  inlineLink: {
    color: LINK_COLOR
  }
});

export default Announcement;
