import { NotificationRepositoryInMemory } from '~test/repositories/notification';
import { Error404 } from './errors/error404';
import { makeNotification } from '~test/factory/notificationFactory';
import { ReadNotification } from './readNotification';

describe('Read Notification', () => {
  it('Should Read notification', async () => {
    const repository = new NotificationRepositoryInMemory();
    const readNotification = new ReadNotification(repository);

    const notification = makeNotification();
    await repository.create(notification);

    await readNotification.execute({ notificationId: notification.id });

    expect(repository.notifications[0].readAt).toEqual(expect.any(Date));
  });

  it('Should not be able to Read a non existing notification', async () => {
    const repository = new NotificationRepositoryInMemory();
    const readNotification = new ReadNotification(repository);

    const notification = makeNotification();
    await repository.create(notification);

    const notificationProps = { notificationId: 'adsasd9ad912312dasd' };

    await expect(() => {
      return readNotification.execute(notificationProps);
    }).rejects.toThrow(Error404);
  });
});
