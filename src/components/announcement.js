import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Center, Button, Modal } from 'native-base';
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
    <Center>
      <Modal isOpen={showAnnouncement} onClose={() => setShowAnnouncement(false)} size='lg'>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header><Text style={styles.headerText}>Información Importante!</Text></Modal.Header>
          <Modal.Body>
            <Text style={styles.bodyText}>Este año tenemos crowdfunding...</Text>
            <TouchableHighlight
              activeOpacity={0.9}
              underlayColor={TOUCHABLE_UNDERLAY_COLOR}
              onPress={() => Linking.openURL(CROWDFUNDING_URL)}
            >
              <View style={styles.linkContainer}>
                <Text> {iconsMap.get('crowdfunding', { color: LINK_COLOR })} </Text>
                <Text style={styles.link}> Ir a Crowdfunding </Text>
              </View>
            </TouchableHighlight>

            <Text style={styles.bodyText}>
              Si no quieres visitar la página ahora, puedes encontrar el enlace en la pantalla de <Text style={styles.inlineLink} onPress={() => openInfo()}>Info {iconsMap.get('info', { size: 14, color: LINK_COLOR })}</Text>
            </Text>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button style={styles.buttonText} onPress={() => setShowAnnouncement(false)}>Cerrar</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
};

const styles = StyleSheet.create({
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
    paddingVertical: 4,
    alignItems: 'center'
  },
  link: {
    fontWeight: 'bold',
    color: LINK_COLOR,
    fontSize: 16
  },
  inlineLink: {
    color: LINK_COLOR
  }
});

export default Announcement;
