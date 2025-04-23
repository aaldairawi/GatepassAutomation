/*Helper function to get the Berth value.*/
export const locationHelper = (
  berth: string,
  lastSlotPosition: string
): string => {
  let yardLocationSubstring: string = "";
  const ENHAM_SUB_LOCATION_LOCATIONS = [
    "H1",
    "H2",
    "I1",
    "I2",
    "M1",
    "M2",
    "N1",
    "N2",
    "O1",
    "O2",
    "J1",
    "J2",
    "K1",
    "K2",
    "EN",
  ];
  const YARD_20_SUB_LOCATION_LOCATIONS = [
    "B1",
    "B2",
    "B3",
    "C1",
    "C2",
    "C3",
    "D1",
    "D2",
    "D3",
    "D4",
    "E1",
    "E2",
    "E3",
    "F1",
    "F2",
    "F3",
    "F4",
    "G1",
    "G2",
    "G3",
    "OO",
    "G4",
  ];

  if (!lastSlotPosition) {
    return "N/A";
  } else {
    yardLocationSubstring = lastSlotPosition.substring(0, 2);
  }
  if (berth.length > 0 && berth === "B27") return `B27/${lastSlotPosition}`;
  if (berth.length > 0 && berth === "B20") return `B20/${lastSlotPosition}`;
  if (lastSlotPosition.length > 0 && lastSlotPosition === "YARD21")
    return `B21/${lastSlotPosition}`;
  if (
    (lastSlotPosition.length > 0 && lastSlotPosition === "ENHAM") ||
    ENHAM_SUB_LOCATION_LOCATIONS.some(
      (element) => element === yardLocationSubstring
    )
  )
    return `ENHAM/${lastSlotPosition}`;
  if (
    (lastSlotPosition.length > 0 && lastSlotPosition === "SHEBEL") ||
    yardLocationSubstring === "SH"
  )
    return `SHEBEL/${lastSlotPosition}`;
  if (
    lastSlotPosition.length > 0 &&
    YARD_20_SUB_LOCATION_LOCATIONS.some(
      (element) => element === yardLocationSubstring
    )
  )
    return `B20/${lastSlotPosition}`;
  return "N/A";
};

// @{ string locationID = "";
//     string subloc = "";
//     if (item.LastPosSlot == null)
//     {
//                     locationID = "N/A";

//     }
//     else { subloc = item.LastPosSlot.Substring(0, 2); }

//subloc = item.LastPosSlot.Substring(0, 2);
// if (item.LastPosSlot == "YARD21")
// {
//                 locationID = "YARD 21";
// }
// else if (item.LastPosSlot == "ENHAM" || subloc == "H1" || subloc == "H2" || subloc == "I1" || subloc == "I2"
//                 || subloc == "M1" || subloc == "M2" || subloc == "N1" || subloc == "N2" || subloc == "O1" || subloc == "O2" || subloc == "J1" || subloc == "J2" || subloc == "K1" || subloc == "K2" || subloc == "EN")
// {
//                 locationID = "ENHAM";
// }
// else if (item.LastPosSlot == "SHEBEL" || subloc == "SH")
// {
//                 locationID = "SHEBEL";
// }
// else if (subloc == "B1" || subloc == "B2" || subloc == "B3" || subloc == "C1" || subloc == "C2"
//                 || subloc == "C3" || subloc == "D1" || subloc == "D2" || subloc == "D3"
//                 || subloc == "D4" || subloc == "E1" || subloc == "E2" || subloc == "E3" || subloc == "F1"
//                 || subloc == "F2" || subloc == "F3" || subloc == "F4"
//                 || subloc == "G1" || subloc == "G2" || subloc == "G3" || subloc == "OO" || subloc == "G4")
// {
//                 locationID = "YARD 20";
// }
// else if (item.Berth == "B27")
// {
//                 locationID = "YARD 27";
// }
// else
// {
//                 locationID = "YARD 20";
// }
//}
// <h4 style="font-size: 18px ">@locationID/@item.LastPosSlot</h4>
