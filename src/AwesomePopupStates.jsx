const fadeAnimStates = {
    start: {
        style: {
            opacity: 0,
        },
        duration: 0, // How long this will stay in this state
        nextStateKey: 'in',
    },
    in: {
        style: {
            opacity: 1,
        },
        duration: 2000,
        nextStateKey: 'wait',
    },
    wait: {
        style: {
            opacity: 1,
            height: '100%',
        },
        duration: 8000,
        nextStateKey: 'end',
    },
    end: {
        style: {
            opacity: 0,
            height: '0%',
        },
        duration: 2000,
        unmountOnComplete: true,
    },
};

const clipAnimStates = {
    start: {
        style: {
            clipPath: 'inset(0 100% 0 0)',
        },
        duration: 0,
        nextStateKey: 'in',
    },
    in: {
        style: {
            clipPath: 'inset(0 0 0 0)',
        },
        duration: 500,
        nextStateKey: 'wait',
    },
    wait: {
        style: {
            clipPath: 'inset(0 0 0 0)',
        },
        duration: 8000,
        nextStateKey: 'end',
    },
    end: {
        style: {
            clipPath: 'inset(0 100% 0 0)',
        },
        duration: 500,
        unmountOnComplete: true,
    },
};

const AwesomePopupStates = {
    fade: fadeAnimStates,
    clip: clipAnimStates,
};

export {AwesomePopupStates};
