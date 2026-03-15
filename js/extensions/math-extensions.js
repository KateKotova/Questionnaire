; (
	/**
	 * Contains the extensions for the global Math object.
	 * @module math-extensions
	 * @requires module:window-extensions
	 * @author Kate Kotova <katekotova_86@mail.ru>
	 * @copyright Kate Kotova 2017
	 */
	function ( window ) {
		'use strict';

		/**
		 * 180 degrees - PI in degrees.
		 * @global
		 */
		Math.PI_IN_DEGREES = 180;
		/**
		 * PI/2 in radians.
		 * @global
		 */
		Math.HALF_PI = Math.PI / 2;
		/**
		 * 90 degrees - PI/2 in degrees.
		 * @global
		 */
		Math.HALF_PI_IN_DEGREES = Math.PI_IN_DEGREES / 2;
		/**
		 * The count of milliseconds in a one second.
		 * @global
		 */
		Math.MILLISECONDS_IN_SECOND = 1000;		

		/**
		 * Converts from degrees to radians.
		 * @global
		 * @param {Object} parAngleInDegrees - The angle in degrees.
		 * @return {Object} The angle in radians;
		 * null for wrong and infinite data.
		 */
		Math.toRadians = function( parAngleInDegrees ) {
			var angleInDegrees = window.parseFloatOrNull( parAngleInDegrees );
		  return angleInDegrees == null ? null
		  	: parAngleInDegrees * Math.PI / Math.PI_IN_DEGREES;
		}; // toRadians
		 
		/**
		 * Converts from radians to degrees.
		 * @global
		 * @param {Object} parAngleInRadians - The angle in radians.
		 * @return {Object} The angle in degrees;
		 * null for wrong and infinite data.
		 */
		Math.toDegrees = function( parAngleInRadians ) {
			var angleInRadians = window.parseFloatOrNull( parAngleInRadians );
		  return angleInRadians == null ? null
		  	: parAngleInRadians * Math.PI_IN_DEGREES / Math.PI;
		}; // toDegrees

	}( window )
);