export function abbreviate(entry_id) {
  if (entry_id && entry_id.length) {
    return `0x${entry_id.substr(2, 4)}...${entry_id.substr(
      entry_id.length - 4,
      4
    )}`;
  }
}

export default {
  abbreviate
}