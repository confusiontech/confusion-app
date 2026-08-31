import { Platform } from 'react-native';

import { EVENT_ID } from '../event-properties';

// Usamos el proxy para tema de CORS
const PROXY_URL = 'http://localhost:8010/proxy/';
const BACKEND_BASE_URL = 'https://www.orfheo.org/';

const NOT_MODIFIED_STATUS_CODE = 304;

const PROGRAM_API_PATH = `api/v1/events/${EVENT_ID}/program?lang=es`;

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
    const programUrl = this._getUrl(PROGRAM_API_PATH);
    const headers = {};
    if (storedValue && storedValue.program_timestamp) {
      headers['If-Modified-Since'] = new Date(storedValue.program_timestamp).toUTCString();
    }
    const response = await fetch(programUrl, { headers });
    if (response.status === NOT_MODIFIED_STATUS_CODE) {
      return storedValue;
    }
    const responseJson = await response.json();

    return responseJson;
  }

  _getUrl(path) {
    return this.urlBase + path;
  }
}

export default new BackendService();
