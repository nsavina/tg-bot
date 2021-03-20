const adapters = require('../adapters');

describe('test adaptGetToPostMessage function', () => {
  test('adapt text message', () => {
    const data = {
      update_id: 452574437,
      message: {
        message_id: 571,
        from: {
          id: 200207524,
          is_bot: false,
          first_name: 'Nadezhda',
          username: 'savinanana',
          language_code: 'en'
        },
        chat: {
          id: 200207524,
          first_name: 'Nadezhda',
          username: 'savinanana',
          type: 'private'
        },
        date: 1616244264,
        text: 'hi'
      }
    }
    const result = adapters.adaptGetToPostMessage(data);
    expect(result).toEqual({ type: 'text', body: { text: 'hi', chat_id: 200207524 } })
  });

  test('adapt voice message', () => {
    const data = {
      update_id: 452574443,
      message: {
        message_id: 578,
        from: {
          id: 200207524,
          is_bot: false,
          first_name: 'Nadezhda',
          username: 'savinanana',
          language_code: 'en'
        },
        chat: {
          id: 200207524,
          first_name: 'Nadezhda',
          username: 'savinanana',
          type: 'private'
        },
        date: 1616245668,
        voice: {
          duration: 3,
          mime_type: 'audio/ogg',
          file_id: 'AwACAgIAAxkBAAICQmBV86QgSJUJy3FzPYWtCGATz0WqAAKLDgACmiWxSi6xswelJsFFHgQ',
          file_unique_id: 'AgADiw4AApolsUo',
          file_size: 22328
        }
      }
    }
    const result = adapters.adaptGetToPostMessage(data);
    expect(result).toEqual({
      type: 'voice',
      body: {
        voice: 'AwACAgIAAxkBAAICQmBV86QgSJUJy3FzPYWtCGATz0WqAAKLDgACmiWxSi6xswelJsFFHgQ',
        chat_id: 200207524
      }
    })
  });

  test('adapt video note message', () => {
    const data = {
        update_id: 452574448,
        message: {
          message_id: 589,
          from: {
            id: 200207524,
            is_bot: false,
            first_name: 'Nadezhda',
            username: 'savinanana',
            language_code: 'en'
          },
          chat: {
            id: 200207524,
            first_name: 'Nadezhda',
            username: 'savinanana',
            type: 'private'
          },
          date: 1616246887,
          video_note: {
            duration: 1,
            length: 240,
            thumb: [Object],
            file_id: 'DQACAgIAAxkBAAICTWBV-GbfW382Czjw2Q1cgaCocq4-AAKVDgACmiWxSpOf7psM5U1dHgQ',
            file_unique_id: 'AgADlQ4AApolsUo',
            file_size: 68825
          }
        }
    }
    const result = adapters.adaptGetToPostMessage(data);
    expect(result).toEqual({
        type: 'video_note',
        body: {
          video_note: 'DQACAgIAAxkBAAICTWBV-GbfW382Czjw2Q1cgaCocq4-AAKVDgACmiWxSpOf7psM5U1dHgQ',
          chat_id: 200207524
        }
    })
  });

  test('adapt unknown type message', () => {
    expect(() => {
        adapters.adaptGetToPostMessage({ a: 'b' });
    }).toThrowError(new TypeError('Unknown message type'));
  });
});


describe('test adaptMessage function', () => {
    test('adapt unknown type message', () => {
        expect(() => {
            adapters.adaptMessage({ a: 'b' });
        }).toThrowError(new TypeError('Unknown message type'));
    });

    test('adapt message without chat id', () => {
        expect(() => {
            adapters.adaptMessage({ text: 'text' });
        }).toThrowError(new TypeError('No chat id'));
    });

    test('adapt text message', () => {
        const data = {
            message_id: 571,
            from: {
              id: 200207524,
              is_bot: false,
              first_name: 'Nadezhda',
              username: 'savinanana',
              language_code: 'en'
            },
            chat: {
              id: 200207524,
              first_name: 'Nadezhda',
              username: 'savinanana',
              type: 'private'
            },
            date: 1616244264,
            text: 'hi'
        }
        const result = adapters.adaptMessage(data);
        expect(result).toEqual({ type: 'text', body: { text: 'hi', chat_id: 200207524 } })
    });

    test('adapt voice message', () => {
        const data = {
            message_id: 578,
            from: {
              id: 200207524,
              is_bot: false,
              first_name: 'Nadezhda',
              username: 'savinanana',
              language_code: 'en'
            },
            chat: {
              id: 200207524,
              first_name: 'Nadezhda',
              username: 'savinanana',
              type: 'private'
            },
            date: 1616245668,
            voice: {
              duration: 3,
              mime_type: 'audio/ogg',
              file_id: 'AwACAgIAAxkBAAICQmBV86QgSJUJy3FzPYWtCGATz0WqAAKLDgACmiWxSi6xswelJsFFHgQ',
              file_unique_id: 'AgADiw4AApolsUo',
              file_size: 22328
            }
        }
        const result = adapters.adaptMessage(data);
        expect(result).toEqual({
            type: 'voice',
            body: {
              voice: 'AwACAgIAAxkBAAICQmBV86QgSJUJy3FzPYWtCGATz0WqAAKLDgACmiWxSi6xswelJsFFHgQ',
              chat_id: 200207524
            }
        })
    });

    test('adapt video note message', () => {
        const data = {
            message_id: 589,
            from: {
              id: 200207524,
              is_bot: false,
              first_name: 'Nadezhda',
              username: 'savinanana',
              language_code: 'en'
            },
            chat: {
              id: 200207524,
              first_name: 'Nadezhda',
              username: 'savinanana',
              type: 'private'
            },
            date: 1616246887,
            video_note: {
              duration: 1,
              length: 240,
              thumb: [Object],
              file_id: 'DQACAgIAAxkBAAICTWBV-GbfW382Czjw2Q1cgaCocq4-AAKVDgACmiWxSpOf7psM5U1dHgQ',
              file_unique_id: 'AgADlQ4AApolsUo',
              file_size: 68825
            }
        }
        const result = adapters.adaptMessage(data);
        expect(result).toEqual({
            type: 'video_note',
            body: {
              video_note: 'DQACAgIAAxkBAAICTWBV-GbfW382Czjw2Q1cgaCocq4-AAKVDgACmiWxSpOf7psM5U1dHgQ',
              chat_id: 200207524
            }
        })
    });
});