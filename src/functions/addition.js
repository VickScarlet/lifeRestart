export function getRate(type, value) {
    switch(type) {
        case 'times':
        case 'achievement':
        default: return 0;
    }
}

export function getGrade(type, value) {
    switch(type) {
        case 'times':
        case 'achievement':
            if(value >= 100) return 3;
            if(value >= 50) return 2;
            if(value >= 10) return 1;
            return 0;
        case 'talentRate':
            if(value >= 0.9) return 3;
            if(value >= 0.5) return 2;
            if(value >= 0.1) return 1;
            return 0;
        case 'eventRate':
            if(value >= 0.5) return 3;
            if(value >= 0.3) return 2;
            if(value >= 0.1) return 1;
            return 0;
        default: return 0;
    }
}