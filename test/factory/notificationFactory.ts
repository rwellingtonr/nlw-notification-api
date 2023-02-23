import { Notification } from '~/app/entities/notification';
import { Content } from '~/app/entities/notification/content';
import { randomUUID } from 'crypto';

type Override = Partial<Notification>;

export const makeNotification = (override?: Override) => {
  const notification = new Notification({
    category: 'anyone',
    content: new Content('My content'),
    recipientId: randomUUID(),
    ...override,
  });
  return notification;
};
