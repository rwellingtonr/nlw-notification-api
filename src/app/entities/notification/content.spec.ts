import { Content } from './content';

describe('Notification Content', () => {
  it('Should be able to crate a new notification ', () => {
    const content = new Content('Você recebeu uma nova notificação');
    expect(content).toBeTruthy();
  });

  it('Should not be able to crate a new notification content with less then 5 characters', () => {
    expect(() => new Content('Oi')).toThrowError();
  });
  it('Should not be able to crate a new notification content with more then 240 characters', () => {
    expect(() => new Content('O'.repeat(250))).toThrowError();
  });
});
