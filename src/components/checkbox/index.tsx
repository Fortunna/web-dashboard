import React, { useEffect, useState } from "react";

export default function CheckBox({
  checked = false,
  id,
}: {
  checked?: boolean;
  id: string;
}) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);
  return (
    <div>
      <input
        checked={isChecked}
        id={id}
        type="checkbox"
        value=""
        className="w-6 h-6 checked:bg-mark-bg bg-contain appearance-none  bg-transparent
             focus:ring-0 focus:ring-offset-0 checked:bg-[#26ad60]
             border-[#353945] checked:border-none border-2   "
      />
    </div>
  );
}
