import produce from 'immer';
import { Action } from '@suite-types';
import { GUIDE } from '@suite-actions/constants';

export interface State {
    open: boolean;
}

export const initialState: State = {
    open: false,
};

const guideReducer = (state: State = initialState, action: Action): State =>
    produce(state, draft => {
        switch (action.type) {
            case GUIDE.OPEN:
                draft.open = true;
                break;
            case GUIDE.CLOSE:
                draft.open = false;
                break;
            default:
                return state;
        }
    });

export default guideReducer;
