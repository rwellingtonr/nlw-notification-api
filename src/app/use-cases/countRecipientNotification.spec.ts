import { NotificationRepositoryInMemory } from '~test/repositories/notification';
import { CountRecipientNotification } from './countRecipientNotifications';
import { makeNotification } from '~test/factory/notificationFactory';

describe('Count Recipient Notifications', () => {
  it('Should be able to count notification by recipient id', async () => {
    const repository = new NotificationRepositoryInMemory();
    const countRecipientNotifications = new CountRecipientNotification(
      repository,
    );
    const notification = makeNotification();

    for (let index = 0; index < 2; index++) {
      await repository.create(notification);
    }

    const { count } = await countRecipientNotifications.execute({
      recipientId: notification.recipientId,
    });

    expect(count).toBe(2);
  });
});
