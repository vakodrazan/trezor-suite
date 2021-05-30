import { GUIDE } from './constants';

export type GuideAction = { type: typeof GUIDE.OPEN } | { type: typeof GUIDE.CLOSE };

export const open = () => ({
    type: GUIDE.OPEN,
});

export const close = () => ({
    type: GUIDE.CLOSE,
});
