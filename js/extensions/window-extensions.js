; (
	/**
	 * Contains the extensions for the global window object.
	 * @module window-extensions
	 * @requires module:string-extensions	 
	 * @author Kate Kotova <katekotova_86@mail.ru>
	 * @copyright Kate Kotova 2017
	 */
	function ( window ) {
		'use strict';

		/**
		 * An none css-value.
		 * @global
		 */
		window.CSS_NONE_VALUE = "none";

		/**
		 * The name of the object type.
		 * @global
		 */
		window.OBJECT_TYPE_NAME = "object";
		/**
		 * The name of the function type.
		 * @global
		 */
		window.FUNCTION_TYPE_NAME = "function";
		/**
		 * The name of the undefined value type.
		 * @global
		 */
		window.UNDEFINED_TYPE_NAME = "undefined";

		/**
		 * The maximum color component of RGB function.
		 * @global
		 */
		window.MAX_RGB_COLOR_COMPONENT = 255;
		/**
		 * The RGBA CSS function name.
		 * @global
		 */
		window.RGBA_CSS_FUNCTION_NAME = "rgba";

		/**
		 * The fill CSS property name.
		 * @global
		 */
		window.FILL_CSS_PROPERTY_NAME = "fill";		
		/**
		 * The font-size CSS property name.
		 * @global
		 */
		window.FONT_SIZE_CSS_PROPERTY_NAME = "font-size";
		/**
		 * The font-weight CSS property name.
		 * @global
		 */
		window.FONT_WEIGHT_CSS_PROPERTY_NAME = "font-weight";	

		/**
		 * The default value of cursor CSS property.
		 * @global
		 */
		window.CURSOR_DEFALUT_VALUE = "default";
		/**
		 * The text value of cursor CSS property.
		 * @global
		 */
		window.CURSOR_TEXT_VALUE = "text";

		/**
		 * The visible value of visiblity CSS property.
		 * @global
		 */
		window.VISIBILITY_VISIBLE_VALUE = "visible";
		/**
		 * The hidden value of visiblity CSS property.
		 * @global
		 */
		window.VISIBILITY_HIDDEN_VALUE = "hidden";

		/*
		The tests for the defining of the variables types.
		var a = null; typeof a == "object"; Array.isArray(a) == false; (a == null) == true
		var b = undefined; typeof b == "undefined"; Array.isArray(b) == false; (b == null) == true
		var c =3.5; typeof c == "number"; Array.isArray(c) == false; (c == null) == false
		var d = ""; typeof d == "string"; Array.isArray(d) == false; (d == null) == false
		var e = []; typeof e == "object"; Array.isArray(e) == true; (e == null) == false
		var h = {}; typeof h == "object"; Array.isArray(h) == false; (h == null) == false
		var k = NaN; typeof k == "number"; Array.isArray(k) == false; (k == null) == false
		var m = Infinity; typeof m == "number"; Array.isArray(m) == false; (m == null) == false
		var f = function() { return 0 }; typeof f == "function"; Array.isArray(f) == false;
			(f == null) == false

		So, typeof g is "object", if g is null, array or object.
		Array.isArray(g) will be true, only if g is array.
		g == null, if g is undefined or null.
		*/

		/**
		 * A strict way for defined if the type of the object is Object.
		 * Not null, not array.
		 * @global
		 * @param {Object} parValue - The object.
		 * @return {Object} true if the object is really Object;
		 * false otherwisw.
		 */
		window.isStrictObject = function ( parValue ) {
			if ( ( parValue == null )
					|| ( typeof parValue != window.OBJECT_TYPE_NAME )
					|| Array.isArray( parValue ) )
				return false;
			return true;
		}; // isStrictObject

		/**
		 * A strict way for defined if the type of the object is Array.
		 * Not null, not object.
		 * @global
		 * @param {Object} parValue - The object.
		 * @return {Object} true if the object is really Array;
		 * false otherwisw.
		 */
		window.isStrictArray = function ( parValue ) {
			if ( ( parValue == null )
					|| ( typeof parValue != window.OBJECT_TYPE_NAME )
					|| !Array.isArray( parValue ) )
				return false;
			return true;
		}; // isStrictArray

		/**
		 * The Shallow, superficial copy of the object.
		 * @global
		 * @param {Object} parObject - The copying object.
		 * @return {Object} The shallow copy of the object.
		 */
		 window.shallowCopy = function ( parObject ) {
		 	if ( ( parObject == null )
		 		|| ( typeof parObject != window.OBJECT_TYPE_NAME ) )
		 		return parObject;
		 	/** Копия объекта. */
		 	var copy;
		 	if ( Array.isArray( parObject ) )
		 		copy = [];
		 	else
		 		copy = {};
		 	for ( var key in parObject )
		 		copy[key] = parObject[key];
		 	return copy;
		}; // shallowCopy

		/**
		 * The deep copy of the object.
		 * @global
		 * @param {Object} parObject - he copying object.
		 * @return {Object} The deep copy of the object.
		 */
		window.deepCopy = function ( parObject ) {
			if ( ( parObject == null )
				|| ( typeof parObject != window.OBJECT_TYPE_NAME ) )
				return parObject;
			/** The object copy. */
			var copy = parObject.constructor();
			// In result it could be obtaines something wrong,
			// so an empty object or an array should be created for filling.
			if ( copy == null ) {
				if ( Array.isArray( parObject ) )
					copy = [];
				else
					copy = {};
			} // if ( copy == null )
			for ( var key in parObject ) {
				if ( ( parObject[key] != null )
					&& ( typeof parObject[key] == window.OBJECT_TYPE_NAME ) )
					copy[key] = this.deepCopy( parObject[key] );
				else
					copy[key] = parObject[key];
			} // for
			return copy;
		}; // deepCopy

		/*
		parseStrictInt('421');							// 421
		parseStrictInt('-421');							// -421
		parseStrictInt('+421');							// 421
		parseStrictInt('Infinity');					// Infinity
		parseStrictInt('421e+0');						// NaN
		parseStrictInt('421hop');						// NaN
		parseStrictInt('hop1.61803398875');	// NaN
		parseStrictInt('1.61803398875');		// NaN
		*/

		/**
		 * A strict way of interpreting integer values.
		 * @global
		 * @param {Object} parValue - The object.
		 * @return {Object} The strict integer value
		 * from the object or NaN.
		 */
		window.parseStrictInt = function ( parValue ) {
			if ( /^(\-|\+)?([0-9]+|Infinity)$/.test( parValue ) )
				return Number( parValue );
			return NaN;
		}; // parseStrictInt

		/*
		parseStrictFloat('421');							// 421
		parseStrictFloat('-421');							// -421
		parseStrictFloat('+421');							// 421
		parseStrictFloat('Infinity');					// Infinity
		parseStrictFloat('1.61803398875');		// 1.61803398875
		parseStrictFloat('421e+0');						// NaN
		parseStrictFloat('421hop');						// NaN
		parseStrictFloat('hop1.61803398875');	// NaN
		*/

		/**
		 * A strict way of interpreting float values.
		 * @global
		 * @param {Object} parValue - The object.
		 * @return {Object} The strict float value
		 * from the object or NaN.
		 */
		window.parseStrictFloat = function ( parValue ) {
			if ( /^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test( parValue ) )
				return Number( parValue );
			return NaN;
		}; // parseStrictFloat

		/**
		 * Obtaining strict float value from the object or null.
		 * @global
		 * @param {Object} parValue - The object.
		 * @return {Object} The float value from the object or null.
		 */
		window.parseFloatOrNull = function ( parValue ) {
			var strictFloat = window.parseStrictFloat( parValue );
			return isFinite( strictFloat ) ? strictFloat : null;
		}; // parseFloatOrNull

		/**
		 * Obtaining float value from the object in all the cases.
		 * @global
		 * @param {Object} parValue - The object.
		 * @return {Object} The float value from the object or zero.
		 */
		window.parseFloatOrZero = function ( parValue ) {
			var strictFloat = window.parseStrictFloat( parValue );
			return isFinite( strictFloat ) ? strictFloat : 0;
		}; // parseFloatOrZero

		/**
		 * Obtaining strict non-negative float value from the object or null.
		 * @global
		 * @param {Object} parValue - The object.
		 * @return {Object} The non-negative float value from the object or null.
		 */
		window.parseNonNegativeFloatOrNull = function ( parValue ) {
			var strictFloat = window.parseStrictFloat( parValue );
			return isFinite( strictFloat ) ? Math.abs( strictFloat ) : null;
		}; // parseNonNegativeFloatOrNull

		/**
		 * Obtaining non-negative float value from the object in all the cases.
		 * @global
		 * @param {Object} parValue - The object.
		 * @return {Object} The non-negative float value from the object or zero.
		 */
		window.parseNonNegativeFloatOrZero = function ( parValue ) {
			var strictFloat = window.parseStrictFloat( parValue );
			return isFinite( strictFloat ) ? Math.abs( strictFloat ) : 0;
		}; // parseNonNegativeFloatOrZero

		/**
		 * Obtaining float value between 0 and 1 from the object in all the cases.
		 * @global
		 * @param {Object} parValue - The object.
		 * @return {Object} The float value between 0 and 1 from the object.
		 */
		window.parseFloatBetweenZeroAndOne = function ( parValue ) {
			var nonNegativeFloat = window.parseNonNegativeFloatOrZero( parValue );
			return nonNegativeFloat > 1 ? 1 : nonNegativeFloat;
		}; // parseFloatBetweenZeroAndOne

		/**
		 * Obtaining integer value from the object in all the cases.
		 * @global
		 * @param {Object} parValue - The object.
		 * @return {Object} The integer value from the object or zero.
		 */
		window.parseIntOrZero = function ( parValue ) {
			var strictInt = window.parseStrictInt( parValue );
			return isFinite( strictInt ) ? strictInt : 0;
		}; // parseIntOrZero

		/**
		 * Obtaining strict integer value from the object or null.
		 * @global
		 * @param {Object} parValue - The object.
		 * @return {Object} The integer value from the object or null.
		 */
		window.parseIntOrNull = function ( parValue ) {
			var strictInt = window.parseStrictInt( parValue );
			return isFinite( strictInt ) ? strictInt : null;
		}; // parseIntOrNull

		/**
		 * Obtaining non-negative integer value
		 * from the object in all the cases.
		 * @global
		 * @param {Object} parValue - The object.
		 * @return {Object} The non-negative integer value
		 * from the object or zero.
		 */
		window.parseNonNegativeIntOrZero = function ( parValue ) {
			var strictInt = window.parseStrictInt( parValue );
			return isFinite( strictInt ) ? Math.abs( strictInt ) : 0;
		}; // parseNonNegativeIntOrZero

		/**
		 * Obtaining strict non-negative integer value
		 * from the object or null.
		 * @global
		 * @param {Object} parValue - The object.
		 * @return {Object} The non-negative integer value
		 * from the object or null.
		 */
		window.parseNonNegativeIntOrNull = function ( parValue ) {
			var strictInt = window.parseStrictInt( parValue );
			return isFinite( strictInt ) ? Math.abs( strictInt ) : null;
		}; // parseNonNegativeIntOrNull

		/**
		 * Obtaining the resolved value of the element's style property.
		 * @global
		 * @param {Object} parElement - The DOM element.
		 * @param {String} parPropertyName - The style property name.
		 * @return {Object}  The resolved style property value.
		 */
		window.getComputedStylePropertyValue = function
				( parElement, parPropertyName ) {
			return window.getComputedStyle( parElement )
				.getPropertyValue( parPropertyName ).trim( );
		} // getComputedStylePropertyValue

		/**
		 * Obtaining the string of the calling CSS RGBA function.
		 * @global
		 * @param {Number} parR - The red color component. From 0 to 255.
		 * @param {Number} parG - The green color component. From 0 to 255.
		 * @param {Number} parB - The blue color component. From 0 to 255.
		 * @param {Number} parA - The opacity color component. From 0 to 1.
		 * @return {String} The string of the calling CSS RGBA function.
		 */
		window.getCssRgbaColor = function( parR, parG, parB, parA ) {

			parR = window.parseNonNegativeIntOrZero( parR );
			parG = window.parseNonNegativeIntOrZero( parG );
			parB = window.parseNonNegativeIntOrZero( parB );
			parA = window.parseFloatBetweenZeroAndOne( parA );

			if ( parR > window.MAX_RGB_COLOR_COMPONENT )
				parR = window.MAX_RGB_COLOR_COMPONENT;
			if ( parG > window.MAX_RGB_COLOR_COMPONENT )
				parG = window.MAX_RGB_COLOR_COMPONENT;
			if ( parB > window.MAX_RGB_COLOR_COMPONENT )
				parB = window.MAX_RGB_COLOR_COMPONENT;

			return window.RGBA_CSS_FUNCTION_NAME
				+ String.OPENNING_PARENTHESIS
				+ parR
				+ String.COMMA
				+ parG
				+ String.COMMA
				+ parB
				+ String.COMMA
				+ parA
				+ String.CLOSING_PARENTHESIS;
		} // window.getCssRgbaColor
	}( window )
);