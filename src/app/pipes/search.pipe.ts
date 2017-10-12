import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'search'
})

export class SearchPipe implements PipeTransform {

  transform(items: any[], field: string, value:string): any [] {
    if(!items) {
      return [];
      }
    return items.filter(it => it[field] == value);
 }
  //   const filteredArray = [];
  //
  //   inputValue = inputValue.toLowerCase();
  //
  //   mediaArray.forEach((oneItem) => {
  //     const lowerTitle = oneItem.title.toLowerCase();
  //     const lowerTeam = oneItem.team.toLowerCase();
  //     const lowerStatus = oneItem.status.toLowerCase();
  //     const lowerCat = oneItem.category.toLowerCase();
  //
  //     if(lowerTitle.includes(inputValue) ||
  //        lowerTeam.includes(inputValue)  ||
  //        lowerStatus.includes(inputValue) ||
  //         lowerCat.includes(inputValue)){
  //          filteredArray.push(oneItem);
  //        }
  //   });
  //   return filteredArray;
  // } // transform()

}
