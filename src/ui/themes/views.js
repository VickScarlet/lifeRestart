const pages = {
    LOADING: 'LOADING',
    MAIN: 'MAIN',
    TALENT: 'TALENT',
    PROPERTY: 'PROPERTY',
    TRAJECTORY: 'TRAJECTORY',
    SUMMARY: 'SUMMARY',
    ACHIEVEMENT: 'ACHIEVEMENT',
    THANKS: 'THANKS',
    THEMES: 'THEMES',
    SAVELOAD: 'SAVELOAD',
    MODE: 'MODE',
    CELEBRITY: 'CELEBRITY'
};

const popups = {
    ACHIEVEMENT: 'POPUP_ACHIEVEMENT',
    MESSAGE: 'POPUP_MESSAGE',
};

const cyber = {
    pages: {
        [pages.LOADING]: "loading",
        [pages.MAIN]: "cyber/main",
        [pages.TALENT]: "cyber/talent",
        [pages.PROPERTY]: "cyber/property",
        [pages.TRAJECTORY]: "cyber/trajectory",
        [pages.SUMMARY]: "cyber/summary",
        [pages.ACHIEVEMENT]: "cyber/achievement",
        [pages.THANKS]: "default/thanks",
        [pages.THEMES]: 'themes',
        [pages.SAVELOAD]: 'saveload',
        [pages.MODE]: 'cyber/mode',
        [pages.CELEBRITY]: 'cyber/celebrity',
    },
    popups: {
        [popups.ACHIEVEMENT]: "cyber/popup/achievementPopup",
        [popups.MESSAGE]: "message",
    },
    configs: {
        bgColor: '#04131f',
        common: {
            topSupportItem: {
                defaultColor: '#ffa500',
                defaultStroke: '#ffa500',
                hoverColor: '#ffc500',
                hoverStroke: '#ffa500',
            },
            defaultFontColor: '#cccccc',
            grade: [
                '#cccccc',
                '#55fffe',
                '#b17cff',
                '#ffce45',
            ],
            filter: [
                '#ccccccff',
                '#55fffeff',
                '#b17cffff',
                '#ffce45ff',
            ],
            gradeBlk: [
                {
                    visible: false,
                },
                {
                    defaultColor: '#55fffe',
                    hoverColor: '#55fffe',
                    visible: true,
                },
                {
                    defaultColor: '#b17cff',
                    hoverColor: '#b17cff',
                    visible: true,
                },
                {
                    defaultColor: '#ffce45',
                    hoverColor: '#ffce45',
                    visible: true,
                },
            ]
        },
        pages: {
            [pages.MAIN]: {
                vars: {
                    btnThemes: {
                        defaultColor: '#cccccc',
                        radius: 100,
                    },
                    btnSaveLoad: {
                        defaultColor: '#5865f2',
                        defaultStroke: '#eeeeee',
                        defaultLabel: '#eeeeee',
                        hoverColor: '#1160b0',
                        hoverStroke: '#eeeeee',
                        hoverLabel: '#eeeeee',
                        lineWidth: 0,
                        radius: 100,
                    },
                }
            },
            [pages.THANKS]: {
                vars: {
                    btnBack: {
                        defaultColor: '#5865f2',
                        defaultStroke: '#eeeeee',
                        defaultLabel: '#eeeeee',
                        hoverColor: '#1160b0',
                        hoverStroke: '#eeeeee',
                        hoverLabel: '#eeeeee',
                        lineWidth: 0,
                        radius: 4,
                    },
                    btnAFD: {
                        defaultColor: '#8764de',
                        defaultStroke: '#8764de',
                        defaultLabel: '#ffffff',
                        hoverColor: '#9774ee',
                        hoverStroke: '#9774ee',
                        hoverLabel: '#ffffff',
                        radius: 4,
                    },
                    btnDDF: {
                        defaultColor: '#cc6699',
                        defaultStroke: '#cc6699',
                        defaultLabel: '#ffffff',
                        hoverColor: '#dc76a9',
                        hoverStroke: '#dc76a9',
                        hoverLabel: '#ffffff',
                        radius: 4,
                    },
                },
            },
            [pages.THEMES]: {
                vars: {
                    btnOK: {
                        defaultColor: '#28b070',
                        defaultLabel: '#ffffff',
                        hoverColor: '#00ff00',
                        hoverLabel: '#ffffff',
                        radius: 80,
                    },
                    btnClose: {
                        defaultColor: '#eb3941',
                        defaultLabel: '#ffffff',
                        hoverColor: '#ff0000',
                        hoverLabel: '#ffffff',
                        radius: 80,
                    },
                }
            },
            [pages.SAVELOAD]: {
                vars: {
                    btnClose: {
                        defaultColor: '#eb3941',
                        hoverColor: '#ff0000',
                    },
                    btnSave: {
                        defaultColor: '#007046',
                        hoverColor: '#76f190',
                    },
                    btnRead: {
                        defaultColor: '#007046',
                        hoverColor: '#76f190',
                    },
                    btnLoad: {
                        defaultColor: '#fc5531',
                        hoverColor: '#f28b54',
                    },
                    btnWrite: {
                        defaultColor: '#fc5531',
                        hoverColor: '#f28b54',
                    },
                    btnBackup: {
                        defaultColor: '#9c30cd',
                        hoverColor: '#bf50fd',
                        radius: 8,
                        defaultLabel: '#ffffff',
                        hoverLabel: '#ffffff',
                    },
                },
                names: {
                    btnSmall: {
                        radius: 80,
                        defaultLabel: '#ffffff',
                        hoverLabel: '#ffffff',
                    }
                }
            },
        }
    }
}

