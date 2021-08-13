// import { v1 as uuidv1 } from "uuid";

function genPvid() {
  return Math.random().toString();
  // let uuid = uuidv1();
  // uuid = uuid.replace(/-/g, "");
  // return uuid;
}

export default function getPvId() {
  return genPvid();
}
