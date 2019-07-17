/*
--------------------------------------------------------------------------------
Cálculo de fiestas de 1000 días
===============================

Version: 0.2

Author: Ariel Sebastián Becker
Author's mail: barroco@gmail.com

Descripción:
============

Esta librería permite realizar el cálculo de la próxima fiesta de 1000 días.

Una fiesta de 1000 días es una alternativa a un cumpleaños, y se celebra una vez cada 1000 días contando a partir de la fecha de nacimiento.
--------------------------------------------------------------------------------
*/
"use strict";

/*
Función encargada de calcular la próxima fiesta a partir de la fecha de nacimiento y la fecha actual.

Acepta dos parámetros, pero se le puede pasar sólo el primero.

Devuelve un array que contiene los siguientes datos:
* ageInDays: Días de vida.
* ageInYearsAndDays: Años y días de vida.
* remainingDaysToNextParty: Días para la próxima fiesta de 1000 días.
* nextPartyDate: Fecha de la próxima fiesta.
* nextPartyAge: Días que cumplirá la persona esa fecha.
*/
function calcNextParty(dateBirth, dateToday) {

	if (dateToday === undefined) {
        var dateToday = new Date();
    }

    // Objeto myAge, contiene valores necesarios.
	var myAge = calcAge(dateBirth, dateToday);

	// Tantos días hasta la próxima fiesta de 1000 días.
	var remainingDaysToNextParty = (Math.ceil(myAge.ageDays / 1000) * 1000) - myAge.ageDays;

	//Cuántos días cumpliré la próxima fiesta de 1000 días.
	var nextPartyDays = myAge.ageDays + remainingDaysToNextParty;

	// Fecha de la próxima fiesta de 1000 días.
	var proximaFiesta = new Date(1);
	proximaFiesta.setTime(Date.parse(dateToday) + daysToMilliseconds(remainingDaysToNextParty));

	var ageYD = myAge.ageYears + " años y " + myAge.ageRemainingDays + " días";

	var retValue = {ageInDays: myAge.ageDays,
		ageInYearsAndDays: ageYD,
		remainingDaysToNextParty: remainingDaysToNextParty,
		nextPartyDate: proximaFiesta,
		nextPartyAge: nextPartyDays};

	return retValue; // Devolvemos la cadena.
}

/*
Función encargada de calcular todas las fechas de fiestas, desde 1000 hasta 30000.

Acepta dos parámetros, pero se le puede pasar sólo el primero.

Devuelve un array de objetos que contiene los siguientes datos tabulados en cada uno de ellos:

daysParty: fiesta de tantos días.
partyDate: fecha en la que ocurrirá la fiesta.
partyAge: edad de la persona (en años y días) al momento de la fiesta.
*/
function calcParties(dateBirth, limite) {
	if (dateBirth === undefined) {
        var dateBirth = new Date();
    }
    var retValue = [];
    var partyObject = {}
    var auxAge = {};
    var i = 0;
    for (i = 0; i < limite; i++) {
		partyObject = {}
		partyObject.partyDay = i * 1000;
		partyObject.partyDate = new Date(dateBirth.getTime() + daysToMilliseconds(i * 1000));

		auxAge = calcAge(dateBirth, partyObject.partyDate);
		partyObject.partyAge = auxAge.ageYears + " años y " + auxAge.ageRemainingDays + " días";
		retValue.push(partyObject);
	}

    return retValue;
}

/*
Función auxiliar.
Calcula la edad de una persona en días, y años y días, dada su fecha de nacimiento.
*/

function calcAge(birthDate, dateToday) {
	if (dateToday === undefined) {
        var dateToday = new Date();
    }
    var retValue = {};

    // Milisegundos hasta mi cumpleaños.
	var myBirth = new Date(birthDate).getTime();
	// Milisegundos hasta segunda fecha.
	var myToday = new Date(dateToday).getTime();
    // Edad en años.
    var myYears = calcYears(birthDate, dateToday);
	// Valor auxiliar, edad en días.
	var myDays = Math.floor(millisecondsToDays(myToday - myBirth));
	// Última fecha de cumpleaños.
	var lastBirthday = new Date(birthDate);
	lastBirthday.setFullYear(birthDate.getFullYear() + myYears);
	// Días sobrantes en la edad después de contar los años.
	var myRemainingDays = Math.ceil(millisecondsToDays(myToday - lastBirthday.getTime()));
	// Última fecha de cumpleaños.
	var lastBirthday = new Date(new Date(birthDate).setFullYear(birthDate.getFullYear() + myYears));

	retValue.ageDays = myDays;
	retValue.ageYears = myYears;
	retValue.ageRemainingDays = myRemainingDays;
	retValue.lastBirthdayDate = lastBirthday;
    return retValue;
}

/*
Función auxiliar.
Calcula la edad de una persona en años, dada su fecha de nacimiento.
*/
function calcYears(birthDate, otherDate) {
	if (otherDate === undefined) {
		var otherDate = new Date();
	}
    var myBirthDate = birthDate.getTime();

    var years = (otherDate.getFullYear() - birthDate.getFullYear());

    if (otherDate.getMonth() < birthDate.getMonth() || otherDate.getMonth() == birthDate.getMonth() && otherDate.getDate() < birthDate.getDate()) {
        years--;
    }
    return years;
}

/*
Función auxiliar.
Convierte milisegundos a días.
*/
function millisecondsToDays(myMilliSecs) {
	return myMilliSecs / 86400000;
}

/*
Función auxiliar.
Convierte días a milisegundos.
*/
function daysToMilliseconds(myDays) {
	return myDays * 86400000;
}

/*
Función auxiliar.
Devuelve el nombre del día de la semana.
*/
function dayOfWeek(myDayNumber) {

	switch (myDayNumber) {
		case 0: return "domingo"; break;
		case 1: return "lunes"; break;
		case 2: return "martes"; break;
		case 3: return "miércoles"; break;
		case 4: return "jueves"; break;
		case 5: return "viernes"; break;
		case 6: return "sábado"; break;
		default: return "n/a";
	};
}

/*
Función auxiliar.
Devuelve el nombre del mes.
*/
function monthName(myMonthNumber) {

	switch (myMonthNumber) {
		case 0: return "enero"; break;
		case 1: return "febrero"; break;
		case 2: return "marzo"; break;
		case 3: return "abril"; break;
		case 4: return "mayo"; break;
		case 5: return "junio"; break;
		case 6: return "julio"; break;
		case 7: return "agosto"; break;
		case 8: return "septiembre"; break;
		case 9: return "octubre"; break;
		case 10: return "noviembre"; break;
		case 11: return "diciembre"; break;
		default: return "n/a";
	};
}

/*
Función auxiliar.
Convierte un número al formato español 14 433,23
*/
function toSpanishNumber(myRawNumber) {
	myRawNumber += '';
	var x = myRawNumber.split('.');
	var x1 = x[0];
	var x2 = x.length > 1 ? ',' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + String.fromCharCode(160) + '$2');
	}
	return x1 + x2;
}

function formatDate(myDate) {
	var retValue = "";
	var myDayNumber = myDate.getDate();
	var myDayName = dayOfWeek(myDate.getDay());
	var myMonth = monthName(myDate.getMonth());
	var myYear = myDate.getFullYear();
	var retValue = myDayName + " " + myDayNumber + " de " + myMonth + " de " + myYear;
	return retValue;
}
