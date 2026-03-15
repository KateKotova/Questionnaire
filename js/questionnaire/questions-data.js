; (
	/**
	 * Contains the constructor for creation data for the questions.
	 * @module questions-data
	 * @requires module:string-extensions
	 * @requires module:window-extensions
	 * @author Kate Kotova <katekotova_86@mail.ru>
	 * @copyright Kate Kotova 2017
	 */
	function ( window ) {
		'use strict';

		/**
		 * Creation of an instance of QuestionsData.
		 * This contains data for the questions incomes table.
		 * @global
		 * @constructor
		 * @this {QuestionsData}
		 * @param {Array} of {Object} parQuestionsDataBase -
		 * The data base of the questions of the questionnaire.
		 *
		 * @example <caption>The example
		 * of the parQuestionsDataBase parameter.</caption>
		 *
		 *	var questionsDataBase = [
		 *		// The subject #0.
		 *		{
		 *			// @type {String} The caption of the subject
		 *			// of groups of questions.
		 *			subject: "Your goals",
		 *			// @type {Array} The array of groups of questions.
		 *			groups:	[
		 *				// The group #0.
		 *				{
		 *					// @type {String} The name of the group of questions.
		 *					name: "Investment horizon",
		 *					// @type {String} The detailed description of the group
		 *					// of questions.
		 *					description: "The time interval...",
		 *					// @type {Array} The array of questions of the group.
		 *					questions: [
		 *						// The question #0.
		 *						{
		 *							// @type {String} The caption of the question.
		 *							question: "What is your age?",
		 *							// @type {InvestmentPlansIncomesData}
		 *							// The data for the investment plans incomes table.
		 *							tableData: null,
		 *							// @type {Array} The array of the answers of the question.
		 *							answers: [
		 *								// The answer #0.
		 *								{
		 *									// @type {String} The answer's conent.
		 *									answer: "Less then 25 years old.",
		 *									// @type {Number} The mark for the answer from 1 to 5.
		 *									mark: 5
		 *								},
		 *								// The answer #1.
		 *								{ ... },
		 *								...
		 *							] // answers
		 *						}, // The question #0.
		 *						// The question #1.
		 *						{ ... },
		 *						...
		 *					] // questions
		 *				}, // The group #0.
		 *				// The group #1.
		 *				{...},
		 *				...
		 *			] // groups
		 *		}, // The subject #0.
		 *		// The subject #1.
		 *		{ ... },
		 *		...
		 *	]; // questionsDataBase
		 *		 
		 * @return {QuestionsData} The created instanse of QuestionsData.
		 */
		function QuestionsData( parQuestionsDataBase ) {
			/**
			 * Saving this in the closure.
			 * @type {QuestionsData}
			 * @private
			 */
			var self = this;
			/**
			 * The data of the questions of the questionnaire
			 * got from {@link parQuestionsDataBase},
			 * corrected and obtained some new fiels:
			 * amongAllQuestionsIndex, selectedAnswerIndex, selectedAnswerPoints.
			 * @type {Array} of {Object}
			 * @public
			 *
			 * @example <caption>The example of the data.</caption>
			 *	[
			 *		// The subject #0.
			 *		{
			 *			// @type {String} The caption of the subject
			 *			// of groups of questions.
			 *			subject: "Your goals",
			 *			// @type {Array} The array of groups of questions.
			 *			groups:	[
			 *				// The group #0.
			 *				{
			 *					// @type {String} The name of the group of questions.
			 *					name: "Investment horizon",
			 *					// @type {String} The detailed description of the group
			 *					// of questions.
			 *					description: "The time interval...",
			 *					// @type {Object} The link to the parent subject.
			 *					subject: <the parent subject Object>,
			 *					// @type {Array} The array of questions of the group.
			 *					questions: [
			 *						// The question #0.
			 *						{
			 *							// @type {Number} The index among all the questions.
			 *							// Begins from 1.
			 *							amongAllQuestionsIndex: 0,
			 *							// @type {String} The caption of the question.
			 *							question: "What is your age?",
			 *							// @type {InvestmentPlansIncomesData}
			 *							// The data for the investment plans incomes table.
			 *							tableData: null,
			 *							// @type {Number} The index of the selected answer by user.
			 *							// -1 by default.
			 *							selectedAnswerIndex: -1,
			 *							// @type {Number} The points of the selected answer by user.
			 *							// -1 by default.
			 *							selectedAnswerPoints: -1,
			 *							// @type {Object} The link to the parent group.
			 *							group: <the parent group Object>,
			 *							// @type {Array} The array of the answers of the question.
			 *							answers: [
			 *								// The answer #0.
			 *								{
			 *									// @type {String} The answer's conent.
			 *									answer: "Less then 25 years old.",
			 *									// @type {Number} The points for the answer from 1 to 5.
			 *									points: 5
			 *								},
			 *								// The answer #1.
			 *								{ ... },
			 *								...
			 *							] // answers
			 *						}, // The question #0.
			 *						// The question #1.
			 *						{ ... },
			 *						...
			 *					] // questions
			 *				}, // The group #0.
			 *				// The group #1.
			 *				{...},
			 *				...
			 *			] // groups
			 *		}, // The subject #0.
			 *		// The subject #1.
			 *		{ ... },
			 *		...
			 *	]; // data
			 */
			this.data = null;
			/**
			 * The array of all the subjects from the {@link data}.
			 * t is just the synonim of the {@link data}.
			 * @type {Array} of {Object}
			 */
			this.dataAllSubjects = null;			
			/**
			 * The array of all the groups from all the subjects
			 * from the {@link data}.
			 * @type {Array} of {Object}
			 */
			this.dataAllGroups = null;
			/**
			 * The array of all the questions from all the groups
			 * from all the subject from the {@link data}.
			 * @type {Array} of {Object}
			 */
			this.dataAllQuestions = null;			

			/**
			 * Set the data from the  data base of the questions
			 * of the questionnaire got from {@link parQuestionsDataBase}.
			 */
			var setData = function ( ) {

				const DEFAULT_ANSWER = {
					answer: String.EMPTY,
					points: 0
				}; // DEFAULT_ANSWER

				var DEFAULT_QUESTION = {
					group: null,
					amongAllQuestionsIndex: 0,
					question: String.EMPTY,
					tableData: null,
					selectedAnswerIndex: -1,
					selectedAnswerPoints: -1,
					answers: [
						{
							answer: String.EMPTY,
							points: 0
						}
					] // answers
				}; // DEFAULT_QUESTION

				var DEFAULT_GROUP = {
					subject: null,
					name: String.EMPTY,
					description: null,
					questions: [ DEFAULT_QUESTION	]
				}; // DEFAULT_GROUP

				const DEFAULT_SUBJECT = {
					subject: String.EMPTY,
					groups:	[ DEFAULT_GROUP ]
				};

				DEFAULT_GROUP.subject = DEFAULT_SUBJECT;
				DEFAULT_QUESTION.group = DEFAULT_GROUP;

				if ( !parQuestionsDataBase || !parQuestionsDataBase.length ) {
					self.data = [ DEFAULT_SUBJECT ];
					var addingGroup = window.deepCopy( DEFAULT_GROUP );
					addingGroup.subject = DEFAULT_SUBJECT;
					self.dataAllGroups = [ addingGroup ];
					self.dataAllQuestions = addingGroup.questions;
				} // if ( !parQuestionsDataBase || !parQuestionsDataBase.length )

				self.data = [];
				self.dataAllGroups = [];
				self.dataAllQuestions = [];
				var currentQuestionAmongAllQuestionsIndex = 1;
				for ( var subjectIndex = 0; subjectIndex
						< parQuestionsDataBase.length; subjectIndex++ ) {

					var currentSubject = parQuestionsDataBase[ subjectIndex ];
					var addingSubject = null;

					if ( !currentSubject )
						addingSubject = DEFAULT_SUBJECT;

					else {
						addingSubject = {};
						addingSubject.subject = !currentSubject.subject
							? String.EMPTY : currentSubject.subject.toString( );

						if ( !currentSubject.groups || !currentSubject.groups.length ) {
							var addingGroup = window.deepCopy( DEFAULT_GROUP );
							addingGroup.subject = addingSubject;
							addingSubject.groups = [ addingGroup ];
						} // if ( !currentSubject.groups...

						else {
							addingSubject.groups = []; 
							for ( var groupIndex = 0; groupIndex
									< currentSubject.groups.length; groupIndex++ ) {

								var currentGroup = currentSubject.groups[ groupIndex ];
								var addingGroup = null;

								if ( !currentGroup ) {
									addingGroup = window.deepCopy( DEFAULT_GROUP );
									addingGroup.subject = addingSubject;
								} // if ( !currentGroup )

								else {
									addingGroup = {};
									addingGroup.subject = addingSubject;
									addingGroup.name = !currentGroup.name
										? String.EMPTY : currentGroup.name.toString( );
									addingGroup.description = !currentGroup.description
										? String.EMPTY : currentGroup.description.toString( );

									if ( !currentGroup.questions
											|| !currentGroup.questions.length ) {

										var question = window.deepCopy( DEFAULT_QUESTION );
										question.amongAllQuestionsIndex
											= currentQuestionAmongAllQuestionsIndex;
										currentQuestionAmongAllQuestionsIndex++;
										addingGroup.questions = [ question ];
									} // if ( !currentGroup.questions

									else {
										addingGroup.questions = []; 
										for ( var questionIndex = 0; questionIndex
												< currentGroup.questions.length; questionIndex++ ) {

											var currentQuestion
												= currentGroup.questions[ questionIndex ];
											var addingQuestion = null;

											if ( !currentQuestion ) {
												addingQuestion = window.deepCopy( DEFAULT_QUESTION );
												addingQuestion.group = addingGroup;
												addingQuestion.amongAllQuestionsIndex
													= currentQuestionAmongAllQuestionsIndex;
												currentQuestionAmongAllQuestionsIndex++;
											} // if ( !currentQuestion )

											else {
												addingQuestion = {};
												addingQuestion.group = addingGroup;
												addingQuestion.amongAllQuestionsIndex
													= currentQuestionAmongAllQuestionsIndex;
												currentQuestionAmongAllQuestionsIndex++;

												addingQuestion.question = !currentQuestion.question
													? String.EMPTY
													: currentQuestion.question.toString( );
												addingQuestion.tableData
													= !currentQuestion.tableData
													? null : currentQuestion.tableData;

												addingQuestion.selectedAnswerIndex = -1;
												addingQuestion.selectedAnswerPoints = -1;

												if ( !currentQuestion.answers
														|| !currentQuestion.answers.length )
													addingQuestion.answers = [ DEFAULT_ANSWER ];

												else {
													addingQuestion.answers = []; 
													for ( var answerIndex = 0; answerIndex
															< currentQuestion.answers.length;
															answerIndex++ ) {

														var currentAnswer
															= currentQuestion.answers[ answerIndex ];
														var addingAnswer = null;

														if ( !currentAnswer )
															addingAnswer = DEFAULT_ANSWER;

														else {
															addingAnswer = {};
															addingAnswer.answer = !currentAnswer.answer
																? String.EMPTY
																: currentAnswer.answer.toString( );
															addingAnswer.points
																= window.parseNonNegativeIntOrZero
																( currentAnswer.points );
														} // else : if ( !currentAnswer )

														addingQuestion.answers.push( addingAnswer );
													} // for ( var answerIndex...
												} // else: if ( !currentQuestion.answers
											} // else: if ( !currentQuestion )

											addingGroup.questions.push( addingQuestion );
											self.dataAllQuestions.push( addingQuestion );
										} // for ( var questionIndex...
									} // else: if ( !currentGroup.questions...
								} // else: if ( !currentGroup )

								addingSubject.groups.push( addingGroup );
								self.dataAllGroups.push( addingGroup );
							} // for ( var groupIndex..
						} // else : if ( !currentSubject.groups...
					} // else: if ( !currentSubject )

					self.data.push( addingSubject );
				} // for ( var subjectIndex...
				
				self.dataAllSubjects = self.data;
			} // setData

			/**
			 * Detect if all the questions of this group
			 * have the answers set by user.
			 * @public
			 * @param {Array} of {Object} parGroupQuestions
			 * - The questions of the group.
			 * @return {Boolean} True if all the questions of this group
			 * have the answers set by user.
			 *
			 * @example <caption>The example
			 * of the parGroupQuestions parameter.</caption>
			 *
			 *	var groupQuestions = [
			 *		// The question #0.
			 *		{
			 *			// @type {Number} The index among all the questions.
			 *			// Begins from 1.
			 *			amongAllQuestionsIndex: 0,
			 *			// @type {String} The caption of the question.
			 *			question: "What is your age?",
			 *			// @type {InvestmentPlansIncomesData}
			 *			// The data for the investment plans incomes table.
			 *			tableData: null,
			 *			// @type {Number} The index of the selected answer by user.
			 *			// -1 by default.
			 *			selectedAnswerIndex: -1,
			 *			// @type {Number} The points of the selected answer by user.
			 *			// -1 by default.
			 *			selectedAnswerPoints: -1,
			 *			// @type {Array} The array of the answers of the question.
			 *			answers: [
			 *				// The answer #0.
			 *				{
			 *					// @type {String} The answer's conent.
			 *					answer: "Less then 25 years old.",
			 *					// @type {Number} The points for the answer from 1 to 5.
			 *					points: 5
			 *				},
			 *				// The answer #1.
			 *				{ ... },
			 *				...
			 *			] // answers
			 *		}, // The question #0.
			 *		// The question #1.
			 *		{ ... },
			 *		...
			 *	]; // groupQuestions
			 */
			this.groupAllQuestionsHaveAnswers = function ( parGroupQuestions ) {

				if ( !parGroupQuestions || !parGroupQuestions.length )
					return false;

				for ( var questionIndex = 0; questionIndex < parGroupQuestions.length;
						questionIndex++	 ) {
					var question = parGroupQuestions[ questionIndex ];
					if ( !question || !~question.selectedAnswerIndex )
						return false;
				} // for

				return true;
			} // groupAllQuestionsHaveAnswers

			/**
			 * Detect if all the questions of this group
			 * have the answers set by user.
			 * @public
			 * @param {Array} of {Object} parGroupQuestions
			 * - The questions of the group.
			 * @see {@link groupAllQuestionsHaveAnswers}.
			 * @return {Number} The sum of the points of all the questions'
			 * selected answers in the defined group.
			 * -1 if not all the questions have the answers selected by user.
			 */
			this.getGroupAllQuestionsSelectedAnswersPointsSum = function
					( parGroupQuestions ) {

				if ( !parGroupQuestions || !parGroupQuestions.length )
					return -1;

				var result = 0;
				for ( var questionIndex = 0; questionIndex < parGroupQuestions.length;
						questionIndex++	 ) {
					var question = parGroupQuestions[ questionIndex ];
					if ( !question || !~question.selectedAnswerPoints )
						return -1;
					result += question.selectedAnswerPoints;
				} // for

				return result;
			} // getGroupAllQuestionsSelectedAnswersPointsSum

			/**
			 * Set the selected answer for the question.
			 * @type {Object} parQuestion - The question.
			 * @see questions in {@link groupAllQuestionsHaveAnswers}.
			 * @type {Number} parAnswerIndex - The index of the selecting answer.
			 */
			this.selectAnswer = function ( parQuestion, parAnswerIndex ) {

				parAnswerIndex = window.parseIntOrNull( parAnswerIndex );

				if ( !parQuestion )
					return;
				if ( !parQuestion.answers
						|| !parQuestion.answers.length
						|| ( parAnswerIndex == null )
						|| ( parAnswerIndex < 0 )
						|| ( parAnswerIndex >= parQuestion.answers.length ) ) {

					parQuestion.selectedAnswerIndex = -1;
					parQuestion.selectedAnswerPoints = -1;
					return;
				} // if

				parQuestion.selectedAnswerIndex = parAnswerIndex;
				parQuestion.selectedAnswerPoints
					= parQuestion.answers[ parAnswerIndex ].points;
			} // selectAnswer

			/**
			 * Get the points sum of the investment horizon.
			 * @return {Number} The points sum of the investment horizon.
			 * -1 for incorrect or undefined data.
			 */
			this.getInvestmentHorizonPointsSum = function ( ) {

				if ( !self.data )
					return -1;
				var investmentHorizonGroupQuestions
					= self.data[ 0 ].groups[ 0 ].questions;
				return self.getGroupAllQuestionsSelectedAnswersPointsSum
					( investmentHorizonGroupQuestions ); 
			} // getInvestmentHorizonPointsSum

			/**
			 * Get the questionnaire's remaining points sum.
			 * @return {Number} The questionnaire's remaining points sum.
			 * -1 for incorrect or undefined data.
			 */
			this.getQuestionnaireRemainingPointsSum = function ( ) {

				if ( !self.data )
					return -1;

				var result = 0;
				for ( var subjectIndex = 0; subjectIndex < self.data.length;
						subjectIndex++ ) {

					var currentSubject = self.data[ subjectIndex ];
					var startGroupIndex = !subjectIndex ? 1 : 0;

					for ( var groupIndex = startGroupIndex; groupIndex
							< currentSubject.groups.length; groupIndex++ ) {

						var currentGroup = currentSubject.groups[ groupIndex ];
						var currentGroupAllQuestionsSelectedAnswersPointsSum
							=	self.getGroupAllQuestionsSelectedAnswersPointsSum
							( currentGroup.questions );

						if ( !~currentGroupAllQuestionsSelectedAnswersPointsSum )
							return -1;

						result += currentGroupAllQuestionsSelectedAnswersPointsSum;
					} // for ( var groupIndex...
				} // for ( var subjectIndex...

				return result;
			} // getQuestionnaireRemainingPointsSum

			/**
			 * Initialization of the instance.
			 * @private
			 * @return {QuestionsData} This created instance
			 * of QuestionsData.
			 */
			var initialize = function( ) {
				setData( );
				return self;
			} // initialize

			return initialize( );
		} // QuestionsData

		/** Exporting the QuestionsData class outside of this module. */
		window.QuestionsData = QuestionsData;

	}( window )
);						