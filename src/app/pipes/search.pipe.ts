import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'search'
})

export class SearchPipe implements PipeTransform {

 //  transform(items: any[], field: string, value:string): any [] {
 //    if(!items) {
 //      return [];
 //      }
 //    return items.filter(it => it[field] == value);
 // }

 transform(myArray: any[], inputValue: string): any[] {
    if (!myArray) {
        return [];
    }

    // return the full array if search input is empty
    if (!inputValue) {
        return myArray;
    }
    const filteredArray = [];

    inputValue = inputValue.toLowerCase();

    myArray.forEach((oneItem) => {
      const lowerTitle = oneItem.title.toLowerCase();
      const lowerTeam = oneItem.team.toLowerCase();
      const lowerStatus = oneItem.status.toLowerCase();
      // const lowerCat = oneItem.category.toLowerCase(); lowerCat.includes(inputValue)

      if(lowerTitle.includes(inputValue) || lowerTeam.includes(inputValue)  ||
      lowerStatus.includes(inputValue))
         {
           filteredArray.push(oneItem);
         }
    });
    return filteredArray;
  } // transform()

}
