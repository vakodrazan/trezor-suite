import { defineMessages } from 'react-intl';
import messages from './rawMessages';

// todo: why do we actually need this "define messages"? it feeds into some global object?
const definedMessages = defineMessages(messages);

export default definedMessages;
