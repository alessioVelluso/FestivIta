/* ----------------------------------------------------------- */
/* ----------------------------------------------------------- */
/* --------------------------- LIB --------------------------- */
/* ----------------------------------------------------------- */
/* ----------------------------------------------------------- */

class Formatters /* implements Formatters_Interface (is protected) */ {

    formatYear = (year) => {
        let formattedYear = new Date().getFullYear();
        if (typeof formattedYear === 'undefined') formattedYear = formattedYear
        else if (typeof year === 'number') formattedYear = year
        else if (typeof year === 'string') formattedYear = parseInt(year)
        else if (year instanceof Date) formattedYear = year.getFullYear()
    
        return formattedYear
    }
    formatDate = (date) => {
        let formattedDate = new Date().toISOString().split('T')[0]
        if (typeof date === 'string') formattedDate = new Date(date).toISOString().split('T')[0]
        else if (date instanceof Date) formattedDate = date.toISOString().split('T')[0]
    
        return formattedDate;
    }

}



class Pasqua extends Formatters {

    _pre = (num, finalLength = 2) => {
        const stringedNumber = '0000' + num
        const substringNumber = stringedNumber.substring(stringedNumber.length - finalLength, stringedNumber.length)
        return parseInt(substringNumber)
    }
    getPasqua = (year) => {
        year = this.formatYear(year)
      
        const k = Math.floor(year / 100)
        const m = 15 + Math.floor((3 * k + 3) / 4) - Math.floor((8 * k + 13) / 25)
        const s = 2 - Math.floor((3 * k + 3) / 4)
        const a = year % 19
        const d = (19 * a + m) % 30
        const r = Math.floor((d + a / 11) / 29)
        const og = 21 + d - r
        const sz = 7 - Math.floor(year + year / 4 + s) % 7
        const oe = 7 - (og - sz) % 7
        let os = og + oe
        //                        1   2   3   4   5   6   7   8
        const daysPerMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31]
        let day = os
        let month
        for (month = 3; month < 8; month++) {
            if (day <= daysPerMonth[month]) break
            day -= daysPerMonth[month]
        }
      
        return [this._pre(year, 4), this._pre(month), this._pre(day)]
    }
    getPasquaAndPasquetta = (year) => {
        year = this.formatYear(year)
    
        const [_year, month, day] = this.getPasqua(year);
        const pasquaDay = day<10  ?'0'+day  :day+''
        const pasquaMonth = month<10  ?'0'+month  :month+''
    
        let pasquettaDay, pasquettaMonth
        if (day===31 && month===3)  { // Se pasqua cade il 31/03
            pasquettaDay = '01'
            pasquettaMonth = '04';
        }  
        else {
            pasquettaDay = (day+1)<10  ?'0'+(day+1)  :(day+1)+'';
            pasquettaMonth = month<10  ?'0'+month  :month+'';
        }
    
        const pasqua = `${pasquaDay}-${pasquaMonth}`
        const pasquetta = `${pasquettaDay}-${pasquettaMonth}`
    
        return { pasqua, pasquetta }
    }

}



class FestivIta extends Pasqua {
    
    constructor() {
        super()
        this.extraFestivi = [
            '01-01', // 'Capodanno',
            '06-01', // 'Epifania',
            '25-04', // 'Anniversario della Liberazione',
            '01-05', // 'Festa del Lavoro',
            '02-06', // 'Festa della Repubblica',
            '15-08', // 'Assunzione / Ferragosto',
            '01-11', // 'Tutti i santi',
            '08-12', // 'Immacolata concezione',
            '25-12', // 'Natale',
            '26-12', // 'Santo Stefano,
        ]
    }

    isExtraFestivo = (date) => {
        date = this.formatDate(date)
        
        const [year, month, day] = date.split('-')
        const { pasqua, pasquetta } = this.getPasquaAndPasquetta(year) // --- (LIB LOCALE IN PUBLIC) Restituisce il giorno formato 'DD-MM' di pasqua e pasquetta per l'anno selezionato, da impostare nel frontend
    
        const valueToCheck = `${day}-${month}`
        if (this.extraFestivi.includes(valueToCheck) || valueToCheck===pasqua || valueToCheck===pasquetta) return true
        else return false
        
    }
    isExtraFestivoOrWeekend = (date) => {
        date = this.formatDate(date)
    
        const dayOfWeek = new Date(date).getDay()
        const isWeekend = (dayOfWeek === 6 || dayOfWeek === 0);
        if (isWeekend || this.isExtraFestivo(date)) return true
        else return false
        
    }

}




/* ----------------------------------------------------------- */
/* ----------------------------------------------------------- */
/* ------------------------- EXPORTS ------------------------- */
/* ----------------------------------------------------------- */
/* ----------------------------------------------------------- */

const pasqua = new Pasqua()
const festivIta = new FestivIta()

const getPasqua = (date) => pasqua.getPasqua(date)
const getPasquaAndPasquetta = (date) => pasqua.getPasquaAndPasquetta(date)
const isExtraFestivo = (date) => festivIta.isExtraFestivo(date)
const isExtraFestivoOrWeekend = (date) => festivIta.isExtraFestivoOrWeekend(date)


if (typeof module !== 'undefined') module.exports = { 
    getPasqua, getPasquaAndPasquetta,
    isExtraFestivo, isExtraFestivoOrWeekend 
}