const dark = {
    pages: {
        [pages.LOADING]: "loading",
        [pages.MAIN]: "default/main",
        [pages.TALENT]: "default/talent",
        [pages.PROPERTY]: "default/property",
        [pages.TRAJECTORY]: "default/trajectory",
        [pages.SUMMARY]: "default/summary",
        [pages.ACHIEVEMENT]: "default/achievement",
        [pages.THANKS]: "default/thanks",
        [pages.THEMES]: 'themes',
        [pages.SAVELOAD]: 'saveload',
        [pages.MODE]: 'default/mode',
        [pages.CELEBRITY]: 'default/celebrity',
    },
    popups: {
        [popups.ACHIEVEMENT]: "default/popup/achievementPopup",
        [popups.MESSAGE]: "message",
    },
    configs: {
        bgColor: '#222831',
        common: {
            defaultFontColor: '#eeeeee',
            trajectoryItem: {
                box: {
                    // filters: ()=>[new Laya.GlowFilter("#eeeeee", 8, 0, 0)],
                    defaultStroke: '#eeeeee',
                    hoverStroke: '#eeeeee',
                    lineWidth: 2,
                },
                grade: [
                    {
                        defaultColor: '#464646',
                        hoverColor: '#4a5361',
                    },
                    {
                        defaultColor: '#6495ed',
                        hoverColor: '#87cefa',
                    },
                    {
                        defaultColor: '#e2a7ff',
                        hoverColor: '#e7beff',
                    },
                    {
                        defaultColor: '#ffa07a',
                        hoverColor: '#f7a989',
                    },
                ],
                ageColor: '#ffffee',
                contentColor: '#eeeeee',
            },
            topSupportItem: {
                defaultColor: '#ffa500',
                defaultStroke: '#ffa500',
                hoverColor: '#ffc500',
                hoverStroke: '#ffa500',
            },
            grade: [
                '#cccccc',
                '#55fffe',
                '#b17cff',
                '#ffce45',
            ],
            filter: [
                '#ccccccff',
                '#55fffeff',
                '#b17cffff',
                '#ffce45ff',
            ],
            card: [
                {
                    normal: {
                        defaultColor: '#464646',
                        defaultStroke: '#f8f8f8',
                        defaultLabel: '#eeeeee',
                        hoverColor: '#c0c0c0',
                        hoverStroke: '#f8f8f8',
                        hoverLabel: '#3b3b3b',
                        lineWidth: 4,
                        radius: 4,
                    },
                    selected: {
                        defaultColor: '#c0c0c0',
                        defaultStroke: '#a5ff88',
                        defaultLabel: '#3b3b3b',
                        hoverColor: '#c0c0c0',
                        hoverStroke: '#a5ff88',
                        hoverLabel: '#3b3b3b',
                        lineWidth: 4,
                        radius: 4,
                    }
                },
                {
                    normal: {
                        defaultColor: '#6495ed',
                        defaultStroke: '#f8f8f8',
                        defaultLabel: '#eeeeee',
                        hoverColor: '#87cefa',
                        hoverStroke: '#f8f8f8',
                        hoverLabel: '#3b3b3b',
                        lineWidth: 4,
                        radius: 4,
                    },
                    selected: {
                        defaultColor: '#87cefa',
                        defaultStroke: '#a5ff88',
                        defaultLabel: '#3b3b3b',
                        hoverColor: '#87cefa',
                        hoverStroke: '#a5ff88',
                        hoverLabel: '#3b3b3b',
                        lineWidth: 4,
                        radius: 4,
                    }
                },
                {
                    normal: {
                        defaultColor: '#e2a7ff',
                        defaultStroke: '#f8f8f8',
                        defaultLabel: '#eeeeee',
                        hoverColor: '#e7beff',
                        hoverStroke: '#f8f8f8',
                        hoverLabel: '#3b3b3b',
                        lineWidth: 4,
                        radius: 4,
                    },
                    selected: {
                        defaultColor: '#e7beff',
                        defaultStroke: '#a5ff88',
                        defaultLabel: '#3b3b3b',
                        hoverColor: '#e7beff',
                        hoverStroke: '#a5ff88',
                        hoverLabel: '#3b3b3b',
                        lineWidth: 4,
                        radius: 4,
                    }
                },
                {
                    normal: {
                        defaultColor: '#ffa07a',
                        defaultStroke: '#f8f8f8',
                        defaultLabel: '#eeeeee',
                        hoverColor: '#f7a989',
                        hoverStroke: '#f8f8f8',
                        hoverLabel: '#3b3b3b',
                        lineWidth: 4,
                        radius: 4,
                    },
                    selected: {
                        defaultColor: '#f7a989',
                        defaultStroke: '#f8f8f8',
                        defaultLabel: '#3b3b3b',
                        hoverColor: '#f7a989',
                        hoverStroke: '#f8f8f8',
                        hoverLabel: '#3b3b3b',
                        lineWidth: 4,
                        radius: 4,
                    }
                }
            ],
            summary: [
                {
                    defaultColor: '#464646',
                    defaultStroke: '#f8f8f8',
                    defaultLabel: '#eeeeee',
                    hoverColor: '#c0c0c0',
                    hoverStroke: '#f8f8f8',
                    hoverLabel: '#3b3b3b',
                    lineWidth: 2,
                    radius: 0,
                },{
                    defaultColor: '#6495ed',
                    defaultStroke: '#f8f8f8',
                    defaultLabel: '#eeeeee',
                    hoverColor: '#87cefa',
                    hoverStroke: '#f8f8f8',
                    hoverLabel: '#3b3b3b',
                    lineWidth: 2,
                    radius: 0,
                },{
                    defaultColor: '#e2a7ff',
                    defaultStroke: '#f8f8f8',
                    defaultLabel: '#eeeeee',
                    hoverColor: '#e7beff',
                    hoverStroke: '#f8f8f8',
                    hoverLabel: '#3b3b3b',
                    lineWidth: 2,
                    radius: 0,
                },
                {
                    defaultColor: '#ffa07a',
                    defaultStroke: '#f8f8f8',
                    defaultLabel: '#eeeeee',
                    hoverColor: '#f7a989',
                    hoverStroke: '#f8f8f8',
                    hoverLabel: '#3b3b3b',
                    lineWidth: 2,
                    radius: 0,
                }
            ],
            achievement: [
                {
                    defaultColor: '#464646',
                    defaultStroke: '#f8f8f8',
                    defaultLabel: '#eeeeee',
                    hoverColor: '#c0c0c0',
                    hoverStroke: '#f8f8f8',
                    hoverLabel: '#3b3b3b',
                    lineWidth: 4,
                    radius: 0,
                },{
                    defaultColor: '#6495ed',
                    defaultStroke: '#f8f8f8',
                    defaultLabel: '#eeeeee',
                    hoverColor: '#87cefa',
                    hoverStroke: '#f8f8f8',
                    hoverLabel: '#3b3b3b',
                    lineWidth: 4,
                    radius: 0,
                },{
                    defaultColor: '#e2a7ff',
                    defaultStroke: '#f8f8f8',
                    defaultLabel: '#eeeeee',
                    hoverColor: '#e7beff',
                    hoverStroke: '#f8f8f8',
                    hoverLabel: '#3b3b3b',
                    lineWidth: 4,
                    radius: 0,
                },
                {
                    defaultColor: '#ffa07a',
                    defaultStroke: '#f8f8f8',
                    defaultLabel: '#eeeeee',
                    hoverColor: '#f7a989',
                    hoverStroke: '#f8f8f8',
                    hoverLabel: '#3b3b3b',
                    lineWidth: 4,
                    radius: 0,
                }
            ],
            characterItem: {
                name: {
                    defaultColor: '#393e46',
                    defaultStroke: '#eeeeee',
                    defaultLabel: '#eeeeee',
                    hoverColor: '#ff7878',
                    hoverStroke: '#eeeeee',
                    hoverLabel: '#eeeeee',
                    lineWidth: 2,
                },
                state: {
                    defaultColor: '#393e46',
                    defaultStroke: '#eeeeee',
                    defaultLabel: '#eeeeee',
                    hoverColor: '#393e46',
                    hoverStroke: '#eeeeee',
                    hoverLabel: '#eeeeee',
                    lineWidth: 2,
                },
                propertyColor: '#000000',
            },
        },
        class: {
            btn_main: {
                defaultColor: '#393e46',
                defaultStroke: '#eeeeee',
                defaultLabel: '#eeeeee',
                hoverColor: '#ff7878',
                hoverStroke: '#eeeeee',
                hoverLabel: '#eeeeee',
                lineWidth: 2,
                radius: 4,
            },
            btn_main2: {
                defaultColor: '#ffa07a',
                defaultStroke: '#f8f8f8',
                defaultLabel: '#3b3b3b',
                hoverColor: '#ff7878',
                hoverStroke: '#f8f8f8',
                hoverLabel: '#eeeeee',
                lineWidth: 2,
                radius: 4,
            },
            btn_small: {
                defaultColor: '#5865f2',
                defaultStroke: '#eeeeee',
                defaultLabel: '#eeeeee',
                hoverColor: '#1160b0',
                hoverStroke: '#eeeeee',
                hoverLabel: '#eeeeee',
                lineWidth: 0,
                radius: 4,
            },
            title: {
                color: '#ffffff',
            },
            font_default: {
                color: '#eeeeee',
            }
        },
        pages: {
            [pages.MAIN]: {
                vars: {
                    btnRemake: 'btn_main',
                    btnThemes: {
                        defaultColor: '#cccccc',
                        radius: 100,
                    },
                    btnSaveLoad: {
                        defaultColor: '#5865f2',
                        defaultStroke: '#eeeeee',
                        defaultLabel: '#eeeeee',
                        hoverColor: '#1160b0',
                        hoverStroke: '#eeeeee',
                        hoverLabel: '#eeeeee',
                        lineWidth: 0,
                        radius: 100,
                    },
                },
                names: {
                    title: 'title',
                    btnSmall: 'btn_small',
                }
            },
            [pages.TALENT]: {
                vars: {
                    btnDrawCard: 'btn_main',
                    btnNext: 'btn_main',
                    title: 'title',
                }
            },
            [pages.PROPERTY]: {
                vars: {
                    btnRandomAllocate: 'btn_main',
                    btnNext: 'btn_main2',
                    title: 'title',
                },
                names: {
                    font_default: 'font_default',
                    property: {
                        colorFilter: '#eeeeeeff'
                    }
                }
            },
            [pages.TRAJECTORY]: {
                vars: {
                    btnSummary: 'btn_main',
                    boxTrajectory: {
                        defaultColor: '#393e46',
                        defaultStroke: '#eeeeee',
                        defaultLabel: '#eeeeee',
                        hoverColor: '#393e46',
                        hoverStroke: '#eeeeee',
                        hoverLabel: '#eeeeee',
                        lineWidth: 2,
                        radius: 4,
                    },
                    boxSpeed: {
                        colorFilter: '#ffffffff'
                    }
                },
                names: {
                    propertyBox: {
                        defaultColor: '#222831',
                        defaultStroke: '#eeeeee',
                        defaultLabel: '#eeeeee',
                        hoverColor: '#222831',
                        hoverStroke: '#eeeeee',
                        hoverLabel: '#eeeeee',
                        lineWidth: 2,
                        radius: 4,
                    },
                    propertyValue: {
                        defaultColor: '#eeeeee',
                        defaultStroke: '#eeeeee',
                        defaultLabel: '#222831',
                        hoverColor: '#eeeeee',
                        hoverStroke: '#eeeeee',
                        hoverLabel: '#222831',
                        lineWidth: 0,
                        radius: 4,
                    }
                }
            },
            [pages.SUMMARY]: {
                vars: {
                    btnAgain: 'btn_main',
                    title: 'title',
                },
                names: {
                    font_default: 'font_default',
                }
            },
            [pages.ACHIEVEMENT]: {
                vars: {
                    btnBack: 'btn_small',
                    btnRank: 'btn_small',
                },
                names: {
                    font_default: 'font_default',
                    title: 'title',
                }
            },
            [pages.THANKS]: {
                vars: {
                    btnBack: 'btn_small',
                    btnAFD: {
                        defaultColor: '#8764de',
                        defaultStroke: '#8764de',
                        defaultLabel: '#ffffff',
                        hoverColor: '#9774ee',
                        hoverStroke: '#9774ee',
                        hoverLabel: '#ffffff',
                        radius: 4,
                    },
                    btnDDF: {
                        defaultColor: '#cc6699',
                        defaultStroke: '#cc6699',
                        defaultLabel: '#ffffff',
                        hoverColor: '#dc76a9',
                        hoverStroke: '#dc76a9',
                        hoverLabel: '#ffffff',
                        radius: 4,
                    },
                },
            },
            [pages.THEMES]: {
                vars: {
                    btnOK: {
                        defaultColor: '#28b070',
                        defaultLabel: '#ffffff',
                        hoverColor: '#00ff00',
                        hoverLabel: '#ffffff',
                        radius: 80,
                    },
                    btnClose: {
                        defaultColor: '#eb3941',
                        defaultLabel: '#ffffff',
                        hoverColor: '#ff0000',
                        hoverLabel: '#ffffff',
                        radius: 80,
                    },
                }
            },
            [pages.SAVELOAD]: {
                vars: {
                    btnClose: {
                        defaultColor: '#eb3941',
                        hoverColor: '#ff0000',
                    },
                    btnSave: {
                        defaultColor: '#007046',
                        hoverColor: '#76f190',
                    },
                    btnRead: {
                        defaultColor: '#007046',
                        hoverColor: '#76f190',
                    },
                    btnLoad: {
                        defaultColor: '#fc5531',
                        hoverColor: '#f28b54',
                    },
                    btnWrite: {
                        defaultColor: '#fc5531',
                        hoverColor: '#f28b54',
                    },
                    btnBackup: {
                        defaultColor: '#9c30cd',
                        hoverColor: '#bf50fd',
                        radius: 8,
                        defaultLabel: '#ffffff',
                        hoverLabel: '#ffffff',
                    },
                },
                names: {
                    btnSmall: {
                        radius: 80,
                        defaultLabel: '#ffffff',
                        hoverLabel: '#ffffff',
                    }
                }
            },
            [pages.MODE]: {
                names: {
                    font_default: 'font_default',
                    btn: 'btn_main',
                }
            },
            [pages.CELEBRITY]: {
                vars: {
                    btnRetry: 'btn_main',
                    btnNext: 'btn_main2',
                }
            },
        },
        popups: {
            [popups.ACHIEVEMENT]: {
                vars: {
                    bg1: {
                        defaultColor: '#292a28',
                        defaultStroke: '#84ff55',
                        hoverColor: '#292a28',
                        hoverStroke: '#84ff55',
                    }
                }
            }
        }
    }
}

