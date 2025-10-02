import { useState } from "react";
import Button from "../component/ClickColor";
import { randomColor } from "../component/RanDomColor";

const ColorButton = () => {
  const [color1, setColor1] = useState("bg-red-500");
  const [color2, setColor2] = useState("bg-blue-500");
  const [color3, setColor3] = useState("bg-gray-500");

  return (
    <div className="flex gap-4 p-6">
      <Button
        label="Nút 1"
        color={color1}
        onClick={() =>
          setColor1((prev) =>
            prev === "bg-red-500" ? "bg-green-500" : "bg-red-500"
          )
        }
      />

      <Button
        label="Nút 2"
        color={color2}
        onClick={() =>
          setColor2((prev) =>
            prev === "bg-blue-500" ? "bg-yellow-500" : "bg-blue-500"
          )
        }
      />

      <Button
        label="Nút 3 (Random)"
        color={color3}
        onClick={() => setColor3(randomColor())}
      />
    </div>
  );
};

export default ColorButton;
