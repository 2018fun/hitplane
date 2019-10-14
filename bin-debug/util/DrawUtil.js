/**
 *
 */
var DrawUtil;
(function (DrawUtil) {
    function spliceColor(color) {
        var result = { r: -1, g: -1, b: -1 };
        result.b = color % 256;
        result.g = Math.floor((color / 256)) % 256;
        result.r = Math.floor((color / 256) / 256);
        return result;
    }
    DrawUtil.spliceColor = spliceColor;
    function setImageColor(image, color) {
        // 将16进制颜色分割成rgb值
        var result = spliceColor(color);
        var colorMatrix = [
            1, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 1, 0
        ];
        colorMatrix[0] = result.r / 255;
        colorMatrix[6] = result.g / 255;
        colorMatrix[12] = result.b / 255;
        var colorFilter = new egret.ColorMatrixFilter(colorMatrix);
        image.filters = [colorFilter];
    }
    DrawUtil.setImageColor = setImageColor;
    function textFilter(textContent, fontSize, withShadow) {
        if (fontSize === void 0) { fontSize = 24; }
        if (withShadow === void 0) { withShadow = true; }
        var textEffect = new egret.Sprite();
        var text = new egret.TextField();
        text.text = textContent;
        text.size = fontSize;
        text.stroke = 4;
        text.height = text.textHeight + 10;
        text.width = text.textWidth + 10;
        text.strokeColor = 0x333333;
        text.lineSpacing = 20;
        text.textAlign = egret.HorizontalAlign.CENTER;
        text.verticalAlign = egret.VerticalAlign.MIDDLE;
        if (withShadow) {
            var textShadow = new egret.TextField();
            textShadow.text = textContent;
            textShadow.textColor = 0x333333;
            textShadow.size = fontSize;
            // textShadow.lineSpacing = 20;
            textShadow.stroke = 4;
            textShadow.strokeColor = 0x333333;
            textShadow.x = 2;
            textShadow.y = 4;
            textShadow.height = textShadow.textHeight + 10;
            textShadow.width = textShadow.textWidth + 10;
            textEffect.addChild(textShadow);
            textShadow.textAlign = egret.HorizontalAlign.CENTER;
            textShadow.verticalAlign = egret.VerticalAlign.MIDDLE;
        }
        // text.x = - text.textWidth / 2;
        // text.y = - text.textHeight / 2;
        textEffect.addChild(text);
        textEffect.anchorOffsetX = textEffect.width / 2;
        textEffect.anchorOffsetY = textEffect.height / 2;
        textEffect.cacheAsBitmap = true;
        return textEffect;
    }
    DrawUtil.textFilter = textFilter;
    function randomColor(colorA, colorB) {
        var resultA = spliceColor(colorA);
        var resultB = spliceColor(colorB);
        var colorMatrix = [
            1, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 1, 0
        ];
        colorMatrix[0] = NumUtil.range(resultA.r, resultB.r, true) / 255;
        colorMatrix[6] = NumUtil.range(resultA.g, resultB.g, true) / 255;
        colorMatrix[12] = NumUtil.range(resultA.b, resultB.b, true) / 255;
        var colorFilter = new egret.ColorMatrixFilter(colorMatrix);
        return colorFilter;
    }
    DrawUtil.randomColor = randomColor;
    function colorTween(image, from, to, ms) {
        if (ms === void 0) { ms = 2000; }
        var fromResult = spliceColor(from);
        var toResult = spliceColor(to);
        console.log(fromResult);
        console.log(toResult);
        var colorMatrix = [
            1, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 1, 0
        ];
        var times = 0;
        var interval = egret.setInterval(function () {
            if (times < 20) {
                times++;
                colorMatrix[0] = (Math.floor((toResult.r - fromResult.r) * times / 20) + fromResult.r) / 255;
                colorMatrix[6] = (Math.floor((toResult.g - fromResult.g) * times / 20) + fromResult.g) / 255;
                colorMatrix[12] = (Math.floor((toResult.b - fromResult.b) * times / 20) + fromResult.b) / 255;
                image.filters = [new egret.ColorMatrixFilter(colorMatrix)];
            }
            else {
                egret.clearInterval(interval);
            }
        }, this, 100);
    }
    DrawUtil.colorTween = colorTween;
})(DrawUtil || (DrawUtil = {}));
