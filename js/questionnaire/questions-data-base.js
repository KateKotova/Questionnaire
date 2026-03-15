; (
	/**
	 * Contains the data base of questions.
	 * @module questions-data-base
	 * @requires question-table-data-base
	 * @requires question-table-data
	 * @author Kate Kotova <katekotova_86@mail.ru>
	 * @copyright Kate Kotova 2017
	 */
	function ( window ) {
		'use strict';

		/**
		 * The data base of the questions of the questionnaire.
		 * @type {Array}
		 * @global
		 */
		var questionsDataBase = [
			/** The subject #0. */
			{
				/** The caption of the subject of groups of questions. */
				subject: "Выявление принадлежности к целевой аудитории",

				/** The array of groups of questions. */
				groups:	[
					/** The group #0. */
					{
						/** The name of the group of questions. */
						name: "Предпочтения",

						/** The detailed description of the group of questions. */
						description: "Выясняется Ваше отношение к шоколаду в общем.",

						/** The array of questions of the group. */
						questions: [
							/** The question #0. */
							{
								/** The caption of the question. */
								question: "Любите ли Вы шоколад?",

								/**
								 * The data for the investment plans incomes table.
								 * @type {InvestmentPlansIncomesData}
								 */
								tableData: null,

								/** The array of the answers of the question. */
								answers: [
									/** The answer #0. */
									{
										/** The answer's conent. */
										answer: "Да.",

										/** The points for the answer from 1 to 5. */
										points: 5
									},
									/** The answer #1. */
									{
										answer: "Скорее да, чем нет.",
										points: 3
									},
									/** The answer #2. */
									{
										answer: "Нет.",
										points: 0
									}
								] // answers
							}, // The question #0.

							/** The question #1. */
							{
								question: "Какой шоколад Вам больше нравится?",
								tableData: null,
								answers: [
									/** The answer #0. */
									{
										answer: "Горький.",
										points: 5
									},
									/** The answer #1. */
									{
										answer: "Молочный.",
										points: 5
									},
									/** The answer #2. */
									{
										answer: "Белый.",
										points: 5
									}
								] // answers
							}, // The question #1.

							/** The question #2. */
							{
								question: "Как часто Вы покупаете шоколад?",
								tableData: null,
								answers: [
									/** The answer #0. */
									{
										answer: "Каждый день.",
										points: 5
									},
									/** The answer #1. */
									{
										answer: "1 раз в неделю.",
										points: 3
									},
									/** The answer #2. */
									{
										answer: "Несколько раз в неделю.",
										points: 4
									}
								] // answers
							} // The question #2.							
						] // questions
					}, // The group #0.

					/** The group #1. */
					{
						name: "Детализация",
						description: "Уточняется Ваше отношение "
							+ "к отдельным производителям шоколада.",
						questions: [
							/** The question #0. */
							{
								question: "Шоколад какой из нижеперечисленных "
									+ "компаний-производителей Вы предпочитаете?",
								tableData: null,
								answers: [
									/** The answer #0. */
									{
										answer: '"Ritter Sport".',
										points: 5
									},
									/** The answer #1. */
									{
										answer: '"Nestle".',
										points: 5
									},
									/** The answer #2. */
									{
										answer: '"Stollwerck".',
										points: 5
									},
									/** The answer #3. */
									{
										answer: "Никакой из перечисленных выше.",
										points: 0
									}
								] // answers
							}, // The question #0.

							/** The question #1. */
							{
								question: "В случае повышения цен на шоколад NESTLE, "
									+ "будете ли Вы его покупать?",
								tableData: null,
								answers: [
									/** The answer #0. */
									{
										answer: "Да.",
										points: 5
									},
									/** The answer #1. */
									{
										answer: "Нет.",
										points: 0
									}
								] // answers
							}, // The question #1.
						] // questions
					}, // The group #1.

					/** The group #2. */
					{
						name: "Отдельные случаи",
						description: "Анализируются ситуации, когда Вы потребляете "
							+ "большее или меньшее количество шоколада.",
						questions: [
							/** The question #0. */
							{
								question: "Вы когда-то объедались шоколадом "
									+ "до неприятных последствий?",
								tableData: null,
								answers: [
									/** The answer #0. */
									{
										answer: "Да.",
										points: 1
									},
									/** The answer #1. */
									{
										answer: "Нет.",
										points: 0
									}
								] // answers
							}, // The question #0.

							/** The question #1. */
							{
								question: "Вы можете за один раз съесть плитку шоколада?",
								tableData: null,
								answers: [
									/** The answer #0. */
									{
										answer: "Да.",
										points: 5
									},
									/** The answer #1. */
									{
										answer: "Нет.",
										points: 3
									}
								] // answers
							}, // The question #1.

							/** The question #2. */
							{
								question: "Сколько шоколада Вы готовы съесть "
									+ "во время депрессии?",
								tableData: null,
								answers: [
									/** The answer #0. */
									{
										answer: "1 плитку.",
										points: 3
									},
									/** The answer #1. */
									{
										answer: "3–4 плитки.",
										points: 4
									},
									/** The answer #2. */
									{
										answer: "Более, чем 4 плитки.",
										points: 5
									},
									/** The answer #3. */
									{
										answer: "Депрессия не влияет на изменение "
											+ "моего уровня потребления шоколада.",
										points: 2
									}
								] // answers
							}, // The question #2.

							/** The question #3. */
							{
								question: "В какое время года Вы можете съесть "
									+ "особенно много шоколада?",
								tableData: null,
								answers: [
									/** The answer #0. */
									{
										answer: "Летом.",
										points: 5
									},
									/** The answer #1. */
									{
										answer: "Осенью.",
										points: 3
									},
									/** The answer #2. */
									{
										answer: "Зимой.",
										points: 2
									},
									/** The answer #3. */
									{
										answer: "Весной.",
										points: 4
									}
								] // answers
							}, // The question #3.

							/** The question #4. */
							{
								question: "Что Вы больше предпочитаете?",
								tableData: null,
								answers: [
									/** The answer #0. */
									{
										answer: "Шоколадное мороженое.",
										points: 2
									},
									/** The answer #1. */
									{
										answer: "Горячий шоколад.",
										points: 4
									},
									/** The answer #2. */
									{
										answer: "Шоколадный коктейль.",
										points: 3
									},
									/** The answer #3. */
									{
										answer: "Плитка шоколада.",
										points: 5
									}
								] // answers
							}, // The question #4.	
						] // questions
					} // The group #2.
				] // groups
			}, // The subject #0.

			/** The subject #1. */
			{
				subject: "Оценка требовательности и доходов",
				groups:	[
					/** The group #0. */
					{
						name: null,
						description: null,
						questions: [
							/** The question #0. */
							{
								question: "Мы изложили ситуации с наиболее вероятным "
									+ "составами шоколадных плиток "
									+ "пяти гипотетических производителей. "
									+ "Шоколадную питку какого состава Вы бы приобрели?",
								/**
								 * The data for the investment plans incomes table.
								 * @type {InvestmentPlansIncomesData}
								 */
								tableData: new QuestionTableData(
									typesNames,
									plansNames,
									plans
								),
								answers: [
									/** The answer #0. */
									{
										answer: "A",
										points: 1
									},
									/** The answer #1. */
									{
										answer: "B",
										points: 2
									},
									/** The answer #2. */
									{
										answer: "C",
										points: 3
									},
									/** The answer #3. */
									{
										answer: "D",
										points: 4
									},
									/** The answer #4. */
									{
										answer: "E",
										points: 5
									}
								] // answers
							}, // The question #0.

							/** The question #1. */
							{
								question: "Каков ваш текущий уровень дохода в месяц?",
								tableData: null,
								answers: [
									/** The answer #0. */
									{
										answer: "Менее 35 000 руб.",
										points: 1
									},
									/** The answer #1. */
									{
										answer: "35 000–70 000 руб.",
										points: 2
									},
									/** The answer #2. */
									{
										answer: "70 000–120 000 руб.",
										points: 3
									},
									/** The answer #3. */
									{
										answer: "120 000–250 000 руб.",
										points: 4
									},
									/** The answer #4. */
									{
										answer: "Более 250 000 руб.",
										points: 5
									}
								] // answers
							} // The question #1.							
						] // questions
					} // The group #0.
				] // groups
			} // The subject #1.
		]; // questionsDataBase

		/** Exporting the questionsDataBase object outside of this module. */
		window.questionsDataBase = questionsDataBase;

	}( window )
);