


export default class PageableEntity {

    currentIndexes;

    array;

    constructor(array){
        this.currentIndexes = [0,20];
        this.currentPage = 0;
        this.array = array;
        this.maxPage =  Math.round(this.array.length / 20);
       
    }

    //Retornar tickers divididos em grupos de 20 moedas

    getCurrentIndexes = () => {
        return this.currentIndexes;
    }

    getCurrentPage = () => {
        return this.currentPage;
    }

    
    incrementPage = () => {
        this.currentIndexes = this.currentIndexes.map(r => r+20);
        this.currentPage+=1;
        return this.currentIndexes;
    }

    decrementPage = () => {
        if(this.currentPage>0){
            this.currentIndexes = this.currentIndexes.map(r => r-20);
            this.currentPage-=1;
            return this.currentIndexes;
        } else {
            throw Error("Current page is zero");
        }
      
    }



    getPagedArray = () => {
        return this.array.slice(this.currentIndexes[0], this.currentIndexes[1]);
    }


    nextPage = () => {
        this.incrementPage();
        return this.array.slice(this.currentIndexes[0], this.currentIndexes[1]);
      }

      previousPage = () => {
       
              this.decrementPage();
              return this.array.slice(this.currentIndexes[0], this.currentIndexes[1]);
    
      }


}