const light = {
    pages: {
        [pages.LOADING]: "loading",
        [pages.MAIN]: "default/main",
        [pages.TALENT]: "default/talent",
        [pages.PROPERTY]: "default/property",
        [pages.TRAJECTORY]: "default/trajectory",
        [pages.SUMMARY]: "default/summary",
        [pages.ACHIEVEMENT]: "default/achievement",
        [pages.THANKS]: "default/thanks",
        [pages.THEMES]: 'themes',
        [pages.SAVELOAD]: 'saveload',
        [pages.MODE]: 'default/mode',
        [pages.CELEBRITY]: 'default/celebrity',
    },
    popups: {
        [popups.ACHIEVEMENT]: "default/popup/achievementPopup",
        [popups.MESSAGE]: "message",
    },
    configs: {
        bgColor: '#ffffff',
        common: {
            defaultFontColor: '#000000',
            trajectoryItem: {
                box: {
                    // filters: ()=>[new Laya.GlowFilter("#b1b1b1", 8, 0, 0)],
                    defaultStroke: '#b1b1b1',
                    hoverStroke: '#b1b1b1',
                    lineWidth: 2,
                },
                grade: [
                    {
                        defaultColor: '#ffffff',
                        hoverColor: '#ededed',
                    },
                    {
                        defaultColor: '#87cefa',
                        hoverColor: '#6495ed',
                    },
                    {
                        defaultColor: '#e7beff',
                        hoverColor: '#e2a7ff',
                    },
                    {
                        defaultColor: '#f7a989',
                        hoverColor: '#ffa07a',
                    },
                ],
                ageColor: '#000000',
                contentColor: '#000000',
            },
            topSupportItem: {
                defaultColor: '#ffa500',
                defaultStroke: '#ffa500',
                hoverColor: '#ffc500',
                hoverStroke: '#ffa500',
            },
            grade: [
                '#000000',
                '#55fffe',
                '#b17cff',
                '#ffce45',
            ],
            filter: [
                '#000000ff',
                '#55fffeff',
                '#b17cffff',
                '#ffce45ff',
            ],
            card: [
                {
                    normal: {
                        defaultColor: '#ededed',
                        defaultStroke: '#f8f8f8',
                        defaultLabel: '#666666',
                        hoverColor: '#666666',
                        hoverStroke: '#f8f8f8',
                        hoverLabel: '#ffffff',
                        lineWidth: 4,
                        radius: 4,
                    },
                    selected: {
                        defaultColor: '#666666',
                        defaultStroke: '#a5ff88',
                        defaultLabel: '#ffffff',
                        hoverColor: '#666666',
                        hoverStroke: '#a5ff88',
                        hoverLabel: '#ffffff',
                        lineWidth: 4,
                        radius: 4,
                    }
                },
                {
                    normal: {
                        defaultColor: '#87cefa',
                        defaultStroke: '#f8f8f8',
                        defaultLabel: '#666666',
                        hoverColor: '#6495ed',
                        hoverStroke: '#f8f8f8',
                        hoverLabel: '#ffffff',
                        lineWidth: 4,
                        radius: 4,
                    },
                    selected: {
                        defaultColor: '#6495ed',
                        defaultStroke: '#a5ff88',
                        defaultLabel: '#ffffff',
                        hoverColor: '#6495ed',
                        hoverStroke: '#a5ff88',
                        hoverLabel: '#ffffff',
                        lineWidth: 4,
                        radius: 4,
                    }
                },
                {
                    normal: {
                        defaultColor: '#e7beff',
                        defaultStroke: '#f8f8f8',
                        defaultLabel: '#666666',
                        hoverColor: '#e2a7ff',
                        hoverStroke: '#f8f8f8',
                        hoverLabel: '#ffffff',
                        lineWidth: 4,
                        radius: 4,
                    },
                    selected: {
                        defaultColor: '#e2a7ff',
                        defaultStroke: '#a5ff88',
                        defaultLabel: '#ffffff',
                        hoverColor: '#e2a7ff',
                        hoverStroke: '#a5ff88',
                        hoverLabel: '#ffffff',
                        lineWidth: 4,
                        radius: 4,
                    }
                },
                {
                    normal: {
                        defaultColor: '#f7a989',
                        defaultStroke: '#f8f8f8',
                        defaultLabel: '#666666',
                        hoverColor: '#ffa07a',
                        hoverStroke: '#f8f8f8',
                        hoverLabel: '#ffffff',
                        lineWidth: 4,
                        radius: 4,
                    },
                    selected: {
                        defaultColor: '#ffa07a',
                        defaultStroke: '#f8f8f8',
                        defaultLabel: '#ffffff',
                        hoverColor: '#ffa07a',
                        hoverStroke: '#f8f8f8',
                        hoverLabel: '#ffffff',
                        lineWidth: 4,
                        radius: 4,
                    }
                }
            ],
            summary: [
                {
                    defaultColor: '#ededed',
                    defaultStroke: '#f8f8f8',
                    defaultLabel: '#666666',
                    hoverColor: '#666666',
                    hoverStroke: '#f8f8f8',
                    hoverLabel: '#ffffff',
                    lineWidth: 4,
                    radius: 4,
                },{
                    defaultColor: '#6495ed',
                    defaultStroke: '#f8f8f8',
                    defaultLabel: '#ffffff',
                    hoverColor: '#87cefa',
                    hoverStroke: '#f8f8f8',
                    hoverLabel: '#666666',
                    lineWidth: 4,
                    radius: 4,
                },{
                    defaultColor: '#e2a7ff',
                    defaultStroke: '#f8f8f8',
                    defaultLabel: '#ffffff',
                    hoverColor: '#e7beff',
                    hoverStroke: '#f8f8f8',
                    hoverLabel: '#666666',
                    lineWidth: 4,
                    radius: 4,
                },{
                    defaultColor: '#ffa07a',
                    defaultStroke: '#f8f8f8',
                    defaultLabel: '#ffffff',
                    hoverColor: '#f7a989',
                    hoverStroke: '#f8f8f8',
                    hoverLabel: '#666666',
                    lineWidth: 4,
                    radius: 4,
                },
            ],
            achievement: [
                {
                    defaultColor: '#ededed',
                    defaultStroke: '#cccccc',
                    defaultLabel: '#000000',
                    hoverColor: '#eeeeee',
                    hoverStroke: '#cccccc',
                    hoverLabel: '#efefef',
                    lineWidth: 4,
                    radius: 0,
                },{
                    defaultColor: '#6495ed',
                    defaultStroke: '#cccccc',
                    defaultLabel: '#eeeeee',
                    hoverColor: '#87cefa',
                    hoverStroke: '#cccccc',
                    hoverLabel: '#3b3b3b',
                    lineWidth: 4,
                    radius: 0,
                },{
                    defaultColor: '#e2a7ff',
                    defaultStroke: '#cccccc',
                    defaultLabel: '#eeeeee',
                    hoverColor: '#e7beff',
                    hoverStroke: '#cccccc',
                    hoverLabel: '#3b3b3b',
                    lineWidth: 4,
                    radius: 0,
                },{
                    defaultColor: '#ffa07a',
                    defaultStroke: '#cccccc',
                    defaultLabel: '#eeeeee',
                    hoverColor: '#f7a989',
                    hoverStroke: '#cccccc',
                    hoverLabel: '#3b3b3b',
                    lineWidth: 4,
                    radius: 0,
                }
            ],
            characterItem: {
                name: {
                    defaultColor: '#ffffff',
                    defaultStroke: '#cccccc',
                    defaultLabel: '#000000',
                    hoverColor: '#ff7878',
                    hoverStroke: '#cccccc',
                    hoverLabel: '#ffffff',
                    lineWidth: 2,
                },
                state: {
                    defaultColor: '#ffffff',
                    defaultStroke: '#cccccc',
                    defaultLabel: '#000000',
                    hoverColor: '#ffffff',
                    hoverStroke: '#cccccc',
                    hoverLabel: '#000000',
                    lineWidth: 2,
                },
                propertyColor: '#000000',
            },
        },
        class: {
            btn_main: {
                defaultColor: '#ffffff',
                defaultStroke: '#cccccc',
                defaultLabel: '#000000',
                hoverColor: '#ff7878',
                hoverStroke: '#cccccc',
                hoverLabel: '#ffffff',
                lineWidth: 2,
                radius: 4,
            },
            btn_main2: {
                defaultColor: '#f7a989',
                defaultStroke: '#f8f8f8',
                defaultLabel: '#ffffff',
                hoverColor: '#ff7878',
                hoverStroke: '#f8f8f8',
                hoverLabel: '#ffffff',
                lineWidth: 2,
                radius: 4,
            },
            btn_small: {
                defaultColor: '#5865f2',
                defaultStroke: '#eeeeee',
                defaultLabel: '#eeeeee',
                hoverColor: '#1160b0',
                hoverStroke: '#eeeeee',
                hoverLabel: '#eeeeee',
                lineWidth: 0,
                radius: 4,
            },
            title: {
                color: '#000000',
            },
            font_default: {
                color: '#000000',
            }
        },
        pages: {
            [pages.MAIN]: {
                vars: {
                    btnRemake: 'btn_main',
                    btnThemes: {
                        defaultColor: '#cccccc',
                        radius: 100,
                    },
                    btnSaveLoad: {
                        defaultColor: '#5865f2',
                        defaultStroke: '#eeeeee',
                        defaultLabel: '#eeeeee',
                        hoverColor: '#1160b0',
                        hoverStroke: '#eeeeee',
                        hoverLabel: '#eeeeee',
                        lineWidth: 0,
                        radius: 100,
                    },
                },
                names: {
                    title: 'title',
                    btnSmall: 'btn_small',
                }
            },
            [pages.TALENT]: {
                vars: {
                    btnDrawCard: 'btn_main',
                    btnNext: 'btn_main',
                    title: 'title',
                }
            },
            [pages.PROPERTY]: {
                vars: {
                    btnRandomAllocate: 'btn_main',
                    btnNext: 'btn_main2',
                    title: 'title',
                },
                names: {
                    font_default: 'font_default',
                    property: {
                        colorFilter: '#000000ff'
                    }
                }
            },
            [pages.TRAJECTORY]: {
                vars: {
                    btnSummary: 'btn_main',
                    boxTrajectory: {
                        defaultColor: '#ffffff',
                        defaultStroke: '#9b9b9b',
                        defaultLabel: '#eeeeee',
                        hoverColor: '#ffffff',
                        hoverStroke: '#9b9b9b',
                        hoverLabel: '#eeeeee',
                        lineWidth: 1,
                        radius: 4,
                    },
                    boxSpeed: {
                        colorFilter: '#666666ff'
                    }
                },
                names: {
                    propertyBox: {
                        defaultColor: '#8d8d8d',
                        defaultStroke: '#eeeeee',
                        defaultLabel: '#ffffff',
                        hoverColor: '#8d8d8d',
                        hoverStroke: '#eeeeee',
                        hoverLabel: '#ffffff',
                        lineWidth: 2,
                        radius: 4,
                    },
                    propertyValue: {
                        defaultColor: '#ffffff',
                        defaultStroke: '#eeeeee',
                        defaultLabel: '#222831',
                        hoverColor: '#ffffff',
                        hoverStroke: '#eeeeee',
                        hoverLabel: '#222831',
                        lineWidth: 0,
                        radius: 4,
                    }
                }
            },
            [pages.SUMMARY]: {
                vars: {
                    btnAgain: 'btn_main',
                    title: 'title',
                },
                names: {
                    font_default: 'font_default',
                }
            },
            [pages.ACHIEVEMENT]: {
                vars: {
                    btnBack: 'btn_small',
                    btnRank: 'btn_small',
                },
                names: {
                    font_default: 'font_default',
                    title: 'title',
                }
            },
            [pages.THANKS]: {
                vars: {
                    btnBack: 'btn_small',
                    btnAFD: {
                        defaultColor: '#8764de',
                        defaultStroke: '#8764de',
                        defaultLabel: '#ffffff',
                        hoverColor: '#9774ee',
                        hoverStroke: '#9774ee',
                        hoverLabel: '#ffffff',
                        radius: 4,
                    },
                    btnDDF: {
                        defaultColor: '#cc6699',
                        defaultStroke: '#cc6699',
                        defaultLabel: '#ffffff',
                        hoverColor: '#dc76a9',
                        hoverStroke: '#dc76a9',
                        hoverLabel: '#ffffff',
                        radius: 4,
                    }
                },
            },
            [pages.THEMES]: {
                vars: {
                    btnOK: {
                        defaultColor: '#28b070',
                        defaultLabel: '#ffffff',
                        hoverColor: '#00ff00',
                        hoverLabel: '#ffffff',
                        radius: 80,
                    },
                    btnClose: {
                        defaultColor: '#eb3941',
                        defaultLabel: '#ffffff',
                        hoverColor: '#ff0000',
                        hoverLabel: '#ffffff',
                        radius: 80,
                    },
                }
            },
            [pages.SAVELOAD]: {
                vars: {
                    btnClose: {
                        defaultColor: '#eb3941',
                        hoverColor: '#ff0000',
                    },
                    btnSave: {
                        defaultColor: '#007046',
                        hoverColor: '#76f190',
                    },
                    btnRead: {
                        defaultColor: '#007046',
                        hoverColor: '#76f190',
                    },
                    btnLoad: {
                        defaultColor: '#fc5531',
                        hoverColor: '#f28b54',
                    },
                    btnWrite: {
                        defaultColor: '#fc5531',
                        hoverColor: '#f28b54',
                    },
                    btnBackup: {
                        defaultColor: '#9c30cd',
                        hoverColor: '#bf50fd',
                        radius: 8,
                        defaultLabel: '#ffffff',
                        hoverLabel: '#ffffff',
                    },
                },
                names: {
                    btnSmall: {
                        radius: 80,
                        defaultLabel: '#ffffff',
                        hoverLabel: '#ffffff',
                    }
                }
            },
            [pages.MODE]: {
                names: {
                    font_default: 'font_default',
                    btn: 'btn_main',
                }
            },
            [pages.CELEBRITY]: {
                vars: {
                    btnRetry: 'btn_main',
                    btnNext: 'btn_main2',
                }
            },
        },
        popups: {
            [popups.ACHIEVEMENT]: {
                vars: {
                    bg1: {
                        defaultColor: '#ffffff',
                        defaultStroke: '#84ff55',
                        hoverColor: '#ffffff',
                        hoverStroke: '#84ff55',
                        lineWidth: 1,
                    }
                }
            }

        }
    }
}

const themes = { default: dark, cyber, dark, light };

export default { themes, pages, popups };