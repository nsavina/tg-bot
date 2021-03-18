import { InputFiles } from "typescript"


interface InlineKeyboardButton {
  text: string;
}

interface InlineKeyboardButtonWithUrl extends InlineKeyboardButton {
  url?: string;
}

interface InlineKeyboardButtonWithCallback extends InlineKeyboardButton {
  callback_data?: string;
}

type InlineKeyboardMarkup = {
  inline_keyboard: Array<Array<(InlineKeyboardButtonWithUrl | InlineKeyboardButtonWithCallback)>>;
}

type KeyboardButton = {
  text: string;
  request_contact?: boolean;
  request_location?: boolean;
}

type ReplyKeyboardMarkup = {
  keyboard: Array<Array<KeyboardButton>>;
  resize_keyboard?: boolean;
  one_time_keyboard?: boolean;
  selective?: boolean;
}

type TextMessage = {
  text: string;
  // parse_mode?: string;
}

type VoiceMessage = {
  // parse_mode?: string;
  voice: string | InputFiles;
  // caption?: string;
  // duration?: number;
}

type VideoNoteMessage = {
  video_note: string | InputFiles;
  // caption?: string;
  // duration?: number;
  // length?: number;
  // thumb?: string | InputFiles;
}

type LocationMessage = {
  latitude: number;
  longitude: number;
  horizontal_accuracy?: number;
  live_period?: number;
  heading?: number;
  proximity_alert_radius?: number;
}

type SendMessage = (TextMessage | VoiceMessage | VideoNoteMessage | LocationMessage) & {
  chat_id: number | string;
  disable_notification?: boolean;
  reply_to_message_id?: number;
  allow_sending_without_reply?: boolean;
  reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup;
}

type MessageType = 'text' | 'voice' | 'videoNote' | 'location';


export { SendMessage, MessageType };