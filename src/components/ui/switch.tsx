import React from "react";

type SwitchProps = {
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
};

export function Switch({ checked, onCheckedChange }: SwitchProps) {
  return (
    <label style={{ display: "inline-flex", alignItems: "center", cursor: "pointer" }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        style={{ marginRight: 4 }}
      />
      <span style={{ fontSize: "0.85rem" }}>{checked ? "On" : "Off"}</span>
    </label>
  );
}
