import UUID from "uuid";
import blakejs from "blakejs";

export function uuid() {
  return UUID.v4();
}

export function hexAddress() {
  return `0x${blakejs.blake2sHex(uuid())}`;
}

export default {
  uuid,
  hexAddress,
};
