function evalParen(paren, context) {
  if (!paren) {
    paren = "{vibedust}";
  }
  for (const [key, value] of Object.entries(context)) {
    paren = paren.replaceAll(
      `{${key}}`,
      value !== null && typeof value !== undefined ? value : 0
    );
  }
  return paren;
}

export default async function renderParen({ paren, context }) {
  return evalParen(paren, context);
}
