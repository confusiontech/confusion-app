import { Platform } from 'react-native';

class BackendService {

  async fetchData() {
    const cors_url = 'https://cors-anywhere.herokuapp.com/'
    const orfheo_url = 'https://www.orfheo.org/search/results_program'
    const request_url = Platform.OS === 'web' ? `${cors_url}${orfheo_url}` : orfheo_url
    try {
      let response = await fetch(request_url, {          
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: "event_id=3cb8e68a-b03f-4a7d-b714-42a7ca56870a&date=&lang=es"    
      });

      return await response.json();
     
    } catch (error) {
      console.error(error);
    }
  }
}

export default new BackendService();