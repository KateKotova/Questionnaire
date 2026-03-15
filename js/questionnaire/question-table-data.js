; (
	/**
	 * Contains the constructor for creation data
	 * for the question table.
	 * @module question-table-data
	 * @requires module:string-extensions
	 * @author Kate Kotova <katekotova_86@mail.ru>
	 * @copyright Kate Kotova 2017
	 */
	function ( window ) {
		'use strict';		
		
		/**
		 * The number of digits of fractional part of the percent value.
		 * @type {Number}
		 * @private
		 * @const
		 */
		const PERCENT_VALUE_FRACTIONAL_PART_DIGITS_COUNT = 1;
		/**
		 * The default value.
		 * @type {Number}
		 * @private
		 * @const
		 */
		const DAFAULT_VALUE = 0;		

		/**
		 * Creation of an instance of QuestionTableData.
		 * This contains data for the question table.
		 * @global
		 * @constructor
		 * @this {QuestionTableData}
		 * @param {Array} of {String} parTypesNames - The names of the types.
		 * @example <caption>The example of the parTypesNames parameter.</caption>
		 * var typesNames = [ "The type #0", "The type #1", ... ];
		 *
		 * @param {Array} of {String} parPlansNames - The names of the plans.
		 * @example <caption>The example of the parPlansNames parameter.</caption>
		 * var plansNames = [ "#0", "#1", ... ];
		 *
		 * @param {Array} of {Array} of {Number} parValues - The table
		 * of the values in percents for the plans.
		 * @example <caption>The example of the parValues parameter.</caption>
		 * var values = [ [1,2,-3,...], [4,5,-6,...], ... ];
		 *		 
		 * @return {QuestionTableData} The created instanse
		 * of QuestionTableData.
		 */
		function QuestionTableData(
			parTypesNames,
			parPlansNames,
			parValues
		) {
			/**
			 * Saving this in the closure.
			 * @type {QuestionTableData}
			 * @private
			 */
			var self = this;
			/**
			 * The data for the question table.
			 * @type {Array} of {Array} of {String}
			 * @public
			 */
			this.tabaleData = null;

			/**
			 * Get the string for output the value.
			 * @private
			 * @param {Number} parValue - The value in percents.
			 * @return {String} The value with the percent symbol.
			 */
			var getValueString = function ( parValue ) {
				return parValue.toFixed
					( PERCENT_VALUE_FRACTIONAL_PART_DIGITS_COUNT )
					+ String.PERCENT;
			} // getValueString

			/**
			 * Set the data for the question table.
			 * @private
			 */
			var setTableData = function ( ) {

				self.tableData = [];

				if ( !parTypesNames )
					parTypesNames = [];
				// An empty corner cell.
				var typesNamesRow = [ String.EMPTY ];
				// The names of the types are in the row #0.
				for ( var typeIndex = 0; typeIndex
						< parTypesNames.length; typeIndex++ )
					typesNamesRow.push( parTypesNames[ typeIndex ]
						.toString( ).trim( ) );
				self.tableData.push( typesNamesRow );

				if ( !parPlansNames )
					parPlansNames = [];
				if ( !parValues )
					parValues = [];

				for ( var planIndex = 0; planIndex < parPlansNames.length;
						planIndex++ ) {

					// The name of the plan is in the column #0.
					var planRow = [
						parPlansNames[ planIndex ].toString( ).trim( )
					];

					if ( !parValues[ planIndex ] )
						parValues[ planIndex ] = [];

					for ( var typeIndex = 0; typeIndex
							< parTypesNames.length; typeIndex++ ) {

						var value = parValues[ planIndex ][ typeIndex ];
						if ( !value ) {
							value = DAFAULT_VALUE
							parValues[ planIndex ][ typeIndex ] = value;
						} // if ( !value )

						planRow.push( getValueString( value ) );
					} // for ( var typeIndex...

					self.tableData.push( planRow );
				} // for ( var planIndex...
			} // setTableData
		
			/**
			 * Initialization of the instance.
			 * @private
			 * @return {QuestionTableData} This created instance
			 * of QuestionTableData.
			 */
			var initialize = function( ) {
				setTableData( );
				return self;
			} // initialize

			return initialize( );
		} // QuestionTableData

		/** Exporting the QuestionTableData class outside of this module. */
		window.QuestionTableData = QuestionTableData;

	}( window )
);	