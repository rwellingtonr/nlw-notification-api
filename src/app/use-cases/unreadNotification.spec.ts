import { Error404 } from './errors/error404';
import { makeNotification } from '~test/factory/notificationFactory';
import { ReadNotification } from './readNotification';
import { UnreadNotification } from './unreadNotification';
import { NotificationRepositoryInMemory } from '~test/repositories/notification';

describe('Unread Notification', () => {
  it('Should unread notification', async () => {
    const repository = new NotificationRepositoryInMemory();
    const readNotification = new UnreadNotification(repository);

    const notification = makeNotification({ readAt: new Date() });
    await repository.create(notification);

    await readNotification.execute({ notificationId: notification.id });

    expect(repository.notifications[0].readAt).toEqual(null);
  });

  it('Should not be able to Read a non existing notification', async () => {
    const repository = new NotificationRepositoryInMemory();
    const readNotification = new ReadNotification(repository);

    const notification = makeNotification({ readAt: new Date() });
    await repository.create(notification);

    const notificationProps = { notificationId: 'adsasd9ad912312dasd' };

    await expect(() => {
      return readNotification.execute(notificationProps);
    }).rejects.toThrow(Error404);
  });
});
