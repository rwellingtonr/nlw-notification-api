import { randomUUID } from 'crypto';
import { Notification } from './notification';
import { Content } from './notification/content';

describe('Notification', () => {
  it('Should ', () => {
    const notification = new Notification({
      category: 'Social',
      content: new Content('Hello World'),
      recipientId: randomUUID(),
    });

    expect(notification).toBeTruthy();
  });

  // it('Should ', () => {
  //   expect();
  // });
});
