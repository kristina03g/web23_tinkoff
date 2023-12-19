"use strict";
// в данных задачах нужно использовать возможности es6
// ко всем заданиям можно (а местами и нужно) дописать свои тесты в файле es6.spec.js
// Можно менять параметры функций (например сделать им значения по умолчанию)

// Напишите функцию, которая принимает ФИО пользователя и возвращает
// строку формата Имя Фамилия
function fioToName(fio) {
    const [lastName, firstName] = fio.split(' ');
    return `${firstName} ${lastName}`;
}

// преобразуйте массив чисел так, чтобы в нем остались только
// уникальные элементы
// присмотритесь к коллекции "Set"
function filterUnique(array) {
    return Array.from(new Set(array));
}

// Задача: разница зарплат
// в функцию приходит массив из n зарплат сотрудников фирмы
// ваша задача определить, во сколько раз зарплата самого высокооплачиваемого
// сотрудника превышает зарплату самого низкооплачиваемого
function calculateSalaryDifference(array) {
    return (Math.max(...array)/Math.min(...array));
}

// Реализуйте класс "словарь слов" (как толковый словарь)
// класс должен быть безопасным и работать только со словами
// присмотритесь к коллекции "Map"
// Словарь - (string, string), и все это не null и не undefined
// * покройте класс тестами
class Dictionary {

    constructor() {
        this.dictionary = new Map();
    }

    addNewWord(word, value) {
        if (typeof word !== 'string' || word === null || typeof word === "undefined" || typeof value !== 'string' || value === null || typeof value === "undefined") return false
        this.dictionary.set(word, value);
        return true;
    }

    getOneWord(word) {
        if (typeof word !== 'string' || word === null || typeof word === "undefined" || !this.dictionary.has(word)) return false;
        return this.dictionary.get(word);
    }

    deleteOneWord(word) {
        if (typeof word !== 'string' || word === null || typeof word === "undefined" || !this.dictionary.has(word)) return false;
        return this.dictionary.delete(word);
    }

    getDictLength() {
        return this.dictionary.size;
    }
}

module.exports = {
    fioToName,
    filterUnique,
    Dictionary,
    calculateSalaryDifference
};
