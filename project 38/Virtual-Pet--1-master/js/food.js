class Food {
    constructor(){
    this.foodStock=0;
    this.lastFed;
    this.image=loadImage('Images/Milk.png');
    }

   /*updateFoodStock(foodStock){
    this.foodStock=foodStock;
   }

   getFedTime(lastFed){
     this.lastFed=lastFed;
   }

   deductFood(){
     if(this.foodStock>0){
      this.foodStock=this.foodStock-1;
     }
    }

    getFoodStock(){
      return this.foodStock;
    }*/
    function feedDog(){
      dog.addImage(happyDog);
    
      foodObj.updateFoodStock(foodObj.getFoodStock()-1);
      database.ref('/').update({
        Food:foodObj.getFoodStock(),
        FeedTime:hour()
      })
    }

 

 

    

  

    bedroom(){
    background(bedroom,500,200)
    }
    washroom(){
    background(washroom,500,200)
    }
    garden(){
    background(garden,500,200)
    }




    display(){
      var x=80,y=100;
      
      imageMode(CENTER);
      image(this.image,720,220,70,70);
      
      if(this.foodStock!=0){
        for(var i=0;i<this.foodStock;i++){
          if(i%10==0){
            x=80;
            y=y+50;
          }
          image(this.image,x,y,50,50);
          x=x+30;
        }
      }
    }
  }
  

