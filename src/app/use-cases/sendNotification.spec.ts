import { NotificationRepositoryInMemory } from '~test/repositories/notification';
import { SendNotification } from './sendNotification';

describe('Send Notification', () => {
  it('Should send notification', async () => {
    const repository = new NotificationRepositoryInMemory();
    const sendNotification = new SendNotification(repository);
    const { notification } = await sendNotification.execute({
      category: 'invoice',
      content: 'Payment bill',
      recipientId: '123123jkl',
    });

    expect(repository.notifications).toHaveLength(1);
    expect(repository.notifications[0]).toEqual(notification);
  });
});
