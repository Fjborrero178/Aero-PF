declare const constants: {
    chartType: {
        line: string;
        histogram: string;
        bar: string;
        point: string;
    };
    axisOrientation: {
        top: string;
        bottom: string;
        left: string;
        right: string;
    };
    scaleType: {
        categorical: string;
        linear: string;
        log: string;
    };
    axisFormat: {
        date: string;
        number: string;
        percentage: string;
    };
    legendObject: {
        circle: string;
        line: string;
        square: string;
    };
    symbol: {
        line: string;
        circle: string;
        square: string;
    };
    orientation: {
        vertical: string;
        horizontal: string;
    };
    defaultColors: string[];
};
export default constants;
