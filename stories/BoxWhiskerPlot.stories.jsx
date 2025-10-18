import * as React from "react";
import { BoxWhiskerPlot } from "../src/";

export default { title: "Box and Whisker Plot", component: BoxWhiskerPlot };

export const test = () => {
  return (
    <div className="bg-gray-100 w-min">
      <BoxWhiskerPlot series={[
        {
          name: "series 1",
          data: [1, 1, 3, 4, 2, 10]
        },
        {
          name: "series 2",
          data: [3, 4, 2, 10]
        }
      ]}/>
    </div>
  )
}