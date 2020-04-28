import { Platform } from 'react-native';

class BackendService {
  constructor() {
    if (Platform.OS === 'web') {
      this.urlBase = 'http://localhost:8010/proxy/';
    } else {
      this.urlBase = 'https://www.orfheo.org/';
    }
  }

  getUrl(path) {
    return this.urlBase + path;
  }
  
  async fetchProgram() {
    const programUrl = this.getUrl("search/results_program");

    let response = await fetch(programUrl, {          
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: "event_id=3cb8e68a-b03f-4a7d-b714-42a7ca56870a&date=&lang=es"    
    });

    return response.json();
  }
}

export default new BackendService();
