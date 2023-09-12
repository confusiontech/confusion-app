import { Platform } from 'react-native';

import { EVENT_ID } from '../event-properties';

const NOT_MODIFIED_STATUS_CODE = 304;

// Usamos el proxy para tema de CORS
const PROXY_URL = 'http://localhost:8010/proxy/';
const BACKEND_BASE_URL = 'https://www.orfheo.org/';

const PROGRAM_PATH = 'search/results_program';
const PROGRAM_HEADERS = {
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
};

class BackendService {
  constructor() {
    if (Platform.OS === 'web') {
      this.urlBase = PROXY_URL;
    } else {
      this.urlBase = BACKEND_BASE_URL;
    }
    this.fetchProgram = this.fetchProgram.bind(this);
  }

  async fetchProgram(storedValue) {
    storedValue = storedValue || {};
    const programUrl = this._getUrl(PROGRAM_PATH);
    const response = await fetch(programUrl, {
      method: 'POST',
      headers: PROGRAM_HEADERS,
      body: this._requestBody(storedValue.program_timestamp)
    });
    if (response.status === NOT_MODIFIED_STATUS_CODE) {
      return storedValue;
    }
    const responseJson = await response.json();

    return responseJson;
  }

  _getUrl(path) {
    return this.urlBase + path;
  }

  _requestBody(timestamp) {
    return `event_id=${EVENT_ID}&lang=es&program_timestamp=${timestamp}`;
  }
}

export default new BackendService();
