import { NotificationRepositoryInMemory } from '~test/repositories/notification';
import { CancelNotification } from './cancelNotification';
import { Notification } from '../entities/notification';
import { Content } from '../entities/notification/content';
import { Error404 } from './errors/error404';
import { makeNotification } from '~test/factory/notificationFactory';

describe('Cancel Notification', () => {
  it('Should cancel notification', async () => {
    const repository = new NotificationRepositoryInMemory();
    const cancelNotification = new CancelNotification(repository);

    const notification = makeNotification();
    await repository.create(notification);

    await cancelNotification.execute({ notificationId: notification.id });

    expect(repository.notifications[0].canceledAt).toEqual(expect.any(Date));
  });

  it('Should not be able to cancel a non existing notification', async () => {
    const repository = new NotificationRepositoryInMemory();
    const cancelNotification = new CancelNotification(repository);
    const notification = makeNotification();
    await repository.create(notification);

    const notificationProps = { notificationId: 'adsasd9ad912312dasd' };

    await expect(() => {
      return cancelNotification.execute(notificationProps);
    }).rejects.toThrow(Error404);
  });
});
