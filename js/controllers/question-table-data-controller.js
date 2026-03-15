; (
	/**
	 * The controller for the table.
	 * @module question-table-data-controller
	 * @requires module:question-table-data-base
	 * @requires module:question-table-data
	 * @author Kate Kotova <katekotova_86@mail.ru>
	 * @copyright Kate Kotova 2017
	 */
	function ( window ) {
		'use strict';

		var questionnaireApp = angular.module( 'questionnaireApp' );
		questionnaireApp.controller(
			'questionTableDataController',
			function( $scope ) {

				/**
				 * The data.
				 * @type {QuestionTableData}
				 * @private
				 */
				var data = new QuestionTableData( typesNames, plansNames, plans );

				/**
				 * The data for the table.
				 * @type {Array} of {Array} of {String}
				 * @public
				 */
				$scope.tableData = data.tableData;

			} // function
		); // controller
	}( window )
);		