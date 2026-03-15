; (
	/**
	 * Contains the data base of plans types.
	 * @module question-table-data-base
	 * @author Kate Kotova <katekotova_86@mail.ru>
	 * @copyright Kate Kotova 2017
	 */
	function ( window ) {
		'use strict';

		/**
		 * The names of the types.
		 * @type {Array} of {String}
		 * @global
		 */
		var typesNames = [
			/** The type #0. */
			"Масло какао",
			/** The type #1. */
			"Сухофрукты",
			/** The type #2. */
			"Орехи"
		]; // typesNames
		
		/**
		 * The names of the plans.
		 * @type {Array} of {String}
		 * @global
		 */
		var plansNames = [
			/** The plan #0. */
			"A",
			/** The plan #1. */
			"B",
			/** The plan #2. */
			"C",
			/** The plan #3. */
			"D",
			/** The plan #4. */
			"E"
		]; // plansNames

		/**
		 * The table of the values in percents for the plans.
		 * @type {Array} of {Array} of {Number}
		 * @global
		 */
		var plans = [
			/** The plan #0. */
			[
				/** The type #0. */
				0,
				/** The type #1. */
				0,
				/** The type #2. */
				0
			],
			/** The plan #1. */
			[
				/** The type #0. */
				30,
				/** The type #1. */
				5,
				/** The type #2. */
				0
			],
			/** The plan #2. */
			[
				/** The type #0. */
				0,
				/** The type #1. */
				15,
				/** The type #2. */
				3
			],
			/** The plan #3. */
			[
				/** The type #0. */
				0,
				/** The type #1. */
				0,
				/** The type #2. */
				20
			],
			/** The plan #4. */
			[
				/** The type #0. */
				15,
				/** The type #1. */
				10,
				/** The type #2. */
				8
			],
		]; // plans
		
		/** Exporting the typesNames object outside of this module. */
		window.typesNames = typesNames;
		/** Exporting the plansNames object outside of this module. */
		window.plansNames = plansNames;
		/** Exporting the plans object outside of this module. */
		window.plans = plans;

	}( window )
);			