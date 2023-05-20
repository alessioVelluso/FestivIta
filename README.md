
# FestivIta

## Metodi
Piccola libreria creata con l'obiettivo di calcolare i giorni festivi o di weekend Italiani.
Potete usarla con JS o TS, avete principalmente 4 metodi:

1. **`getPasqua( anno = undefined | number | string | Date )`**

	>*Trova la data di pasqua dell'anno passato come parametro.*\
	>**Se undefined troverà la data dell'anno corrente**



2.	 **`getPasquaAndPasquetta( anno = undefined | number | string | Date )`**

		>*Stessa cosa ma restituisce un oggetto con le date formato "DD-MM"*


3. **`isExtraFestivo( data = undefined | string | Date )`**

	>*Se il giorno della data passata è contenuto nell'array dei giorni festivi (se volete modificarla si trova nella classe FestivIta) ed è pasqua o pasquetta restituisce true;*\
	>**Se undefined allora calcola in base alla data odierna.**\
	>*Supporta principalmente tutti i formati di stringa derivati dalla classe Date() o in genere YYYY-MM-DD | YYYY/MM/DD, ma con il formato americano restituirà un giorno indietro.*


4. **`isExtraFestivoOrWeekend( data = undefined | string | Date )`**

	>*Stessa cosa ma considerando anche il sabato e la domenica.*

Oltre questi metodi pubblici, la libreria si serve di alcuni formatter `protected` per permettere l'uso versatile in base a parametri diversi.

## Uso
Ci sono due versioni, JS o TS.
Per l'uso locale basta importarlo e potete usarlo come volete, nel caso vogliate usarlo nei node_modules a breve caricherò l'npm.
Modificate quanto volete tutto quello che volete.
