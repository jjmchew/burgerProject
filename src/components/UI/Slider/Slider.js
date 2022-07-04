import React, { useState } from 'react';

import classes from './Slider.module.css';


const Slider = (props) => {
   // Reusable slider toggle component:
   //    - define left-side text and right-side text 
   //      via props.textL and props.textR, respectively
   //    - default slider state is set by props.startL
   //      (false is Right to start)
   //    - define clickHandler via props.clickProps

   const [isLeft, setIsLeft] = useState(props.startL);

   // toggle slider L or R each click
   const handleClick = () => {
      setIsLeft(!isLeft);
      // pass click onto defined clickProps
      props.clickProps();
   }

   // set-up CSS classNames array for 
   // toggle position and selected vs un-selected text
   let toggleClasses = [classes.Toggle];
   let textLClasses = [classes.Text];
   let textRClasses = [classes.Text];
   if (isLeft) {
      toggleClasses.push(classes.Left);
      textLClasses.push(classes.Selected);
   } else {
      toggleClasses.push(classes.Right);
      textRClasses.push(classes.Selected);
   }

   return (
      <div className={classes.Slider}>
         <div className={textLClasses.join(' ')}>{props.textL}</div>
         <div className={classes.Box} onClick={handleClick}>
            <div
               className={toggleClasses.join(' ')}
            ></div>
         </div>
         <div className={textRClasses.join(' ')}>{props.textR}</div>
      </div>
   );
};

export default Slider;
