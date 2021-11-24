const pages = {
    LOADING: 'LOADING',
    MAIN: 'MAIN',
    TALENT: 'TALENT',
    PROPERTY: 'PROPERTY',
    TRAJECTORY: 'TRAJECTORY',
    SUMMARY: 'SUMMARY',
    ACHIEVEMENT: 'ACHIEVEMENT',
    THANKS: 'THANKS',
};

const popups = {
    ACHIEVEMENT: 'POPUP_ACHIEVEMENT',
};

const colors = {
}

const cyber = {
    pages: {
        [pages.LOADING]: "loading",
        [pages.MAIN]: "cyber/main",
        [pages.TALENT]: "cyber/talent",
        [pages.PROPERTY]: "cyber/property",
        [pages.TRAJECTORY]: "cyber/trajectory",
        [pages.SUMMARY]: "cyber/summary",
        [pages.ACHIEVEMENT]: "cyber/achievement",
        [pages.THANKS]: "cyber/thanks",
    },
    popups: {
        [popups.ACHIEVEMENT]: "cyber/popup/achievementPopup",
    },
    common: {
        grade0: '#cccccc',
        grade1: '#55fffe',
        grade2: '#b17cff',
        grade3: '#ffce45',
        filter0: '#ccccccff',
        filter0: '#55fffeff',
        filter0: '#b17cffff',
        filter0: '#ffce45ff',
    },
    configs: {
        bgColor: '#04131f',
    }
}

const def = {
    pages: {
        [pages.LOADING]: "loading",
        [pages.MAIN]: "default/main",
        [pages.TALENT]: "default/talent",
        [pages.PROPERTY]: "default/property",
        [pages.TRAJECTORY]: "default/trajectory",
        [pages.SUMMARY]: "default/summary",
        [pages.ACHIEVEMENT]: "default/achievement",
        [pages.THANKS]: "default/thanks",
    },
    popups: {
        [popups.ACHIEVEMENT]: "default/popup/achievementPopup",
    },
    configs: {
        bgColor: '#222831',
        common: {
            grade0: '#cccccc',
            grade1: '#55fffe',
            grade2: '#b17cff',
            grade3: '#ffce45',
            filter0: '#ccccccff',
            filter0: '#55fffeff',
            filter0: '#b17cffff',
            filter0: '#ffce45ff',
        },
        class: {
            btn_main: {
                defaultColor: '#393e46',
                defaultStroke: '#eeeeee',
                hoverColor: '#ff7878',
                hoverStroke: '#eeeeee',
                defaultLabel: '#eeeeee',
                hoverLabel: '#eeeeee',
                lineWidth: 2,
                radius: 4,
            },
            btn_small: {
                defaultColor: '#5865f2',
                defaultStroke: '#eeeeee',
                hoverColor: '#1160b0',
                hoverStroke: '#eeeeee',
                defaultLabel: '#eeeeee',
                hoverLabel: '#eeeeee',
                lineWidth: 0,
                radius: 4,
            }
        },
        pages: {
            [pages.MAIN]: {
                vars: {
                    btnRemake: 'btn_main',
                    labTitle: { color: '#eeeeee' },
                    labSubTitle: { color: '#eeeeee' },
                },
                names: {
                    btnSmall: 'btn_small',
                }
            }
        },
        popups: {

        }
    }
}

const themes = { default: def, cyber };

export default { themes, pages, popups };