import {EVENT_DATES, EVENT_CATEGORIES} from '../event-properties'

class EventService {
  getDates() {
    // return ['2019-10-19', '2019-10-20'];
    return EVENT_DATES; // 2021
  }

  getAllCategories() {
    return new Map(EVENT_CATEGORIES);
  }
}

export default new EventService();
