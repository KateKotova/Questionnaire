; (
	/**
	 * The controller for the questionare.
	 * @module questionnaire-controller
	 * @requires module:string-extensions
	 * @requires module:window-extensions
	 * @requires module:math-extensions
	 * @requires module:questions-data-base 
	 * @requires module:questions-data
	 * @author Kate Kotova <katekotova_86@mail.ru>
	 * @copyright Kate Kotova 2017
	 */
	function ( window ) {
		'use strict';

		/**
		 * The beginning of the ID of the DOM Element of the rado button.
		 * @package
		 * @const
		 */
		const RADIO_BUTTON_ID_BEGIN = "radio-";
		/**
		 * The duration of the ngIsVisibile (ng-is-visible)
		 * animation durationm in seconds.
		 * @const
		 * @package
		 */
		const VISIBILITY_ANIMATION_DURATION = 0.35;
		/**
		 * The ease function name of the visibility anmation.
		 * @const
		 * @package
		 */
		const VISIBILITY_ANIMATION_EASING = 'ease-in-out';	

		var questionnaireApp = angular.module( 'questionnaireApp' );
		questionnaireApp.controller( 'questionsController', function( $scope ) {

			/**
			 * @type {QuestionsData} The data of the questions of the questionnaire.
			 */
			$scope.questionsData = new QuestionsData( questionsDataBase );
			/**
			 * The array of all the subjects.
			 * @type {Array} of {Object}
			 */	
			$scope.dataAllSubjects = $scope.questionsData.dataAllSubjects;
			/**
			 * The array of all the groups from all the subjects.
			 * @type {Array} of {Object}
			 */
			$scope.dataAllGroups = $scope.questionsData.dataAllGroups;
			/**
			 * The array of all the questions from all the groups.
			 * @type {Array} of {Object}
			 */
			$scope.dataAllQuestions = $scope.questionsData.dataAllQuestions;

			$scope.questionsWithSelectedAnswersAndANewOne
				= ( !!$scope.dataAllQuestions && !!$scope.dataAllQuestions.length )
				? [ $scope.dataAllQuestions[ 0 ] ] : [];	

			/**
			 * @type {Object} The indices of the carousels.
			 * It'll be better tocreate 3 variables. But their values could be loose
			 * after Angular working with HTML. So these simple typed
			 * (they are {Numver}) variables are boxing and storing in the oject.
			 */
			$scope.carouselsSlidesIndices = {
				/**
				 * @type {Number} The index of the showing current subject
				 * at the subjects carousel of questions at the questions carousel.
				 */
				subject: 0,
				/**
				 * @type {Number} The index of the showing current group
				 * at the groups carousel of questions at the questions carousel.
				 */
				group: 0,
				/**
				 * @type {Number} The index of the showing current question
				 * at the questions carousel. This is the index among all
				 * the showing questions having the selected answer and a new one
				 * question without qnswer in the end.
				 */
				question: 0
			}; // $scope.indices
			/**
			 * @type {Object} The indices of the carousels deep-copy object.
			 * There were many problems with the indices: they are automatically
			 * recalculating in the one case. So the origin values are stored
			 * in this copy deep-object not related with DOM elements by Angular.
			 * The situation: after reach the end of the list of questons,
			 * user may go back to watch the already answered questions -
			 * in this moment the autoscroll is ocurring - it damages to the subject
			 * and to the groups indices.
			 * @private
			 */
			$scope.carouselsSlidesIndicesCopy
				= window.deepCopy( $scope.carouselsSlidesIndices );

			/**
			 * @type {Number} The index of the showing current question
			 * at the questions carousel. This is the index of the current question
			 * in the current group in the current subject.
			 */
			$scope.currentGroupCurrentQuestionIndex = 0;

			/**
			 * The groups of the current subject
			 * with the index @see {@lnik $scope.carouselsSlidesIndices.subject}.
			 */
			$scope.getCurrentSubjectGroups = function( ) {
				return $scope.dataAllSubjects
					[ $scope.carouselsSlidesIndicesCopy.subject ].groups;
			} // getCurrentSubjectGroups

			/**
			 * The questions of the current group with the index
			 * @see {@lnik $scope.carouselsSlidesIndices.group}
			 * of the current subject with the index
			 * @see {@lnik $scope.carouselsSlidesIndices.subject}.
			 */
			$scope.getCurrentSubjectCurrentGroupQuestions = function( ) {
				return $scope.dataAllSubjects
					[ $scope.carouselsSlidesIndicesCopy.subject ].groups
					[ $scope.carouselsSlidesIndicesCopy.group ].questions;
			} // getCurrentSubjectCurrentGroupQuestions

			/**
			 * The current question.
			 * @return {Object} The current question: the question
			 * having index {@link $scope.carouselsSlidesIndices.question}
			 * in the group having index {@link $scope.carouselsSlidesIndices.group}
			 * in the subject having index
			 * {@link $scope.carouselsSlidesIndices.subject}.
			 */
			$scope.getCurrentQuestion = function ( ) {
				return $scope.dataAllQuestions
					[ $scope.carouselsSlidesIndicesCopy.question ];
			} // getCurrentQuestion

			/**
			 * The name of the current group for showing
			 * in the DOM element by Angular.
			 * This is need because "{{group.name}}"
			 * in the "group in getCurrentSubjectGroups()" is corruptng.
			 * @return {String} The name of the current group.
			 */
			$scope.getCurrentGroupName = function ( ) {
				return $scope.dataAllSubjects[ $scope.carouselsSlidesIndices.subject ]
					.groups[ $scope.carouselsSlidesIndices.group ].name;
			} // getCurrentGroupName

			/**
			 * The description of the current group for showing
			 * in the DOM element by Angular.
			 * This is need because "{{group.description}}"
			 * in the "group in getCurrentSubjectGroups()" is corruptng.
			 * @return {String} The description of the current group.
			 */
			$scope.getCurrentGroupDescription = function ( ) {
				return $scope.dataAllSubjects[ $scope.carouselsSlidesIndices.subject ]
					.groups[ $scope.carouselsSlidesIndices.group ].description;
			} // getCurrentGroupDescription

			/**
			 * @type {Object} The data of the buttons for sliding
			 * of the questions carousel.
			 */
			$scope.questionsCarouselArrowButtons = {

				/** @type {Boolean} The button to go to the previous slide. */
				previous: {
					/** @type {Boolean} If the button is visible. */
					isShowing: false,
					/** @type {String} The ID of the button's DOM element. */
					elementId: "previous-questions-carousel-slide-arrow-button"
				}, // previous

				/** @type {Boolean} The button to go to the next slide. */
				next: {
					/** @type {Boolean} If the button is visible. */
					isShowing: true,
					/** @type {String} The ID of the button's DOM element. */
					elementId: "next-questions-carousel-slide-arrow-button"
				} // next
			}; // $scope.questionsCarouselArrowButtons

			/**
			 * The method to watch changes of the variable
			 * $scope.carouselsSlidesIndices.question that is the index
			 * of the current slide of the questions carousel.
			 */
			$scope.$watch(
				/**
				 * The watching expression - the index of the showing current question
				 * at the questions carousel.
				 * @type {Object} of {Function} The name of the watching
				 * value variable or the function returning a watching value.
				 */
				function( ) {
					return $scope.carouselsSlidesIndices.question;
				},
				/**
				 * The callback function running after changing the watching expression.
				 * @param {Object} parNewValue - The new value of the watching
				 * expression, the new slide index in the questions carousel.
				 * @param {Object} parOldValue - The old value of the watching
				 * expression, the new slide index in the questions carousel.
				 * @param {Object} parScope - The $scope object.
				 */
				function( parNewValue, parOldValue, parScope ) {

					// Hidng and showing arrow buttons of the questions carousel.
					$scope.questionsCarouselArrowButtons.previous.isShowing
						= parNewValue > 0;
					$scope.questionsCarouselArrowButtons.next.isShowing
						= parNewValue < parScope.dataAllQuestions.length - 1;

					// Control the borders for prevent unexpected results,
					// Because the autoscroll could be occured - this is the reason
					// of loosin the correct indices.

					if ( parNewValue <= 0 ) {
						parScope.carouselsSlidesIndices = {
							question: 0,
							group: 0,
							subject: 0
						};
						parScope.carouselsSlidesIndicesCopy
							= window.deepCopy( parScope.carouselsSlidesIndices );
						parScope.currentGroupCurrentQuestionIndex = 0;
						return;
					} // if ( parNewValue <= 0 )

					if ( parNewValue >= parScope.dataAllQuestions.length - 1 ) {
						var lastSubjectIndex = parScope.dataAllSubjects.length - 1;
						var lastGroupIndex = parScope.dataAllSubjects
							[ lastSubjectIndex ].groups.length - 1;
						var lastQuestionAmongAllQuestionsIndex
							= parScope.dataAllQuestions.length - 1;

						parScope.carouselsSlidesIndices = {
							question: lastQuestionAmongAllQuestionsIndex,
							group: lastGroupIndex,
							subject: lastSubjectIndex
						};

						var lastGroupAmongAllGroupsIndex
							= parScope.dataAllGroups.length - 1;
						parScope.currentGroupCurrentQuestionIndex = parScope.dataAllGroups
							[ lastGroupAmongAllGroupsIndex ].questions.length - 1;
						parScope.carouselsSlidesIndicesCopy
							= window.deepCopy( parScope.carouselsSlidesIndices );
						return;
					} // if ( parNewValue >= parScope.dataAllQuestions.length - 1 )

					// Filling the copy object of the indices.

					parScope.carouselsSlidesIndicesCopy.question = parNewValue;			

					if ( parNewValue == parOldValue )
						return;

					// Question index increment. The last question in the group -
					// go to the next group.
					if (
						( parScope.currentGroupCurrentQuestionIndex
							== parScope.dataAllQuestions[ parOldValue ]
							.group.questions.length - 1 )
						&& ( parNewValue > parOldValue )
					) {
						parScope.currentGroupCurrentQuestionIndex = 0;
						parScope.carouselsSlidesIndicesCopy.group++;

						// The last group in the subject -
						// go to the next subject.
						if ( parScope.carouselsSlidesIndicesCopy.group
								== parScope.getCurrentSubjectGroups( ).length ) {
							parScope.carouselsSlidesIndicesCopy.group = 0;
							parScope.carouselsSlidesIndicesCopy.subject++;
						} // if ( parScope.carouselsSlidesIndicesCopy.group
					} // if ( ( parScope.currentGroupCurrentQuestionIndex

					else {
						// Question index decrement. The first question in the group -
						// go to the previous group.
						if ( !parScope.currentGroupCurrentQuestionIndex
								&& ( parNewValue < parOldValue ) ) {
								
							// The last first in the subject -
							// go to the previous subject.
							if ( !parScope.carouselsSlidesIndicesCopy.group ) {
								parScope.carouselsSlidesIndicesCopy.subject--;
								parScope.carouselsSlidesIndicesCopy.group
									= parScope.getCurrentSubjectGroups( ).length - 1;				
							} // if ( parScope.carouselsSlidesIndicesCopy.group
							else
								parScope.carouselsSlidesIndicesCopy.group--;
								parScope.currentGroupCurrentQuestionIndex
									= parScope.getCurrentSubjectCurrentGroupQuestions( )
									.length - 1;
						} // if ( ( parScope.currentGroupCurrentQuestionIndex

						else {
							// The general default case.
							if ( parNewValue > parOldValue )
								parScope.currentGroupCurrentQuestionIndex++;
							else
								parScope.currentGroupCurrentQuestionIndex--;
						} // else
					} // else			

					// Now sace changes from the copy of indices element.
					parScope.carouselsSlidesIndices
						= window.deepCopy( parScope.carouselsSlidesIndicesCopy );
				} // function( parNewValue, parOldValue, parScope )
			); // $scope.$watch

			/**
			 * The method to watch changes of the variable
			 * $scope.carouselsSlidesIndices.group that is the index
			 * of the current slide of the groups carousel.
			 */
			$scope.$watch(
				/**
				 * The watching expression - the index of the showing current group
				 * at the questions carousel.
				 * @type {Object} of {Function} The name of the watching
				 * value variable or the function returning a watching value.
				 */
				function( ) {
					return $scope.carouselsSlidesIndices.group;
				},
				/**
				 * The callback function running after changing the watching expression.
				 * @param {Object} parNewValue - The new value of the watching
				 * expression, the new slide index in the groups carousel.
				 * @param {Object} parOldValue - The old value of the watching
				 * expression, the new slide index in the groups carousel.
				 * @param {Object} parScope - The $scope object.
				 */
				function( parNewValue, parOldValue, parScope ) {
					// This may prevent autoscrol to the beginning after comming
					// to the end - to the last slide and then come reversly back.
					if ( ( parNewValue == 0 )
							&& ( parScope.carouselsSlidesIndicesCopy.question
							>= parScope.dataAllGroups[ 0 ].questions.length ) ) {
						parScope.carouselsSlidesIndices.group
							= parScope.carouselsSlidesIndicesCopy.group;
					} // if ( ( parNewValue == 0 )
				} // function( parNewValue, parOldValue, parScope )
			); // $scope.$watch

			/**
			 * The function to go the the next slide of the questions carousel
			 * if the next button of this carousel was clicked.
			 */
			$scope.goToNextQuestionsCarouselSlide = function( ) {
				$scope.carouselsSlidesIndices.question++;
				$scope.carouselsSlidesIndicesCopy.question++;
			}; // goToNextQuestionsCarouselSlide

			/**
			 * The function to go the the previous slide of the questions carousel
			 * if the next button of this carousel was clicked.
			 */
			$scope.goToPreviousQuestionsCarouselSlide = function( ) {
				$scope.carouselsSlidesIndices.question--;
				$scope.carouselsSlidesIndicesCopy.question--;
			}; // goToPreviousQuestionsCarouselSlide

			/**
			 * Set the selected answer for the question.
			 * @type {Object} parQuestion - The question.
			 *
			 * @example <caption>The example
			 * of the parQuestion parameter.</caption>
			 *
			 *	var question = {
			 *		// @type {Number} The index among all the questions.
			 *		// Begins from 1.
			 *		amongAllQuestionsIndex: 0,
			 *		// @type {String} The caption of the question.
			 *		question: "What is your age?",
			 *		// @type {InvestmentPlansIncomesData}
			 *		// The data for the investment plans incomes table.
			 *		investmentPlansIncomesData: null,
			 *		// @type {Number} The index of the selected answer by user.
			 *		// -1 by default.
			 *		selectedAnswerIndex: -1,
			 *		// @type {Number} The points of the selected answer by user.
			 *		// -1 by default.
			 *		selectedAnswerPoints: -1,
			 *		// @type {Array} The array of the answers of the question.
			 *		answers: [
			 *			// The answer #0.
			 *			{
			 *				// @type {String} The answer's conent.
			 *				answer: "Less then 25 years old.",
			 *				// @type {Number} The points for the answer from 1 to 5.
			 *				points: 5
			 *			},
			 *			// The answer #1.
			 *			{ ... },
			 *			...
			 *		] // answers
			 *	}; // question
			 *
			 * @type {Number} parAnswerIndex - The index of the selecting answer.
			 */
			$scope.selectAnswer = function ( parQuestion, parAnswerIndex ) {

				// Set parameters to the selected answer to the model.
				$scope.questionsData.selectAnswer( parQuestion, parAnswerIndex );

				// Add a new one question to the end - the next question,
				// wich has no answer yet.
				if (
					( $scope.questionsWithSelectedAnswersAndANewOne.length
							== $scope.getCurrentQuestion( ).amongAllQuestionsIndex )
					&& ( $scope.currentQuestionHasSelectedAnswer( ) )
					&& ( $scope.carouselsSlidesIndices.question + 1
						< $scope.dataAllQuestions.length )
				)	{
					$scope.questionsWithSelectedAnswersAndANewOne.push
						( $scope.dataAllQuestions
						[ $scope.carouselsSlidesIndices.question + 1 ] );
				} // if
			} // selectAnswer

			/**
			 * If the answer was selected for the current question.
			 * @return {Boolean} True, if selectedAnswerIndex != -1
			 * of current qustion in the {@link $scopequestionsData}.
			 */
			$scope.currentQuestionHasSelectedAnswer = function ( ) {
				// If the current question has no a selected answer
				// the questions field selectedAnswerIndex equals -1:
				// ~-1 == 0; !!~number == true, if the number != -1.
				return !!~$scope.getCurrentQuestion( ).selectedAnswerIndex;
			} // currentQuestionHasSelectedAnswer

			/**
			 * Obtaining the ID of the DOM Element of the rado button
			 * for the answer for the question.
			 * @param {Number} parQuestionAmongAllQuestionsIndex -
			 * The index of the question in the array of all the questions.
			 * From 1.
			 * @param {Number} parAnswerInQuestionIndex -
			 * The index of the answer (marked by this radio button)
			 * in the array of all the answers of the question. From 0.
			 * @return {String} The ID of the DOM Element of the rado button.
			 */
			$scope.getAnswerRadioButtonId = function
					( parQuestionAmongAllQuestionsIndex, parAnswerInQuestionIndex ) {

				return RADIO_BUTTON_ID_BEGIN
					+ parQuestionAmongAllQuestionsIndex
					+ String.DASH
					+ parAnswerInQuestionIndex;
			} // getAnswerRadioButtonId

			/**
			 * Set the visibivity CSS property to the DOM element
			 * or the array of the DOM elements.
			 * @param {Array} of {Object} or {Object} parElementsOrElement -
			 * The array of DOM elements or a single DOM element.
			 * @param {Boolean} parIsVisible - True if the array of DOM elements
			 * or a single DOM element should be visible.
			 * @private
			 */
			$scope.setVisibility = function( parElementsOrElement, parIsVisible ) {

				var visibility = parIsVisible
					? window.VISIBILITY_VISIBLE_VALUE
					: window.VISIBILITY_HIDDEN_VALUE;

				if ( !!parElementsOrElement.length )
					for ( var elementIndex = 0; elementIndex
							< parElementsOrElement.length; elementIndex++ )
						parElementsOrElement[ elementIndex ].style.visibility
							= visibility;
				else
					parElementsOrElement.style.visibility = visibility;
			} // setVisibility


			/**
			 * The questionnaire result button caption.
			 * @type {String}
			 * @const
			 * @public
			 */
			$scope.RESULT_BUTTON_CAPTION = "ЗДЕСЬ БУДУТ РЕЗУЛЬТАТЫ, А ПОКА ИХ НЕТ";
			
		}); // questionnaireApp.controller

		/**
		 * This is the directive that will be called by put it in the HTML.
		 * The DOM element marked by this directive is fading
		 * (changing the opacity propertie) and changing
		 * the its visibility property.
		 * @author Thomas Burleson @ThomasBurleson
		 * @copyright Thomas Burleson
		 * @see {@link https://codepen.io/anon/pen/GvOMZK}
		 * @author Kate Kotova <nijanus@yandex.com>
		 * @copyright NIJANUS 2004-2017
		 */
		questionnaireApp.directive(
			/**
			 * @type {Strin} The name of the directive.
			 * "ng-is-visible" in the HTML.
			 */
			"ngIsVisible",
			/**
			 * The function returning the linking function.
			 */
			function( $log, $animateCss ) {
				/**
				 * The linking function.
				 * @param {Object} parScope — The $scope where the directive is calling.
				 * @param {Object} parElements — The DOM element to witch
				 * the directive belings to. This DOM element is boxing to jQuery Lite.
				 * @param {Object} parAttrs — The object with the list of all
				 * the attributes of the tag in witch the drective is calling.
				 */
				return function( parScope, parElements, parAttrs ) {
					
					/**
					 * The method to watch changes of the attribute "ng-is-visible"
					 * of the DOM elements.
					 */
					parScope.$watch(
						/**
						 * The watching expression.
						 * @type {Object} of {Function} The name of the watching
						 * value variable or the function returning a watching value.
						 */
						parAttrs.ngIsVisible,
						/**
						 * The callback function running after changing
						 * the watching expression.
						 * @param {Object} parNewValue - The new value
						 * of the watching expression.
						 * @param {Object} parOldValue - The old value
						 * of the watching expression.
						 * @param {Object} parScope - The $scope object.
						 */
						function( parNewValue, parOldValue, parScope ) {							

							// Show the element/elements before the animation.
							parScope.setVisibility( parElements, true );

							$animateCss(
								parElements,
								{
									/**
									 * Comment By @ThomasBurleson:
									 * BUG - If I set `from` I expect it to assign
									 * those values immediately and 
									 * then animate to the `to` values. This does NOT happen!
									 *
									 * from: { opacity: !!newVal ? 0 : 1 },
									 */
									to: { opacity: Number( parNewValue ) },
									easing: VISIBILITY_ANIMATION_EASING,
									duration: VISIBILITY_ANIMATION_DURATION
								}
							) // $animateCss
							.start( )
							.then( onComplete );

							/**
							 * The functiion callback after the opacity anumation.
							 * @private
							 */
							function onComplete( ) {
								parScope.setVisibility(	parElements, parNewValue );
								/*$log.debug('Done Hide = ' + parNewValue );*/
							} // onComplete  

						} // function( parNewValue, parOldValue, parScope )
					); // parScope.$watch
				}; // function( parScope, parElements, parAttrs )
			} // function( $log, $animateCss )
		); // questionnaireApp.directive

	}( window )
);