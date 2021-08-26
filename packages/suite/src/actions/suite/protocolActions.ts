import { PROTOCOL_SCHEME } from '@suite-support/Protocol';
import { PROTOCOL } from './constants';

export type ProtocolAction =
    | {
          type: typeof PROTOCOL.FILL_SEND_FORM;
          shouldFillSendForm: boolean;
      }
    | {
          type: typeof PROTOCOL.SAVE_COIN_PROTOCOL;
          scheme: PROTOCOL_SCHEME;
          address: string;
          amount: number;
      }
    | { type: typeof PROTOCOL.RESET };

export const fillSendForm = (shouldFillSendForm: boolean): ProtocolAction => ({
    type: PROTOCOL.FILL_SEND_FORM,
    shouldFillSendForm,
});

export const saveCoinProtocol = (
    scheme: PROTOCOL_SCHEME,
    address: string,
    amount: number,
): ProtocolAction => ({
    type: PROTOCOL.SAVE_COIN_PROTOCOL,
    scheme,
    address,
    amount,
});

export const resetProtocol = (): ProtocolAction => ({
    type: PROTOCOL.RESET,
});
