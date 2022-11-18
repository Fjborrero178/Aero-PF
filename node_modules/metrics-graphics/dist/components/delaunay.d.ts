import { AccessorFunction, InteractionFunction, EmptyInteractionFunction, DefinedFunction, GenericD3Selection } from '../misc/typings';
import Scale from './scale';
export interface IDelaunay {
    /** raw data basis for delaunay computations, can be nested */
    points: Array<any>;
    /** function to access the x value for a given data point */
    xAccessor: AccessorFunction;
    /** function to access the y value for a given data point */
    yAccessor: AccessorFunction;
    /** scale used to scale elements in x direction */
    xScale: Scale;
    /** scale used to scale elements in y direction */
    yScale: Scale;
    /** function called with the array of nearest points on mouse movement -- if aggregate is false, the array will contain at most one element */
    onPoint?: InteractionFunction;
    /** function called when the delaunay area is left */
    onLeave?: EmptyInteractionFunction;
    /** function called with the array of nearest points on mouse click in the delaunay area -- if aggregate is false, the array will contain at most one element */
    onClick?: InteractionFunction;
    /** whether or not the points array contains sub-arrays */
    nested?: boolean;
    /** if multiple points have the same x value and should be shown together, aggregate can be set to true */
    aggregate?: boolean;
    /** optional function specifying whether or not to show a given datapoint */
    defined?: DefinedFunction;
}
export default class Delaunay {
    points?: Array<any>;
    aggregatedPoints: any;
    delaunay: any;
    xScale: Scale;
    yScale: Scale;
    xAccessor: AccessorFunction;
    yAccessor: AccessorFunction;
    aggregate: boolean;
    onPoint: InteractionFunction;
    onClick?: InteractionFunction;
    onLeave: EmptyInteractionFunction;
    constructor({ points, xAccessor, yAccessor, xScale, yScale, onPoint, onLeave, onClick, nested, aggregate, defined }: IDelaunay);
    /**
     * Create a new delaunay triangulation.
     *
     * @param isNested whether or not the data is nested
     * @param aggregate whether or not to aggregate points based on their x value
     */
    mountDelaunay(isNested: boolean, aggregate: boolean): void;
    /**
     * Normalize the passed data points.
     *
     * @param {Object} args argument object
     * @param {Array} args.points raw data array
     * @param {Boolean} args.isNested whether or not the points are nested
     * @param {Boolean} args.aggregate whether or not to aggregate points based on their x value
     * @param {Function} [args.defined] optional function specifying whether or not to show a given datapoint.
     */
    normalizePoints({ points, nested, aggregate, defined }: Pick<IDelaunay, 'points' | 'nested' | 'aggregate' | 'defined'>): void;
    /**
     * Handle raw mouse movement inside the delaunay rect.
     * Finds the nearest data point(s) and calls onPoint.
     *
     * @param rawX raw x coordinate of the cursor.
     * @param rawY raw y coordinate of the cursor.
     */
    gotPoint(rawX: number, rawY: number): void;
    /**
     * Handle raw mouse clicks inside the delaunay rect.
     * Finds the nearest data point(s) and calls onClick.
     *
     * @param rawX raw x coordinate of the cursor.
     * @param rawY raw y coordinate of the cursor.
     */
    clickedPoint(rawX: number, rawY: number): void;
    /**
     * Mount the delaunator to a given d3 node.
     *
     * @param svg d3 selection to mount the delaunay elements to.
     */
    mountTo(svg: GenericD3Selection): void;
}
