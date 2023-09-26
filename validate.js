const sexControl = (sex) => {
	if (sex % 2 != 0) {
		return 'mees'
	} else {
		return 'naine'
	}
}

const fullYear = (sex, year) => {
	if(sex == 1 || sex == 2) {
		return '18' + year
	} else if(sex == 3 || sex == 4) {
		return '19' + year
	} else if(sex == 5 || sex == 6) {
		return '20' + year
	} else if(sex == 7 || sex == 8) {
		return '21' + year
	}
}

const birthdayDescription = (sex, year, month, day) => {
	const birthday = new Date(Date.UTC(parseInt(year), parseInt(month-1), parseInt(day), 0, 0, 0));
	const birthdayYear = birthday.toLocaleString('et-EE',  { year: 'numeric'})
	const birthdayMonth = birthday.toLocaleString('et-EE',  { month: 'long' })
	const birthdayDay = birthday.toLocaleString('et-EE',  { day: 'numeric'})
	return `${birthdayDay}. ${birthdayMonth}${birthdayMonth == 'mai' || birthdayMonth == 'juuni' || birthdayYear == 'juuli' ? 'l' : 'il'} ${birthdayYear}. aastal`
}

const birthayPlaceData = (addInfo, year, sex) => {
	let birthayPlaceData
	let orderNumber
	addInfo = parseInt(addInfo)
	if(parseInt(fullYear(sex, year)) < 2013) {
		if (addInfo >= 1 && addInfo <= 10) birthayPlaceData = 'Kuressaare haigla'
		else if (addInfo >= 11 && addInfo <= 19) birthayPlaceData = 'Tartu Ülikooli Naistekliinik'
		else if (addInfo >= 21 && addInfo <= 150) birthayPlaceData = 'Ida-Tallinna keskhaigla, Pelgulinna sünnitusmaja (Tallinn)'
		else if (addInfo >= 151 && addInfo <= 160) birthayPlaceData = 'Keila haigla'
		else if (addInfo >= 161 && addInfo <= 220) birthayPlaceData = 'Rapla haigla, Loksa haigla, Hiiumaa haigla (Kärdla)'
		else if (addInfo >= 221 && addInfo <= 270) birthayPlaceData = 'Ida-Viru keskhaigla (Kohtla-Järve, endine Jõhvi)'
		else if (addInfo >= 271 && addInfo <= 370) birthayPlaceData = 'Maarjamõisa kliinikum (Tartu), Jõgeva haigla'
		else if (addInfo >= 371 && addInfo <= 420) birthayPlaceData = 'Narva haigla'
		else if (addInfo >= 421 && addInfo <= 470) birthayPlaceData = 'Pärnu haigla'
		else if (addInfo >= 471 && addInfo <= 490) birthayPlaceData = 'Haapsalu haigla'
		else if (addInfo >= 491 && addInfo <= 520) birthayPlaceData = 'Järvamaa haigla (Paide)'
		else if (addInfo >= 521 && addInfo <= 570) birthayPlaceData = 'Rakvere haigla, Tapa haigla'
		else if (addInfo >= 571 && addInfo <= 600) birthayPlaceData = 'Valga haigla'
		else if (addInfo >= 601 && addInfo <= 650) birthayPlaceData = 'Viljandi haigla'
		else if (addInfo >= 651 && addInfo <= 700) birthayPlaceData = 'Lõuna-Eesti haigla (Võru), Põlva haigla'	
		orderNumber = parseInt(addInfo.toString().slice(-1))
	} else {
		orderNumber = parseInt(addInfo)
	}
	return {
			place: birthayPlaceData,
			order: orderNumber
			}
}



const control = (idcode) => {
    const weight1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1];
    const weight2 = [3, 4, 5, 6, 7, 8, 9, 1, 2, 3];

    // Compute controlSum using weight1
    let controlSum = 0;
    for(let i = 0; i < idcode.length-1; i++){
        controlSum += parseInt(idcode[i]) * weight1[i];
    }
   
    if(controlSum % 11 !== 10) {
        return controlSum % 11;
    }

    // If previous check failed, compute controlSum using weight2
    controlSum = 0;
    for(let i = 0; i < idcode.length-1; i++){
        controlSum += parseInt(idcode[i]) * weight2[i];
    }
   
    return controlSum % 11 !== 10 ? controlSum % 11 : 0;
}

const idInfo = (idcode) => {
	idcode = idcode.toString()
	let sex = idcode[0]
	let year = idcode.slice(1, 3)
	let month = idcode.slice(3, 5)
	let day = idcode.slice(5, 7)
	let addInfo = idcode.slice(7, 10)
	let idControl = idcode.slice(-1)

	let birthdayString = birthdayDescription(sex, fullYear(sex, year), month, day)
	let placeAndOrder = birthayPlaceData(addInfo, year, sex)

	return `
	<html>
	  <head>
	    <title>Isikoodi valideerimine</title>
	    <meta charset="UTF-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1">
	    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
	  </head>
	  <body>
	    <div class="container">
	      <h2>Isikoodi valideerimine</h2>

	Isik isikukoodiga ${idcode} on ${sexControl(sex)} (${sex}...), kes on sündinud ${birthdayString} (...${year}${month}${day}...). Tema isikukood registreeriti ${parseInt(fullYear(sex, year)) < 2013 ? placeAndOrder.place+' osakonnas (...' + addInfo.slice(0, 2)+ '...)' : ' Eestis'} ja sel päeval oli ta ${placeAndOrder.order}. ${sexControl(sex) == 'naine' ? sexControl(sex).slice(0,-2)+'s' : sexControl(sex)}soost isik (...${addInfo}.). Isikukoodi kontrollnumbriks on ${control(idcode)} (...${idControl}).
	<br>
	<br>
	<a href="/">Valideeri uus isikukood</a>
	</div>
  </body>
</html>
	`
}

module.exports = {
	idInfo
}