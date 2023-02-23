import { BaseEntity } from './baseEntity';
import { Replace } from './helper/replace';
import { Content } from './notification/content';

export interface NotificationProps {
  content: Content;
  category: string;
  readAt?: Date | null;
  createdAt: Date;
  canceledAt?: Date;
  recipientId: string;
}

export class Notification extends BaseEntity {
  private props: NotificationProps;
  constructor(
    props: Replace<NotificationProps, { createdAt?: Date }>,
    id?: string,
  ) {
    super(id);
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

  read() {
    this.props.readAt = new Date();
  }
  unread() {
    this.props.readAt = null;
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

  get canceledAt() {
    return this.props.canceledAt;
  }

  cancel() {
    this.props.canceledAt = new Date();
  }
}
