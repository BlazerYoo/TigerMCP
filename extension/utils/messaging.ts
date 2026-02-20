import { defineExtensionMessaging } from '@webext-core/messaging';


interface Message {
    senderId: string;
    type: 'auth_value_request';
    payload: string;
}

interface ProtocolMap {
    msg(data: Message): string;
}


export const { sendMessage, onMessage } = defineExtensionMessaging<ProtocolMap>();