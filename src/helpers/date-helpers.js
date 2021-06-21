import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

export const getEsMoment = dateTime => moment(dateTime);
