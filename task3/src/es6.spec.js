const assert = require('assert');
const core = require('./es6');

describe('es6', () => {
    describe('#fioToName', () => {
        it('ФИО в Имя Фамилия корректно', () => {
            assert.strictEqual(core.fioToName('Иванов Иван Иванович'), 'Иван Иванов');
        });

        it('ФИ в Имя Фамилия', () => {
            assert.strictEqual(core.fioToName('Петров Петр'), 'Петр Петров');
        });
    });

    describe('#filterUnique', () => {
        it('массив с уникальными равен сам себе', () => {
            assert.deepStrictEqual(core.filterUnique([1, 2, 3]), [1, 2, 3]);
        });

        it('массив с неуникальными отфильтрован', () => {
            assert.deepStrictEqual(core.filterUnique([1, 1, 1, 1]), [1]);
        });

        it('пустой массив', () => {
            assert.deepStrictEqual(core.filterUnique([]), []);
        });
    });

    describe('#calculateSalaryDifference', () => {
        it('считает разницу корректно', () => {
            assert.strictEqual(core.calculateSalaryDifference([1, 2, 3]), 3);
        });

        it('на пустой массив возвращается falsy значение', () => {
            assert.strictEqual(!!core.calculateSalaryDifference([]), false);
        });
    });

    describe('#Dictionary', () => {
        it('экземпляр класса создается', () => {
            const dic = new core.Dictionary();

            // TODO
            assert.strictEqual(!!dic, true);
        });

        it('корректное добавление элемента в словарь', () => {
            const dic = new core.Dictionary();

            assert.strictEqual(dic.addNewWord("вишня", "лучшая ягода в мире"), true);
            assert.strictEqual(dic.addNewWord(0, "закрытых предметов в конце декабря"), false);
            assert.strictEqual(dic.addNewWord("свободное время", null), false);
        });

        it('корректное получение элемента из словаря', () => {
            const dic = new core.Dictionary();
            dic.addNewWord("вишня", "лучшая ягода в мире");

            assert.strictEqual(dic.getOneWord("вишня"), "лучшая ягода в мире");
            assert.strictEqual(dic.getOneWord("клубника"), false);
            assert.strictEqual(dic.getOneWord(), false);
        });

        it('корректное удаление элемента из словаря', () => {
            const dic = new core.Dictionary();
            dic.addNewWord("вишня", "лучшая ягода в мире");
            
            assert.strictEqual(dic.deleteOneWord("вишня"), true);
            assert.strictEqual(dic.deleteOneWord("клубника"), false);
            assert.strictEqual(dic.deleteOneWord(undefined), false);
        });

        it('корректное получение длины словаря', () => {
            const dic = new core.Dictionary();

            assert.strictEqual(dic.getDictLength(), 0);

            dic.addNewWord("вишня", "лучшая ягода в мире");
            dic.addNewWord("сон", "мечта студента ПМИ 4 курса");
            assert.strictEqual(dic.getDictLength(), 2);
        });
    });
});