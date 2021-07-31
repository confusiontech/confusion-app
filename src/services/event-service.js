import { EVENT_DATES, EVENT_CATEGORIES } from '../event-properties';

class EventService {
  getDates() {
    return EVENT_DATES;
  }

  getAllCategories() {
    return new Map(EVENT_CATEGORIES);
  }
}

export default new EventService();
