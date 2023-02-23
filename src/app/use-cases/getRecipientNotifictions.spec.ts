import { NotificationRepositoryInMemory } from '~test/repositories/notification';

import { makeNotification } from '~test/factory/notificationFactory';
import { GetRecipientNotifications } from './getRecipientNotifications';

describe('Count Recipient Notifications', () => {
  it('Should be able to count notification by recipient id', async () => {
    const repository = new NotificationRepositoryInMemory();
    const countRecipientNotifications = new GetRecipientNotifications(
      repository,
    );
    const notification = makeNotification();

    for (let index = 0; index < 2; index++) {
      await repository.create(notification);
    }

    const { notifications } = await countRecipientNotifications.execute({
      recipientId: notification.recipientId,
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: notification.recipientId }),
        expect.objectContaining({ recipientId: notification.recipientId }),
      ]),
    );
  });
});
