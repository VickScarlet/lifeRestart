

class ColorFilterItem extends Laya.Image {
    constructor() {
        super();
    }

    #hexToRgba = (hex) => {
        const rgba = [];
        hex = hex.replace('#', '');
        hex = hex.match(new RegExp('(.{2})(.{2})(.{2})(.{2})', 'i'));
        hex.forEach((item, index) => {
            rgba[index] = parseInt(item, 16);
        });
        rgba.shift();
        return rgba;
    }

    #rgbaToMatrix = (rgba) => {
        let matrix = [
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0
        ];
        matrix[0] = rgba[0] / 255;
        matrix[6] = rgba[1] / 255;
        matrix[12] = rgba[2] / 255;
        matrix[18] = rgba[3] / 255;
        return matrix;
    }

    get colorFilter() {
        return this._colorFilter;
    }
    set colorFilter(value) {
        this._colorFilter = value;
        if(value) {
            const rgba = this.#hexToRgba(this.colorFilter);
            const matrix = this.#rgbaToMatrix(rgba);
            const colorFilter = new Laya.ColorFilter(matrix);
            this.filters = [colorFilter];
        } else {
            this.filters = [];
        }
    }
}
class UIBase extends Laya.View {
    constructor() {
        super();
    }
}

class ViewBase extends UIBase {
    constructor() {
        super();
    }
}

class dialogBase extends UIBase {
    constructor() {
        super();
    }
}

class ScaleButton extends Laya.Button {
    constructor() {
        super();
        this.on(Laya.Event.MOUSE_DOWN, this, this.onMouse, [Laya.Event.MOUSE_DOWN]);
        this.on(Laya.Event.MOUSE_OUT, this, this.onMouse, [Laya.Event.MOUSE_OUT]);
        this.on(Laya.Event.MOUSE_UP, this, this.onMouse, [Laya.Event.MOUSE_UP]);
    }

    onMouse(type) {
        switch (type) {
            case Laya.Event.MOUSE_DOWN:
                Laya.Tween.to(this, { scaleX: 0.9, scaleY: 0.9 }, 100);
                break;
            case Laya.Event.MOUSE_OUT:
            case Laya.Event.MOUSE_UP:
                Laya.Tween.to(this, { scaleX: 1, scaleY: 1 }, 100);
                break;
            default:
                break;
        }
    }
}

