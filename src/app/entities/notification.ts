import { randomUUID } from 'crypto';
import { BaseEntity } from './baseEntity';
import { Replace } from './helper/replace';
import { Content } from './notification/content';

export interface NotificationProps {
  content: Content;
  category: string;
  readAt?: Date | null;
  createdAt: Date;
  recipientId: string;
}

export class Notification extends BaseEntity {
  private props: NotificationProps;
  constructor(props: Replace<NotificationProps, { createdAt?: Date }>) {
    super();
    this.props = {
      ...props,
      createdAt: props?.createdAt ?? new Date(),
    };
  }

  set content(content: Content) {
    this.props.content = content;
  }

  get content(): Content {
    return this.props.content;
  }

  set category(category: string) {
    this.props.category = category;
  }

  get category(): string {
    return this.props.category;
  }
  set readAt(readAt: Date) {
    this.props.readAt = readAt;
  }

  get readAt(): Date {
    return this.props.readAt;
  }
  set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
  set recipientId(recipientId: string) {
    this.props.recipientId = recipientId;
  }

  get recipientId(): string {
    return this.props.recipientId;
  }
}
